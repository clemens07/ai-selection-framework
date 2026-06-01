import { describe, expect, it } from "vitest";

import { buildRecommendationPrompt, recommendationResponseJsonSchema } from "./prompt";
import { QuestionnaireSubmission } from "./schemas";

const submission: QuestionnaireSubmission = {
  runId: "test-run",
  createdAt: "2026-06-01T00:00:00.000Z",
  answers: [
    {
      requirementId: "reliability",
      theme: "trust_and_risk",
      requirementName: "Reliability",
      question: "Do you need dependable results?",
      answerLabel: "a_lot",
      value: 2,
    },
    {
      requirementId: "governance",
      theme: "trust_and_risk",
      requirementName: "Governance",
      question: "Do you need governance controls?",
      answerLabel: "do_not_know",
      value: 0,
    },
  ],
};

describe("buildRecommendationPrompt", () => {
  it("includes the tightened score, summary, and integrity rules", () => {
    const prompt = buildRecommendationPrompt(submission);

    expect(prompt).toContain("Score 2 is a strong driver and can justify a strong recommendation.");
    expect(prompt).toContain("Do not mention governance, auditability, approved-tool policy, or compliance as a driver when governance score is 0 or negative.");
    expect(prompt).toContain("Do not mark planning and task decomposition as suitable solely because interactivity is high.");
    expect(prompt).toContain("The summary must be one concise paragraph of 80 to 120 words.");
    expect(prompt).toContain("Return 5 to 7 key explanations.");
    expect(prompt).toContain("Do not invent requirement IDs, option names, dimensions, or layers.");
  });
});

describe("recommendationResponseJsonSchema", () => {
  it("requires key explanations and keeps the response shape strict", () => {
    expect(
      recommendationResponseJsonSchema.schema.properties.keyExplanations.type,
    ).toBe("array");
    expect(recommendationResponseJsonSchema.schema.additionalProperties).toBe(false);
  });
});
