import { promises as fs } from "fs";
import path from "path";

import { SavedRun, SavedRunSchema } from "@/lib/schemas";

const runsDirectory = path.join(process.cwd(), "data", "runs");

export async function ensureRunsDirectory() {
  await fs.mkdir(runsDirectory, { recursive: true });
}

export function getRunFilename(createdAt: string, runId: string) {
  return `${createdAt.replaceAll(":", "-")}-${runId}.json`;
}

export async function saveRun(savedRun: SavedRun) {
  await ensureRunsDirectory();

  const filePath = path.join(
    runsDirectory,
    getRunFilename(savedRun.createdAt, savedRun.runId),
  );

  await fs.writeFile(filePath, JSON.stringify(savedRun, null, 2), "utf-8");
  return filePath;
}

function normalizeSavedRun(rawRun: unknown) {
  if (!rawRun || typeof rawRun !== "object") {
    return rawRun;
  }

  const candidate = rawRun as Record<string, unknown>;
  const result =
    candidate.result && typeof candidate.result === "object"
      ? (candidate.result as Record<string, unknown>)
      : null;

  if (!result) {
    return rawRun;
  }

  const explanations = Array.isArray(result.keyExplanations) ? result.keyExplanations : [];
  const normalizedExplanations = explanations.map((explanation, index) => {
    const item =
      explanation && typeof explanation === "object"
        ? (explanation as Record<string, unknown>)
        : {};

    return {
      rank: typeof item.rank === "number" ? item.rank : index + 1,
      title: typeof item.title === "string" ? item.title : `Legacy explanation ${index + 1}`,
      explanation:
        typeof item.explanation === "string"
          ? item.explanation
          : "This saved run was created before the stricter explanation structure and was normalized for compatibility.",
      importance:
        item.importance === "high" || item.importance === "medium" || item.importance === "low"
          ? item.importance
          : index === 0
            ? "high"
            : index < 3
              ? "medium"
              : "low",
      relatedRequirements: Array.isArray(item.relatedRequirements)
        ? item.relatedRequirements
        : [],
      relatedOptions: Array.isArray(item.relatedOptions) ? item.relatedOptions : [],
    };
  });

  const normalizedRecommendations = (value: unknown, layer: "model" | "architecture" | "hosting") =>
    Array.isArray(value)
      ? value.map((item) => {
          const row =
            item && typeof item === "object" ? (item as Record<string, unknown>) : {};
          return {
            layer,
            dimension: typeof row.dimension === "string" ? row.dimension : "",
            option: typeof row.option === "string" ? row.option : "",
            fit:
              row.fit === "unsuitable" ||
              row.fit === "conditionally_suitable" ||
              row.fit === "suitable" ||
              row.fit === "unaffected"
                ? row.fit
                : "unaffected",
          };
        })
      : [];

  const boundedExplanations =
    normalizedExplanations.length > 7 ? normalizedExplanations.slice(0, 7) : normalizedExplanations;

  if (boundedExplanations.length >= 5) {
    return {
      ...candidate,
      result: {
        ...result,
        modelRecommendations: normalizedRecommendations(result.modelRecommendations, "model"),
        architectureRecommendations: normalizedRecommendations(
          result.architectureRecommendations,
          "architecture",
        ),
        hostingRecommendations: normalizedRecommendations(result.hostingRecommendations, "hosting"),
        keyExplanations: boundedExplanations,
      },
    };
  }

  const paddedExplanations = [...boundedExplanations];
  while (paddedExplanations.length < 5) {
    paddedExplanations.push({
      rank: paddedExplanations.length + 1,
      title: `Legacy explanation ${paddedExplanations.length + 1}`,
      explanation:
        "This saved run was created before the stricter explanation count rule and was padded for compatibility.",
      importance: paddedExplanations.length === 0 ? "high" : "low",
      relatedRequirements: [],
      relatedOptions: [],
    });
  }

  return {
    ...candidate,
    result: {
      ...result,
      modelRecommendations: normalizedRecommendations(result.modelRecommendations, "model"),
      architectureRecommendations: normalizedRecommendations(
        result.architectureRecommendations,
        "architecture",
      ),
      hostingRecommendations: normalizedRecommendations(result.hostingRecommendations, "hosting"),
      keyExplanations: paddedExplanations,
    },
  };
}

export async function listRuns() {
  await ensureRunsDirectory();
  const entries = await fs.readdir(runsDirectory);

  const runs = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".json"))
      .map(async (entry) => {
        const content = await fs.readFile(path.join(runsDirectory, entry), "utf-8");
        return SavedRunSchema.parse(normalizeSavedRun(JSON.parse(content)));
      }),
  );

  return runs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getRunById(runId: string) {
  const runs = await listRuns();
  return runs.find((run) => run.runId === runId) ?? null;
}
