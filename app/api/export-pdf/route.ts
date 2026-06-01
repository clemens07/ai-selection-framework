import { NextResponse } from "next/server";
import { z } from "zod";

import { renderPdf } from "@/lib/pdf";
import { getRunById } from "@/lib/storage";

export const runtime = "nodejs";

const ExportRequestSchema = z.object({
  runId: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const { runId } = ExportRequestSchema.parse(json);
    const savedRun = await getRunById(runId);

    if (!savedRun) {
      return NextResponse.json({ error: "Run not found." }, { status: 404 });
    }

    const pdfBytes = await renderPdf(savedRun);

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="llm-selection-${runId}.pdf"`,
      },
    });
  } catch (caughtError) {
    const errorMessage =
      caughtError instanceof Error ? caughtError.message : "Unknown PDF export error.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
