import { z } from "zod";

export const ThemeSchema = z.enum([
  "technical_flexibility",
  "trust_and_risk",
  "user_agency",
  "workflow_fit",
]);

export const AnswerValueSchema = z.union([
  z.literal(-2),
  z.literal(-1),
  z.literal(0),
  z.literal(1),
  z.literal(2),
]);

export const AnswerLabelSchema = z.enum([
  "not_at_all",
  "not_really",
  "do_not_know",
  "a_little",
  "a_lot",
]);

export const RequirementAnswerSchema = z.object({
  requirementId: z.string(),
  theme: ThemeSchema,
  requirementName: z.string(),
  question: z.string(),
  answerLabel: AnswerLabelSchema,
  value: AnswerValueSchema,
  context: z.string().optional(),
});

export const QuestionnaireSubmissionSchema = z.object({
  runId: z.string(),
  createdAt: z.string(),
  answers: z.array(RequirementAnswerSchema).min(1),
});

export const FitLabelSchema = z.enum([
  "unsuitable",
  "conditionally_suitable",
  "suitable",
  "unaffected",
]);

export const RecommendationEvaluationSchema = z.object({
  layer: z.enum(["model", "architecture", "hosting"]),
  dimension: z.string(),
  option: z.string(),
  fit: FitLabelSchema,
});

export const KeyExplanationSchema = z.object({
  rank: z.number(),
  title: z.string(),
  explanation: z.string(),
  importance: z.enum(["high", "medium", "low"]),
  relatedRequirements: z.array(z.string()),
  relatedOptions: z.array(z.string()),
});

export const RecommendationResultSchema = z.object({
  summary: z.string(),
  modelRecommendations: z.array(RecommendationEvaluationSchema),
  architectureRecommendations: z.array(RecommendationEvaluationSchema),
  hostingRecommendations: z.array(RecommendationEvaluationSchema),
  keyExplanations: z.array(KeyExplanationSchema).min(5).max(7),
});

export const SavedRunSchema = z.object({
  runId: z.string(),
  createdAt: z.string(),
  questionnaire: QuestionnaireSubmissionSchema,
  result: RecommendationResultSchema,
});

export type Theme = z.infer<typeof ThemeSchema>;
export type AnswerLabel = z.infer<typeof AnswerLabelSchema>;
export type RequirementAnswer = z.infer<typeof RequirementAnswerSchema>;
export type QuestionnaireSubmission = z.infer<typeof QuestionnaireSubmissionSchema>;
export type FitLabel = z.infer<typeof FitLabelSchema>;
export type RecommendationEvaluation = z.infer<typeof RecommendationEvaluationSchema>;
export type RecommendationResult = z.infer<typeof RecommendationResultSchema>;
export type SavedRun = z.infer<typeof SavedRunSchema>;
