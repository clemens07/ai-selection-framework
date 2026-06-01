import { requirements, themeLabels } from "@/lib/requirements";
import { RequirementAnswer, Theme } from "@/lib/schemas";

export type ThemeRadarPoint = {
  requirement: string;
  score: number;
};

export function groupAnswersByTheme(answers: RequirementAnswer[]) {
  return answers.reduce<Record<Theme, RequirementAnswer[]>>(
    (acc, answer) => {
      acc[answer.theme].push(answer);
      return acc;
    },
    {
      technical_flexibility: [],
      trust_and_risk: [],
      user_agency: [],
      workflow_fit: [],
    },
  );
}

export function getThemeRadarData(answers: RequirementAnswer[]) {
  const grouped = groupAnswersByTheme(answers);

  return Object.entries(grouped).map(([theme, themeAnswers]) => ({
    theme: theme as Theme,
    label: themeLabels[theme as Theme],
    values: themeAnswers.map((answer) => ({
      requirement: answer.requirementName,
      score: answer.value,
    })),
  }));
}

export function getAverageThemeScores(answers: RequirementAnswer[]) {
  const grouped = groupAnswersByTheme(answers);

  return Object.entries(grouped).map(([theme, themeAnswers]) => {
    const average =
      themeAnswers.length === 0
        ? 0
        : themeAnswers.reduce((sum, answer) => sum + answer.value, 0) / themeAnswers.length;

    return {
      theme: theme as Theme,
      label: themeLabels[theme as Theme],
      average,
    };
  });
}

export function missingRequirementIds(answers: RequirementAnswer[]) {
  const present = new Set(answers.map((answer) => answer.requirementId));
  return requirements.filter((requirement) => !present.has(requirement.id)).map((requirement) => requirement.id);
}
