"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { QuestionnaireStep } from "@/components/QuestionnaireStep";
import { answerOptions, requirements } from "@/lib/requirements";
import { AnswerLabel, RequirementAnswer } from "@/lib/schemas";

type DraftAnswer = {
  answerLabel?: AnswerLabel;
  context: string;
};

function buildRunId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drafts, setDrafts] = useState<Record<string, DraftAnswer>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentRequirement = requirements[currentIndex];
  const currentDraft = drafts[currentRequirement.id] ?? { context: "" };

  const canGoNext = Boolean(currentDraft.answerLabel);

  const progress = useMemo(() => {
    return Math.round(
      (Object.values(drafts).filter((draft) => draft.answerLabel).length / requirements.length) * 100,
    );
  }, [drafts]);

  function updateCurrentDraft(nextDraft: Partial<DraftAnswer>) {
    setDrafts((previous) => ({
      ...previous,
      [currentRequirement.id]: {
        ...previous[currentRequirement.id],
        context: previous[currentRequirement.id]?.context ?? "",
        ...nextDraft,
      },
    }));
  }

  async function submitQuestionnaire() {
    setIsSubmitting(true);
    setError(null);

    try {
      const answers: RequirementAnswer[] = requirements.map((requirement) => {
        const draft = drafts[requirement.id];
        const option = answerOptions.find((item) => item.answerLabel === draft?.answerLabel);

        if (!option) {
          throw new Error(`Missing answer for ${requirement.name}.`);
        }

        return {
          requirementId: requirement.id,
          theme: requirement.theme,
          requirementName: requirement.name,
          question: requirement.question,
          answerLabel: option.answerLabel,
          value: option.value,
          context: draft?.context.trim() ? draft.context.trim() : undefined,
        };
      });

      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runId: buildRunId(),
          createdAt: new Date().toISOString(),
          answers,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to generate recommendation.");
      }

      router.push(`/results/${payload.runId}`);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unknown recommendation error.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <aside className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-sm backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Assessment progress</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Questionnaire</h1>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-pine transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-slate-600">{progress}% complete</p>

        <div className="mt-8 space-y-3">
          {requirements.map((requirement, index) => (
            <button
              key={requirement.id}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                index === currentIndex
                  ? "bg-pine text-white"
                  : drafts[requirement.id]?.answerLabel
                    ? "bg-emerald-50 text-slate-800"
                    : "bg-slate-50 text-slate-600"
              }`}
              onClick={() => setCurrentIndex(index)}
              type="button"
            >
              <span className="pr-4 text-sm font-medium">{requirement.name}</span>
              <span className="text-xs uppercase tracking-[0.18em]">
                {drafts[requirement.id]?.answerLabel ? "Done" : index + 1}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-4">
        <QuestionnaireStep
          canGoBack={currentIndex > 0}
          canGoNext={canGoNext}
          context={currentDraft.context}
          currentIndex={currentIndex}
          isSubmitting={isSubmitting}
          onAnswerChange={(answerLabel) => updateCurrentDraft({ answerLabel })}
          onBack={() => setCurrentIndex((value) => value - 1)}
          onContextChange={(context) => updateCurrentDraft({ context })}
          onNext={() => {
            if (currentIndex === requirements.length - 1) {
              void submitQuestionnaire();
            } else {
              setCurrentIndex((value) => value + 1);
            }
          }}
          requirement={currentRequirement}
          total={requirements.length}
          value={currentDraft.answerLabel}
        />
        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}
      </div>
    </main>
  );
}
