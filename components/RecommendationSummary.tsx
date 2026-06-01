export function RecommendationSummary({ summary }: { summary: string }) {
  return (
    <section className="rounded-[1.75rem] border border-pine/20 bg-gradient-to-br from-pine to-emerald-700 p-8 text-white shadow-report">
      <p className="text-sm uppercase tracking-[0.2em] text-white/70">Recommendation summary</p>
      <p className="mt-4 max-w-4xl text-xl leading-8">{summary}</p>
    </section>
  );
}
