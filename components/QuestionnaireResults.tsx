import { themeLabels } from "@/lib/requirements";
import { RequirementAnswer } from "@/lib/schemas";

export function QuestionnaireResults({ answers }: { answers: RequirementAnswer[] }) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Questionnaire results</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Original answers</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-500">
              <th className="px-6 py-3 font-medium">Theme</th>
              <th className="px-6 py-3 font-medium">Requirement</th>
              <th className="px-6 py-3 font-medium">Question</th>
              <th className="px-6 py-3 font-medium">Selected answer</th>
              <th className="px-6 py-3 font-medium">Score</th>
              <th className="px-6 py-3 font-medium">Additional context</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {answers.map((answer) => (
              <tr key={answer.requirementId} className="align-top">
                <td className="px-6 py-4 text-sm text-slate-700">{themeLabels[answer.theme]}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {answer.requirementName}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{answer.question}</td>
                <td className="px-6 py-4 text-sm text-slate-700">
                  {answer.answerLabel.replaceAll("_", " ")}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{answer.value}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {answer.context?.trim() || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
