import { NextResponse } from "next/server";

import { generateRecommendation } from "@/lib/recommendation-engine";
import { QuestionnaireSubmissionSchema } from "@/lib/schemas";
import { missingRequirementIds } from "@/lib/scoring";
import { saveRun } from "@/lib/storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const submission = QuestionnaireSubmissionSchema.parse(json);

    const missingIds = missingRequirementIds(submission.answers);
    if (missingIds.length > 0) {
      return NextResponse.json(
        { error: `Missing answers for: ${missingIds.join(", ")}` },
        { status: 400 },
      );
    }

    const savedRun = await generateRecommendation(submission);
    await saveRun(savedRun);

    return NextResponse.json({
      runId: savedRun.runId,
      result: savedRun.result,
    });
  } catch (caughtError) {
    const errorMessage =
      caughtError instanceof Error ? caughtError.message : "Unknown recommendation error.";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
