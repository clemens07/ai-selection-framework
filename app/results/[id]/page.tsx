import Link from "next/link";
import { notFound } from "next/navigation";

import { KeyExplanations } from "@/components/KeyExplanations";
import { PdfExportButton } from "@/components/PdfExportButton";
import { QuestionnaireResults } from "@/components/QuestionnaireResults";
import { RecommendationSummary } from "@/components/RecommendationSummary";
import { RequirementProfileSection } from "@/components/RequirementProfileSection";
import { TrafficLightTable } from "@/components/TrafficLightTable";
import { getRunById } from "@/lib/storage";

export default async function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const run = await getRunById(id);

  if (!run) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Saved result</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Assessment {run.runId}</h1>
          <p className="mt-2 text-sm text-slate-600">{run.createdAt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PdfExportButton runId={run.runId} />
          <Link
            className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-slate-400"
            href="/history"
          >
            Back to history
          </Link>
        </div>
      </div>

      <RecommendationSummary summary={run.result.summary} />
      <RequirementProfileSection answers={run.questionnaire.answers} />

      <div className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Recommendations</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Traffic-light evaluation tables</h2>
        </div>
        <TrafficLightTable rows={run.result.modelRecommendations} title="Model recommendations" />
        <TrafficLightTable rows={run.result.architectureRecommendations} title="Architecture recommendations" />
        <TrafficLightTable rows={run.result.hostingRecommendations} title="Hosting recommendations" />
      </div>

      <KeyExplanations explanations={run.result.keyExplanations} />
      <QuestionnaireResults answers={run.questionnaire.answers} />
    </main>
  );
}
