import Link from "next/link";

import { requirements } from "@/lib/requirements";

export default function HomePage() {
  return (
    <main className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
      <section className="rounded-[2.5rem] bg-gradient-to-br from-ink via-pine to-emerald-700 p-10 text-white shadow-report">
        <p className="text-sm uppercase tracking-[0.25em] text-white/70">
          Requirements-based LLM selection
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight">
          Turn stakeholder needs into a grounded model, architecture, and hosting recommendation.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
          This local MVP guides one requirement at a time, builds a weighted profile, and generates a structured recommendation report with charts, traffic-light tables, explanations, and PDF export.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-white px-6 py-3 font-medium text-ink transition hover:bg-slate-100"
            href="/questionnaire"
          >
            Start new assessment
          </Link>
          <Link
            className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            href="/history"
          >
            View saved runs
          </Link>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Included requirements</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">{requirements.length} questionnaire items</h2>
        <div className="mt-6 space-y-4">
          {requirements.slice(0, 6).map((requirement) => (
            <article
              key={requirement.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                {requirement.themeLabel}
              </p>
              <h3 className="mt-2 font-semibold text-slate-800">{requirement.name}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{requirement.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
