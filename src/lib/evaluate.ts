import OpenAI from "openai";

export interface EvaluationResult {
  score: number;
  feedback: string[];
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function buildPrompt(scenario: string, userResponse: string): string {
  return `
You are evaluating a teenager's response to a peer pressure or boundary-crossing message.

SCENARIO:
"${scenario}"

USER RESPONSE:
"${userResponse}"

Evaluate based on:
1. Clarity of refusal (0-2)
2. Assertiveness (0-2)
3. Boundary setting (0-2)
4. Resistance to pressure (0-2)
5. Respectfulness (0-2)

Be strict but fair.

Return ONLY valid JSON in this format:
{
  "score": number,
  "feedback": [
    "point 1",
    "point 2",
    "point 3"
  ]
}
`;
}

export async function evaluateResponse(
  scenario: string,
  userResponse: string
): Promise<EvaluationResult> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: buildPrompt(scenario, userResponse),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("No response from AI model.");
  }

  const result = JSON.parse(content) as EvaluationResult;

  return {
    score: Math.max(0, Math.min(10, Math.round(result.score))),
    feedback: result.feedback,
  };
}
