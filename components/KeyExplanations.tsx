import { RecommendationResult } from "@/lib/schemas";

export function KeyExplanations({
  explanations,
}: {
  explanations: RecommendationResult["keyExplanations"];
}) {
  const ordered = [...explanations].sort((a, b) => a.rank - b.rank);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Explanations</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Key choices</h2>
      </div>
      <div className="grid gap-4">
        {ordered.map((item) => (
          <article
            key={`${item.rank}-${item.title}`}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink">
                {item.rank}. {item.title}
              </h3>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                {item.importance}
              </span>
            </div>
            <p className="mt-2 leading-7 text-slate-600">{item.explanation}</p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Related requirements: {item.relatedRequirements.join(", ") || "—"}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500">
              Related options: {item.relatedOptions.join(", ")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
