import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export type UserRole = "Admin" | "Employee" | null;

export function verify (req: NextRequest): UserRole{
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return null;
    }
    try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      id: string;
      role: "Admin" | "Employee";
    };

    return decoded.role; 
  } catch (err) {
    return null; 
  }

}