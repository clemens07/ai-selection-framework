import { PDFFont, PDFDocument, PDFPage, StandardFonts, rgb } from "pdf-lib";

import { SavedRun } from "@/lib/schemas";
import { getAverageThemeScores } from "@/lib/scoring";

function drawWrappedText(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  width: number,
  font: PDFFont,
  size: number,
  color = rgb(0.07, 0.13, 0.14),
) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    const candidateWidth = font.widthOfTextAtSize(candidate, size);
    if (candidateWidth <= width) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * (size + 4),
      size,
      font,
      color,
    });
  });

  return y - lines.length * (size + 4);
}

function fitColor(fit: string) {
  if (fit === "suitable") return rgb(0.88, 0.97, 0.92);
  if (fit === "conditionally_suitable") return rgb(1, 0.95, 0.85);
  if (fit === "unsuitable") return rgb(0.99, 0.91, 0.91);
  return rgb(0.97, 0.98, 0.98);
}

export async function renderPdf(savedRun: SavedRun) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([842, 1191]);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  let y = 1130;
  page.drawText("Requirements-Based LLM System Selection Report", {
    x: 48,
    y,
    font: bold,
    size: 20,
    color: rgb(0.1, 0.23, 0.2),
  });

  y -= 28;
  page.drawText(`Run ID: ${savedRun.runId}`, { x: 48, y, font: regular, size: 10 });
  y -= 16;
  page.drawText(`Created at: ${savedRun.createdAt}`, { x: 48, y, font: regular, size: 10 });

  y -= 32;
  page.drawText("Recommendation summary", { x: 48, y, font: bold, size: 14 });
  y -= 20;
  y = drawWrappedText(page, savedRun.result.summary, 48, y, 740, regular, 11);

  y -= 26;
  page.drawText("Requirement profile by theme", { x: 48, y, font: bold, size: 14 });
  y -= 18;

  const themeScores = getAverageThemeScores(savedRun.questionnaire.answers);
  themeScores.forEach((themeScore, index) => {
    const boxY = y - index * 46;
    page.drawRectangle({
      x: 48,
      y: boxY - 28,
      width: 740,
      height: 34,
      color: rgb(0.94, 0.96, 0.95),
    });
    page.drawText(themeScore.label, { x: 58, y: boxY - 8, font: bold, size: 11 });
    page.drawText(`Average score: ${themeScore.average.toFixed(2)} / 2`, {
      x: 280,
      y: boxY - 8,
      font: regular,
      size: 11,
    });
  });

  y -= themeScores.length * 46 + 12;

  const sections = [
    ["Model recommendations", savedRun.result.modelRecommendations],
    ["Architecture recommendations", savedRun.result.architectureRecommendations],
    ["Hosting recommendations", savedRun.result.hostingRecommendations],
  ] as const;

  for (const [title, rows] of sections) {
    page.drawText(title, { x: 48, y, font: bold, size: 14 });
    y -= 20;

    rows.slice(0, 6).forEach((row) => {
      page.drawRectangle({
        x: 48,
        y: y - 28,
        width: 740,
        height: 34,
        color: fitColor(row.fit),
      });
      page.drawText(row.dimension, { x: 56, y: y - 10, font: bold, size: 9 });
      page.drawText(row.option, { x: 250, y: y - 10, font: regular, size: 9 });
      page.drawText(row.fit.replaceAll("_", " "), { x: 670, y: y - 10, font: bold, size: 9 });
      y -= 38;
    });

    y -= 8;
  }

  page.drawText("Key explanations", { x: 48, y, font: bold, size: 14 });
  y -= 20;
  [...savedRun.result.keyExplanations]
    .sort((a, b) => a.rank - b.rank)
    .forEach((item) => {
      page.drawText(`${item.rank}. ${item.title} (${item.importance})`, {
        x: 48,
        y,
        font: bold,
        size: 11,
      });
      y -= 16;
      y = drawWrappedText(page, item.explanation, 48, y, 740, regular, 10);
      y -= 10;
      y = drawWrappedText(
        page,
        `Related requirements: ${item.relatedRequirements.join(", ") || "—"}`,
        48,
        y,
        740,
        regular,
        9,
        rgb(0.36, 0.38, 0.42),
      );
      y -= 16;
      y = drawWrappedText(
        page,
        `Related options: ${item.relatedOptions.join(", ") || "—"}`,
        48,
        y,
        740,
        regular,
        9,
        rgb(0.36, 0.38, 0.42),
      );
      y -= 16;
    });

  return pdf.save();
}
