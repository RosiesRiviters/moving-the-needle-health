"use client";

import { useState } from "react";

const PLACEHOLDER_SCENARIOS = [
  "Hey, everyone's going to Jake's party tonight and there's gonna be drinks. You HAVE to come, don't be boring!",
  "Come on, just try it once. It's not a big deal, everyone does it. No one will even know.",
  "If you were really my friend, you'd do this for me. I thought I could count on you.",
  "You're overreacting. It's just a little fun. Stop being so uptight about everything.",
  "I dare you to do it. Unless you're scared? I knew you couldn't handle it.",
];

export default function Home() {
  const [currentScenario, setCurrentScenario] = useState(
    PLACEHOLDER_SCENARIOS[0]
  );
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  function loadNextScenario() {
    const remaining = PLACEHOLDER_SCENARIOS.filter(
      (s) => s !== currentScenario
    );
    setCurrentScenario(remaining[Math.floor(Math.random() * remaining.length)]);
    setUserResponse("");
    setFeedback(null);
    setScore(null);
  }

  async function handleSubmit() {
    if (!userResponse.trim()) return;
    setLoading(true);

    // TODO: replace with real API call in next stage
    await new Promise((r) => setTimeout(r, 1000));
    setScore(7);
    setFeedback(
      "Placeholder feedback — AI scoring will be connected in the next stage."
    );

    setLoading(false);
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex w-full max-w-2xl flex-col gap-8 px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Refusal Skills Practice
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Read the message below, then type how you would respond. Submit to
            get AI-powered feedback on your refusal technique.
          </p>
        </div>

        {/* Scenario bubble */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
            Incoming Message
          </p>
          <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
            &ldquo;{currentScenario}&rdquo;
          </p>
        </div>

        {/* Response input */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="response"
            className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Your Response
          </label>
          <textarea
            id="response"
            rows={4}
            placeholder="Type your refusal or boundary-setting response..."
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={loading || !userResponse.trim()}
            className="flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {loading ? "Evaluating..." : "Submit Response"}
          </button>
          <button
            onClick={loadNextScenario}
            className="flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Next Scenario
          </button>
        </div>

        {/* Feedback section */}
        {score !== null && feedback && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {score}/10
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Score
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Based on assertiveness, clarity &amp; respect
                </p>
              </div>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Feedback
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {feedback}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
