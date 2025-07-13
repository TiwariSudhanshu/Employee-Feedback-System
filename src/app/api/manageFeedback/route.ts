import { NextRequest, NextResponse } from "next/server";

import connectDb from "@/utils/connectDb";
import Feedback from "@/models/feedback.models";
import {verify} from "@/utils/verify";

export async function GET(request: NextRequest) {
  try {
    await connectDb();
    const userRole = verify(request);
    if (userRole !== "Admin") {
        return NextResponse.json(
            { error: "Unauthorized access" },
            { status: 403 }
        );
        }
        
    const feedbacks = await Feedback.find({}).populate("employeeId", "username email");

    if (!feedbacks || feedbacks.length === 0) {
      return NextResponse.json({ message: "No feedback found" }, { status: 404 });
    }

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDb();
       const userRole = verify(request);
    if (userRole !== "Admin") {
        return NextResponse.json(
            { error: "Unauthorized access" },
            { status: 403 }
        );
        }
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
    }

    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Feedback deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}