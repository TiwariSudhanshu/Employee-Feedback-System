import connectDb from "@/utils/connectDb";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.models";
export async function POST(request: NextRequest) {
   try {
     await connectDb();
   const data = await request.json();
 
 
     const { username, email, role, password } = data;
     if (!username || !email || !password) {
         return NextResponse.json({ error: "All fields are required" }, { status: 400 });
     }
     if (!["Admin", "User"].includes(role)) {
         return NextResponse.json({ error: "Invalid role" }, { status: 400 });
     }
     
     const existingUser = await User.find({
         $or: [
             { username: username },
             { email: email }
         ]
     });

     if (existingUser) {
         return NextResponse.json({ error: "User already exists" }, { status: 400 });
     }

     const user = await User.create({
         username,
         email,
         role,
         password,
     });
     
     if (!user) {
         return NextResponse.json({ error: "User registration failed" }, { status: 500 });
     }
 
     return NextResponse.json({ message: "User registered successfully!" });
 
   } catch (error) {
    console.error("Error in registration:", error);
     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
   }
}