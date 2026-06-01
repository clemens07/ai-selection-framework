import { RecommendationEvaluation } from "@/lib/schemas";

const fitClasses: Record<RecommendationEvaluation["fit"], string> = {
  suitable: "bg-emerald-100 text-emerald-800",
  conditionally_suitable: "bg-amber-100 text-amber-800",
  unsuitable: "bg-rose-100 text-rose-800",
  unaffected: "bg-slate-100 text-slate-600",
};

export function TrafficLightTable({
  title,
  rows,
}: {
  title: string;
  rows: RecommendationEvaluation[];
}) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-sm text-slate-500">
              <th className="px-6 py-3 font-medium">Dimension</th>
              <th className="px-6 py-3 font-medium">Option</th>
              <th className="px-6 py-3 font-medium">Fit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={`${row.dimension}-${row.option}`} className="align-top">
                <td className="px-6 py-4 text-sm font-medium text-slate-800">{row.dimension}</td>
                <td className="px-6 py-4 text-sm text-slate-700">{row.option}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`rounded-full px-3 py-1 font-medium ${fitClasses[row.fit]}`}>
                    {row.fit.replaceAll("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
