"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type RadarChartCardProps = {
  title: string;
  data: Array<{ requirement: string; score: number }>;
};

export function RadarChartCard({ title, data }: RadarChartCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-ink">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#d6e3df" />
            <PolarAngleAxis dataKey="requirement" tick={{ fill: "#334155", fontSize: 11 }} />
            <Radar
              dataKey="score"
              fill="#1a5f52"
              fillOpacity={0.28}
              name="Score"
              stroke="#1a5f52"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
