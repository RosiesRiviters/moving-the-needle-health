import { NextRequest, NextResponse } from "next/server";
import { evaluateResponse } from "@/lib/evaluate";

export async function POST(request: NextRequest) {
  try {
    const { scenario, userResponse } = await request.json();

    if (!scenario || !userResponse) {
      return NextResponse.json(
        { error: "Both scenario and userResponse are required." },
        { status: 400 }
      );
    }

    const result = await evaluateResponse(scenario, userResponse);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Evaluation error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "Failed to evaluate response. Please try again." },
      { status: 500 }
    );
  }
}
