"use client";

import { useState } from "react";

export function PdfExportButton({ runId }: { runId: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onExport() {
    setIsExporting(true);
    setError(null);

    try {
      const response = await fetch("/api/export-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId }),
      });

      if (!response.ok) {
        throw new Error("Failed to export PDF.");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `llm-selection-${runId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unknown export error.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <button
        className="rounded-full bg-ink px-5 py-3 font-medium text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isExporting}
        onClick={onExport}
        type="button"
      >
        {isExporting ? "Exporting..." : "Export PDF"}
      </button>
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
    </div>
  );
}
