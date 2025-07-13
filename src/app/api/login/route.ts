import connectDb from "@/utils/connectDb";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.models";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/generateTokens";

import {IUser} from "@/models/user.models";
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await connectDb();
    const data = await request.json();

    const { username, email, password } = data;
    if ((!username && !email) || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

 const user = await User.findOne({
  $or: [{ username }, { email }],
}) as IUser | null;


    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }


  const accessToken = generateAccessToken(user._id.toString(), user.role);
const refreshToken = generateRefreshToken(user._id.toString());

    const response = NextResponse.json(
      {
        message: "Login successful",
        accessToken,
        user,
      },
      { status: 200 }
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // in seconds
    });

    return response;
  } catch (error) {
    console.error("Error in registration:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
