# AI Selection Framework

A local Next.js MVP for turning stakeholder requirements into structured recommendations for:

- model choice
- system architecture
- hosting and control setup

The app guides users through a questionnaire, sends the full requirement profile to an OpenAI model, stores the result locally, and renders a report with charts, traffic-light recommendation tables, ranked explanations, and PDF export.

## What it does

- Runs a one-question-at-a-time requirements assessment
- Captures both score-based answers and optional free-text context
- Builds a structured prompt for the OpenAI Responses API
- Generates recommendations across `model`, `architecture`, and `hosting`
- Stores completed runs locally in `data/runs`
- Shows saved run history
- Exports results as PDF

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zod
- Recharts
- pdf-lib
- Vitest

## Getting started

Install dependencies:

```bash
npm install
```

Create or update your local environment file:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5-nano
```

The app expects these values in [`.env.local`](</Users/clemensjanicki/Documents/uni/research paper/prototype/.env.local>).

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm test
```

## How the app works

1. The questionnaire in [`app/questionnaire/page.tsx`](</Users/clemensjanicki/Documents/uni/research paper/prototype/app/questionnaire/page.tsx>) collects requirement scores from `-2` to `2` plus optional context.
2. The API route in [`app/api/recommend/route.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/app/api/recommend/route.ts>) validates the submission and calls the recommendation engine.
3. The engine in [`lib/recommendation-engine.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib/recommendation-engine.ts>) sends a single prompt to the OpenAI Responses API.
4. The prompt is assembled in [`lib/prompt.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib/prompt.ts>) using:
   - requirement definitions and interpretation guidance from [`lib/requirements.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib/requirements.ts>)
   - recommendation options and recommendation guidance from [`lib/recommendations.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib/recommendations.ts>)
5. The structured result is validated with Zod schemas from [`lib/schemas.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib/schemas.ts>).
6. Runs are saved locally through [`lib/storage.ts`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib/storage.ts>) and rendered in the results and history pages.

## Project structure

- [`app`](</Users/clemensjanicki/Documents/uni/research paper/prototype/app>) App Router pages and API routes
- [`components`](</Users/clemensjanicki/Documents/uni/research paper/prototype/components>) report, questionnaire, and visualization UI
- [`lib`](</Users/clemensjanicki/Documents/uni/research paper/prototype/lib>) prompt construction, schemas, storage, PDF generation, and OpenAI integration
- [`data/runs`](</Users/clemensjanicki/Documents/uni/research paper/prototype/data/runs>) locally saved assessment runs

## Important behavior

- The app is AI-only for recommendation generation. If `OPENAI_API_KEY` is missing, recommendation requests fail instead of falling back to local heuristics.
- Recommendation rows contain only fit labels: `suitable`, `conditionally_suitable`, `unsuitable`, or `unaffected`.
- The LLM is instructed to keep strong recommendations tied to score `2` requirements and to avoid treating neutral or negative requirements as positive drivers.

## Output format

Each generated report contains:

- a concise summary paragraph
- requirement-profile radar charts
- traffic-light tables for model, architecture, and hosting
- ranked key explanations
- original questionnaire answers, scores, and context

## Testing and validation

Run:

```bash
npm test
npm run typecheck
npm run build
```

These checks cover prompt assembly, OpenAI response parsing, TypeScript correctness, and production build validity.
