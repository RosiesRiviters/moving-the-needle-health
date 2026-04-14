"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type Category,
  type Difficulty,
  CATEGORIES,
  DIFFICULTIES,
} from "@/data/scenarios";

const ALL_CATEGORIES: ("all" | Category)[] = ["all", ...CATEGORIES];
const ALL_DIFFICULTIES: ("all" | Difficulty)[] = ["all", ...DIFFICULTIES];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface GeneratedScenario {
  message: string;
  category: Category;
  difficulty: Difficulty;
}

export default function Home() {
  const [categoryFilter, setCategoryFilter] = useState<"all" | Category>(
    "all"
  );
  const [difficultyFilter, setDifficultyFilter] = useState<
    "all" | Difficulty
  >("all");
  const [currentScenario, setCurrentScenario] =
    useState<GeneratedScenario | null>(null);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState<string[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateScenario = useCallback(async (
    cat: "all" | Category,
    diff: "all" | Difficulty
  ) => {
    setGenerating(true);
    setUserResponse("");
    setFeedback(null);
    setScore(null);

    const category = cat === "all" ? pickRandom(CATEGORIES) : cat;
    const difficulty = diff === "all" ? pickRandom(DIFFICULTIES) : diff;

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, difficulty }),
      });

      const data = await res.json();

      if (!res.ok) {
        setCurrentScenario({
          message: "Failed to generate scenario. Click Next Scenario to try again.",
          category,
          difficulty,
        });
        return;
      }

      setCurrentScenario(data);
    } catch {
      setCurrentScenario({
        message: "Network error. Click Next Scenario to try again.",
        category,
        difficulty,
      });
    } finally {
      setGenerating(false);
    }
  }, []);

  useEffect(() => {
    generateScenario(categoryFilter, difficultyFilter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function loadNextScenario() {
    generateScenario(categoryFilter, difficultyFilter);
  }

  async function handleSubmit() {
    if (!userResponse.trim() || !currentScenario) return;
    setLoading(true);
    setFeedback(null);
    setScore(null);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: currentScenario.message,
          userResponse,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFeedback([data.error ?? "Something went wrong. Please try again."]);
        return;
      }

      setScore(data.score);
      setFeedback(data.feedback);
    } catch {
      setFeedback(["Network error — could not reach the server."]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <div className="flex w-full max-w-7xl gap-6 px-6 py-16 sm:py-24">
        {/* Left sidebar — Disclaimer */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl bg-zinc-100 px-5 py-4 dark:bg-zinc-900">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Disclaimer
            </p>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              This tool is designed for educational purposes only as part of an
              MYP Health project on refusal and limit-setting skills. The
              scenarios are AI-generated and do not represent real conversations.
              AI feedback is not a substitute for professional advice. If you or
              someone you know is in an unsafe situation, please reach out to a
              trusted adult or contact the services listed on the right.
            </p>
          </div>
        </aside>

        {/* Center — Main content */}
        <main className="flex min-w-0 flex-1 flex-col gap-8">
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

          {/* Filters */}
          <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Category
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                        categoryFilter === cat
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Difficulty
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficultyFilter(diff)}
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                        difficultyFilter === diff
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Each scenario is uniquely generated by AI
            </p>
          </div>

          {/* Scenario bubble */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            {generating ? (
              <div className="flex items-center gap-3 py-4">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-600 dark:border-t-zinc-100" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Generating scenario...
                </p>
              </div>
            ) : currentScenario ? (
              <>
                <div className="mb-3 flex items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                    Incoming Message
                  </p>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {currentScenario.category}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {currentScenario.difficulty}
                  </span>
                </div>
                <p className="text-lg leading-relaxed text-zinc-800 dark:text-zinc-200">
                  &ldquo;{currentScenario.message}&rdquo;
                </p>
              </>
            ) : null}
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
              disabled={loading || generating || !userResponse.trim()}
              className="flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              {loading ? "Evaluating..." : "Submit Response"}
            </button>
            <button
              onClick={loadNextScenario}
              disabled={generating}
              className="flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {generating ? "Generating..." : "Next Scenario"}
            </button>
          </div>

          {/* Feedback section */}
          {score !== null && feedback && (
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              {/* Score banner */}
              <div
                className={`flex items-center gap-5 px-6 py-5 ${
                  score >= 7
                    ? "bg-emerald-50 dark:bg-emerald-950/40"
                    : score >= 4
                      ? "bg-amber-50 dark:bg-amber-950/40"
                      : "bg-red-50 dark:bg-red-950/40"
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full ${
                    score >= 7
                      ? "bg-emerald-100 dark:bg-emerald-900/60"
                      : score >= 4
                        ? "bg-amber-100 dark:bg-amber-900/60"
                        : "bg-red-100 dark:bg-red-900/60"
                  }`}
                >
                  <span
                    className={`text-2xl font-extrabold ${
                      score >= 7
                        ? "text-emerald-700 dark:text-emerald-400"
                        : score >= 4
                          ? "text-amber-700 dark:text-amber-400"
                          : "text-red-700 dark:text-red-400"
                    }`}
                  >
                    {score}
                  </span>
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {score}/10
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {score >= 7
                      ? "Strong refusal skills"
                      : score >= 4
                        ? "Room for improvement"
                        : "Needs more practice"}
                  </p>
                </div>
              </div>

              {/* Feedback points */}
              <div className="px-6 py-5">
                <p className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Feedback
                </p>
                <ul className="space-y-2.5">
                  {feedback.map((point, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          score >= 7
                            ? "bg-emerald-500"
                            : score >= 4
                              ? "bg-amber-500"
                              : "bg-red-500"
                        }`}
                      />
                      <span className="text-zinc-600 dark:text-zinc-400">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Mobile-only footer (stacked below on small screens) */}
          <footer className="mt-4 flex flex-col gap-5 border-t border-zinc-200 pt-8 lg:hidden dark:border-zinc-800">
            <div className="rounded-xl bg-zinc-100 px-5 py-4 dark:bg-zinc-900">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Disclaimer
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                This tool is designed for educational purposes only as part of
                an MYP Health project on refusal and limit-setting skills. The
                scenarios are AI-generated and do not represent real
                conversations. AI feedback is not a substitute for professional
                advice. If you or someone you know is in an unsafe situation,
                please reach out to a trusted adult or contact the services
                below.
              </p>
            </div>

            <div className="rounded-xl bg-zinc-100 px-5 py-4 dark:bg-zinc-900">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Need help? Contact these services
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex flex-col gap-0.5">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Emergency Services
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Call <span className="font-semibold">911</span>
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    988 Suicide &amp; Crisis Lifeline
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Call or text <span className="font-semibold">988</span> — free, confidential, 24/7
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    Crisis Text Line
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Text <span className="font-semibold">HOME</span> to{" "}
                    <span className="font-semibold">741741</span>
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    SAMHSA National Helpline
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Call{" "}
                    <span className="font-semibold">1-800-662-4357</span> — free, confidential treatment referrals 24/7
                  </span>
                </li>
                <li className="flex flex-col gap-0.5">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    National Domestic Violence Hotline
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Call <span className="font-semibold">1-800-799-7233</span>{" "}
                    or text <span className="font-semibold">START</span> to{" "}
                    <span className="font-semibold">88788</span>
                  </span>
                </li>
              </ul>
            </div>
          </footer>

          <p className="pb-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
            MYP Personal Project — Moving the Needle in Health &amp; Responsible
            Relationships
          </p>
        </main>

        {/* Right sidebar — Help services */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl bg-zinc-100 px-5 py-4 dark:bg-zinc-900">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Need help? Contact these services
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex flex-col gap-0.5">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  Emergency Services
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Call <span className="font-semibold">911</span>
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  988 Suicide &amp; Crisis Lifeline
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Call or text <span className="font-semibold">988</span> — free, confidential, 24/7
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  Crisis Text Line
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Text <span className="font-semibold">HOME</span> to{" "}
                  <span className="font-semibold">741741</span>
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  SAMHSA National Helpline
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Call{" "}
                  <span className="font-semibold">1-800-662-4357</span> — free, confidential treatment referrals 24/7
                </span>
              </li>
              <li className="flex flex-col gap-0.5">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  National Domestic Violence Hotline
                </span>
                <span className="text-zinc-600 dark:text-zinc-400">
                  Call <span className="font-semibold">1-800-799-7233</span> or
                  text <span className="font-semibold">START</span> to{" "}
                  <span className="font-semibold">88788</span>
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
