import { buildRecommendationPrompt, recommendationResponseJsonSchema } from "@/lib/prompt";
import {
  QuestionnaireSubmission,
  RecommendationResult,
  RecommendationResultSchema,
  SavedRun,
} from "@/lib/schemas";

type OpenAIResponsePayload = {
  output_text?: unknown;
  output?: Array<{
    type?: unknown;
    content?: Array<{
      type?: unknown;
      text?: unknown;
      refusal?: unknown;
    }>;
  }>;
};

export function extractResponseText(payload: OpenAIResponsePayload): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const messageText = payload.output
    ?.flatMap((item) => item.content ?? [])
    .find(
      (contentItem) =>
        (contentItem.type === "output_text" || contentItem.type === "text") &&
        typeof contentItem.text === "string" &&
        contentItem.text.trim(),
    );

  if (typeof messageText?.text === "string") {
    return messageText.text;
  }

  const refusal = payload.output
    ?.flatMap((item) => item.content ?? [])
    .find(
      (contentItem) =>
        contentItem.type === "refusal" && typeof contentItem.refusal === "string",
    );

  if (typeof refusal?.refusal === "string") {
    throw new Error(`OpenAI returned a refusal: ${refusal.refusal}`);
  }

  throw new Error("OpenAI response did not contain any readable text output.");
}

async function callOpenAI(submission: QuestionnaireSubmission): Promise<RecommendationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing. Add it to .env.local before running the app.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5-nano",
      input: buildRecommendationPrompt(submission),
      text: {
        format: {
          type: "json_schema",
          ...recommendationResponseJsonSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as OpenAIResponsePayload;
  const rawText = extractResponseText(payload);

  const parsed = RecommendationResultSchema.parse(JSON.parse(rawText));
  return parsed;
}

export async function generateRecommendation(submission: QuestionnaireSubmission): Promise<SavedRun> {
  const result = await callOpenAI(submission);
  return {
    runId: submission.runId,
    createdAt: submission.createdAt,
    questionnaire: submission,
    result,
  };
}
