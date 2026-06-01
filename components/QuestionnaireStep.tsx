"use client";

import { RequirementDefinition } from "@/lib/requirements";
import { AnswerLabel } from "@/lib/schemas";

import { RequirementScale } from "@/components/RequirementScale";

type QuestionnaireStepProps = {
  currentIndex: number;
  total: number;
  requirement: RequirementDefinition;
  value?: AnswerLabel;
  context: string;
  onAnswerChange: (answer: AnswerLabel) => void;
  onContextChange: (context: string) => void;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  isSubmitting: boolean;
};

export function QuestionnaireStep({
  currentIndex,
  total,
  requirement,
  value,
  context,
  onAnswerChange,
  onContextChange,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  isSubmitting,
}: QuestionnaireStepProps) {
  return (
    <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-report backdrop-blur">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">{requirement.themeLabel}</p>
          <h2 className="mt-2 text-3xl font-semibold text-ink">{requirement.name}</h2>
        </div>
        <div className="rounded-full bg-mist px-4 py-2 text-sm font-medium text-slate-700">
          {currentIndex + 1} / {total}
        </div>
      </div>

      <p className="mb-2 text-lg text-slate-800">{requirement.question}</p>
      <p className="mb-8 max-w-3xl text-sm leading-6 text-slate-600">{requirement.description}</p>

      <RequirementScale onChange={onAnswerChange} value={value} />

      <div className="mt-8">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Optional context
        </label>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-pine focus:bg-white"
          onChange={(event) => onContextChange(event.target.value)}
          placeholder="Explain why this matters for your use case."
          value={context}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!canGoBack || isSubmitting}
          onClick={onBack}
          type="button"
        >
          Back
        </button>
        <button
          className="rounded-full bg-pine px-6 py-3 font-medium text-white transition hover:bg-pine/90 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!canGoNext || isSubmitting}
          onClick={onNext}
          type="button"
        >
          {isSubmitting ? "Generating..." : currentIndex === total - 1 ? "Generate recommendations" : "Next"}
        </button>
      </div>
    </section>
  );
}
