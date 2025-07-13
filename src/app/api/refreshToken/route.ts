import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "@/utils/generateTokens";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token provided" }, { status: 401 });
    }


    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
      id: string;
      role: "Admin" | "Employee";
    };

    const newAccessToken = generateAccessToken(decoded.id, decoded.role);

    return NextResponse.json(
      { accessToken: newAccessToken },
      { status: 200 }
    );

  } catch (err) {
    console.error("Refresh token error:", err);
    return NextResponse.json({ error: "Invalid or expired refresh token" }, { status: 403 });
  }
}
