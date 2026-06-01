"use client";

import { answerOptions } from "@/lib/requirements";
import { AnswerLabel } from "@/lib/schemas";

type RequirementScaleProps = {
  value?: AnswerLabel;
  onChange: (value: AnswerLabel) => void;
};

export function RequirementScale({ value, onChange }: RequirementScaleProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {answerOptions.map((option) => (
        <label
          key={option.answerLabel}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-center transition ${
            value === option.answerLabel
              ? "border-pine bg-pine/10"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="font-medium text-slate-800">{option.label}</span>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
            {option.value}
          </span>
          <input
            className="sr-only"
            checked={value === option.answerLabel}
            name="answer"
            onChange={() => onChange(option.answerLabel)}
            type="radio"
            value={option.answerLabel}
          />
        </label>
      ))}
    </div>
  );
}
