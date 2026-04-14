import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  scenarioRequirements,
  type Category,
  type Difficulty,
  CATEGORIES,
  DIFFICULTIES,
} from "@/data/scenarios";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { category, difficulty } = await request.json();

    if (
      !CATEGORIES.includes(category) ||
      !DIFFICULTIES.includes(difficulty)
    ) {
      return NextResponse.json(
        { error: "Invalid category or difficulty." },
        { status: 400 }
      );
    }

    const reqs =
      scenarioRequirements[category as Category][difficulty as Difficulty];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content: `You generate realistic text messages that a teenager might receive from a peer. The messages are used in a health education tool to help students practise refusal and limit-setting skills.

Rules:
- Write ONLY the text message itself, nothing else — no quotation marks, no labels, no explanation.
- The message should sound like a real teenager texting — casual language, abbreviations are okay.
- The message must be 1-3 sentences long.
- Do NOT include any violence, explicit sexual content, or slurs.
- The message should require the reader to set a boundary or refuse.`,
        },
        {
          role: "user",
          content: `Generate a text message with these requirements:

Category: ${category}
Difficulty: ${difficulty}
Tone: ${reqs.tone}
Tactics used: ${reqs.tactics.join(", ")}
Context: ${reqs.context}`,
        },
      ],
    });

    const message = completion.choices[0]?.message?.content?.trim();

    if (!message) {
      return NextResponse.json(
        { error: "Failed to generate scenario." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message, category, difficulty });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate scenario. Please try again." },
      { status: 500 }
    );
  }
}
