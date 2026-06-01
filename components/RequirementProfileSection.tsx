import { RequirementAnswer } from "@/lib/schemas";
import { getThemeRadarData } from "@/lib/scoring";

import { RadarChartCard } from "@/components/RadarChartCard";

export function RequirementProfileSection({ answers }: { answers: RequirementAnswer[] }) {
  const radarGroups = getThemeRadarData(answers);

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Requirement profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Radar charts by theme</h2>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        {radarGroups.map((group) => (
          <RadarChartCard key={group.theme} data={group.values} title={group.label} />
        ))}
      </div>
    </section>
  );
}
