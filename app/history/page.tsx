import Link from "next/link";

import { listRuns } from "@/lib/storage";

export default async function HistoryPage() {
  const runs = await listRuns();

  return (
    <main className="space-y-6">
      <div className="rounded-[2rem] border border-white/70 bg-white/90 p-8 shadow-sm backdrop-blur">
        <p className="text-sm uppercase tracking-[0.2em] text-pine/70">Saved iterations</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">History</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Review previous assessment runs without triggering a new LLM call.
        </p>
      </div>

      <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm text-slate-500">
                <th className="px-6 py-3 font-medium">Timestamp</th>
                <th className="px-6 py-3 font-medium">Run ID</th>
                <th className="px-6 py-3 font-medium">Summary</th>
                <th className="px-6 py-3 font-medium">Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {runs.length === 0 ? (
                <tr>
                  <td className="px-6 py-8 text-sm text-slate-500" colSpan={4}>
                    No saved runs yet.
                  </td>
                </tr>
              ) : (
                runs.map((run) => (
                  <tr key={run.runId}>
                    <td className="px-6 py-4 text-sm text-slate-700">{run.createdAt}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">{run.runId}</td>
                    <td className="px-6 py-4 text-sm leading-6 text-slate-600">{run.result.summary}</td>
                    <td className="px-6 py-4 text-sm">
                      <Link
                        className="rounded-full bg-mist px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-200"
                        href={`/results/${run.runId}`}
                      >
                        Open result
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
