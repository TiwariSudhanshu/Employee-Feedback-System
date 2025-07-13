import { NextResponse, NextRequest } from "next/server";
import connectDb from "@/utils/connectDb";
import Feedback from "@/models/feedback.models";
import { verify } from "@/utils/verify";

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const userRole = verify(request);
    if (userRole !== "Employee") {
        return NextResponse.json(
            { error: "Unauthorized access" },
            { status: 403 }
        );
        }

    const data = await request.json();

    const { employeeId, feedbackText } = data;
    if (!employeeId || !feedbackText) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const feedback = await Feedback.create({
      employeeId,
      feedbackText,
    });

    if (!feedback) {
      return NextResponse.json({ error: "Feedback submission failed" }, { status: 500 });
    }

    return NextResponse.json({ message: "Feedback submitted successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error in adding feedback:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
