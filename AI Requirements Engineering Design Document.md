# Design Document: Requirements-Based LLM System Selection MVP

## 1. Purpose

This document describes the design of a lightweight local MVP for a requirements-based LLM system selection tool. The app guides users through a requirement questionnaire, generates a weighted requirement profile, and uses a structured LLM call to recommend suitable model, architecture, and hosting options.

The prototype is intended as a working MVP, not as a fully deployed product. It should be easy to run locally, easy to modify, and suitable for demonstrating the framework logic in a thesis or project context.

---

## 2. Core Idea

The system supports AI tool selection by translating user-rated requirements into configuration recommendations.

The user answers one question per requirement. Each answer is converted into a numerical score. These scores form a prioritized requirement profile. The app then sends this profile, together with the requirement definitions and recommendation options, to an LLM using a structured prompt. The LLM classifies each recommendation option as suitable, conditionally suitable, unsuitable, or unaffected.

The final output is a report containing the requirement profile, recommendation tables, explanations, and the original questionnaire results.

---

## 3. Target User

The intended user is a practitioner or decision-maker who wants to evaluate which type of LLM-based system is suitable for a specific organizational use case.

Possible users include:

- AI consultants
- IT managers
- business analysts
- department leads
- researchers
- innovation or digital transformation teams

The tool does not assume that the user has deep technical knowledge of LLM deployment.

---

## 4. Scope of the MVP

### In Scope

The MVP includes:

- local-only Next.js app
- one-question-at-a-time questionnaire
- optional context textbox for each requirement
- five-point response scale
- conversion of answers into numerical scores
- requirement profile generation
- one LLM call after questionnaire completion
- Zod validation of input and output
- recommendation summary
- radar charts by requirement theme
- traffic-light recommendation tables
- explanation section
- questionnaire result overview
- PDF export
- local JSON file storage
- history page for old iterations

### Out of Scope

The MVP does not include:

- user authentication
- cloud deployment
- database setup
- multi-user collaboration
- admin dashboard
- full deterministic scoring matrix
- production-grade security
- automatic provider pricing comparison
- live benchmarking of models

---

## 5. Technology Stack

| Area | Choice |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Validation | Zod |
| UI | Tailwind CSS and optionally shadcn/ui |
| Charts | Recharts |
| LLM call | Next.js API route |
| LLM model | GPT nano for testing |
| Storage | Local JSON files on disk |
| PDF export | Server-generated PDF file |
| Runtime | Local only |

The MVP uses Zod because the app is implemented in Next.js. Zod can validate both frontend form data and backend LLM responses without requiring a separate Python backend.

---

## 6. User Flow

### Step 1: Start Questionnaire

The user opens the app and starts a new assessment.

### Step 2: Answer Requirement Questions

The app shows one requirement question at a time. Each page contains:

- requirement title
- short description
- need-based question
- five answer options
- optional additional context textbox
- Next and Back buttons

Example question:

> Do you need strong privacy and data sovereignty?

Example optional context:

> We work with customer data and internal contracts.

### Step 3: Complete Questionnaire

After all questions are answered, the user clicks a button to generate recommendations.

### Step 4: Generate Recommendation

The app sends the complete requirement profile to a backend API route. The backend validates the input with Zod, creates the structured prompt, calls the LLM, validates the response, saves the run as a local JSON file, and returns the result.

### Step 5: View Result

The result page shows:

1. recommendation summary
2. requirement profile radar charts
3. traffic-light recommendation tables
4. explanations for key choices
5. questionnaire results

### Step 6: Export PDF

The user can export the result as an actual PDF report.

### Step 7: View History

The user can open a history page to view previous saved iterations.

---

## 7. Requirement Questionnaire

Each requirement is represented as one question. The answer options follow a five-point Likert-type structure.

| Answer | Numerical value |
|---|---:|
| Not at all | -2 |
| Not really | -1 |
| Do not know | 0 |
| A little | 1 |
| A lot | 2 |

The optional context textbox allows users to explain why they selected a certain answer. This context is sent to the LLM and can influence the explanation.

---

## 8. Requirement Themes and Requirements

### Technical Flexibility

| Requirement | Meaning |
|---|---|
| Modularity | The system should allow components to be exchanged or extended. |
| Memory / context continuity | The system should preserve relevant context across sessions or tasks. |
| Replaceability | The organization should be able to switch models, providers, or components. |
| System architecture flexibility | The architecture should support adding components such as RAG, tools, validation, or memory. |

### Trust and Risk

| Requirement | Meaning |
|---|---|
| Governance | The system should comply with approved-tool policies, access rules, and compliance requirements. |
| Privacy and data sovereignty | Sensitive data should remain under appropriate organizational or local control. |
| Reliability | The system should produce dependable outputs for the intended use case. |
| Output verification | Users should be able to check whether outputs are correct, grounded, or suitable. |
| Deployment constraints | The system must respect technical, legal, or organizational deployment restrictions. |

### User Agency

| Requirement | Meaning |
|---|---|
| Human controllability | Users should be able to accept, reject, edit, override, or stop AI outputs or actions. |
| Adoption usability | The system should be easy enough to access, understand, and use. |
| Interactivity | The system should support iterative dialogue, refinement, and co-creation. |
| Human-in-the-loop use | Human review or approval should be built into the workflow where needed. |

### Workflow Fit

| Requirement | Meaning |
|---|---|
| Integration | The system should connect to existing tools, systems, or data sources. |
| Latency | The system should respond fast enough for the task. |
| Output format | The system should produce outputs in reusable formats or schemas. |
| Fit with existing work practices | The system should align with existing workflows and routines. |

---

## 9. Recommendation Space

The recommendation output is structured into three profiles:

1. model profile
2. architecture profile
3. hosting profile

### 9.1 Model Profile

| Dimension | Option |
|---|---|
| Scalability tier | Small-scale model |
| Scalability tier | Medium-scale model |
| Scalability tier | Large-scale model |
| Scalability tier | Ultra-scale / frontier model |
| Application / business orientation | General-purpose model |
| Application / business orientation | Domain-specific model |
| Application / business orientation | Task-specific model |
| Application / business orientation | Multimodal model |

### 9.2 Architecture Profile

| Dimension | Option |
|---|---|
| Memory and context continuity | Short-term memory, long-term memory, persistent chat history, user/task context |
| Knowledge retrieval / RAG | Document retrieval, database retrieval, GraphRAG, internal knowledge base |
| Tool and system access | APIs, function calling, MCP, business-system integration |
| Planning and task decomposition | Step-by-step planning, task decomposition, agentic workflows |
| Control and validation | Guardrails, schema validation, human review, audit checks |
| Profile and role configuration | User profiles, role-based agents, task-specific personas |

### 9.3 Hosting Profile

| Dimension | Option |
|---|---|
| Execution location | Public cloud / API |
| Execution location | Private cloud |
| Execution location | On-premise / local |
| Execution location | Edge / device-local |
| Execution location | Hybrid |
| Ownership / control | Provider-controlled |
| Ownership / control | Enterprise-managed |
| Ownership / control | Organization-controlled |
| Ownership / control | Device-controlled |
| Ownership / control | Shared control |

---

## 10. Recommendation Labels

The LLM classifies every recommendation option using one of four labels.

| Label | Color | Meaning |
|---|---|---|
| unsuitable | Red | The option should generally not be selected for this requirement profile. |
| conditionally_suitable | Orange | The option may work, but only with safeguards, trade-offs, or specific conditions. |
| suitable | Green | The option fits the requirement profile and should be recommended. |
| unaffected | White | The requirement profile does not strongly influence this option. |

Constraints should be treated as strong signals, not absolute exclusions. If an option could still work with safeguards, the LLM may classify it as orange instead of red.

---

## 11. LLM Decision Logic

The MVP uses one LLM call per completed questionnaire.

The LLM receives:

- requirement scores
- optional user context
- requirement definitions
- recommendation options
- traffic-light label definitions
- instruction to return valid structured JSON

The LLM returns:

- recommendation summary
- model recommendation evaluations
- architecture recommendation evaluations
- hosting recommendation evaluations
- explanations for key choices

The LLM should not invent options outside the predefined recommendation space.

---

## 12. Structured Prompt Design

The prompt should contain the following sections:

1. Role and task instruction
2. Requirement profile
3. Optional context per requirement
4. Requirement definitions
5. Recommendation options
6. Label definitions
7. Output schema instruction
8. Evaluation rules

### Prompt Principle

The LLM acts as a structured decision-support component. It does not freely invent recommendations. It classifies predefined options based on the user-rated requirement profile.

### Prompt Instruction Example

```text
You are a decision-support component for LLM system selection.
Evaluate the predefined model, architecture, and hosting options based on the user requirement profile.
Classify each option as unsuitable, conditionally_suitable, suitable, or unaffected.
Use the user scores and optional context.
Do not add new recommendation options.
Return only valid JSON matching the schema.
```

---

## 13. Zod Schemas

### Requirement Answer Schema

```ts
import { z } from "zod";

export const AnswerValueSchema = z.union([
  z.literal(-2),
  z.literal(-1),
  z.literal(0),
  z.literal(1),
  z.literal(2),
]);

export const RequirementAnswerSchema = z.object({
  requirementId: z.string(),
  theme: z.enum([
    "technical_flexibility",
    "trust_and_risk",
    "user_agency",
    "workflow_fit",
  ]),
  requirementName: z.string(),
  question: z.string(),
  answerLabel: z.enum([
    "not_at_all",
    "not_really",
    "do_not_know",
    "a_little",
    "a_lot",
  ]),
  value: AnswerValueSchema,
  context: z.string().optional(),
});
```

### Questionnaire Submission Schema

```ts
export const QuestionnaireSubmissionSchema = z.object({
  runId: z.string(),
  createdAt: z.string(),
  answers: z.array(RequirementAnswerSchema),
});
```

### Recommendation Evaluation Schema

```ts
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
  reason: z.string(),
});
```

### LLM Result Schema

```ts
export const RecommendationResultSchema = z.object({
  runId: z.string(),
  summary: z.string(),
  modelRecommendations: z.array(RecommendationEvaluationSchema),
  architectureRecommendations: z.array(RecommendationEvaluationSchema),
  hostingRecommendations: z.array(RecommendationEvaluationSchema),
  keyExplanations: z.array(
    z.object({
      title: z.string(),
      explanation: z.string(),
      relatedOptions: z.array(z.string()),
    })
  ),
});
```

### Saved Run Schema

```ts
export const SavedRunSchema = z.object({
  runId: z.string(),
  createdAt: z.string(),
  questionnaire: QuestionnaireSubmissionSchema,
  result: RecommendationResultSchema,
});
```

---

## 14. Data Storage

The app saves each completed run as a JSON file.

Suggested folder:

```text
data/runs/
```

Suggested filename:

```text
<timestamp>-<runId>.json
```

Example:

```text
2026-06-01T14-30-12Z-abc123.json
```

Each file contains:

- run ID
- timestamp
- questionnaire answers
- LLM recommendation result

No external database is needed for the MVP.

---

## 15. History Page

The history page reads all JSON files from the local `data/runs` folder.

It displays:

- timestamp
- run ID
- short summary
- link to open result page
- optional delete button

The purpose is to allow users to compare old iterations in the browser.

---

## 16. Result Page Layout

The result page should use a clean report-like layout.

### Section 1: Recommendation Summary

A short summary of the main recommendation.

Example:

> This use case is best suited for a private or hybrid deployment with knowledge retrieval, control and validation, and a large or domain-specific model.

### Section 2: Requirement Profile

Show one radar chart per requirement theme:

- Technical flexibility
- Trust and risk
- User agency
- Workflow fit

Each radar chart displays the requirement scores within that theme.

### Section 3: Traffic-Light Recommendation Tables

Use multiple tables rather than one very large table.

#### Model Recommendation Table

Columns:

- Dimension
- Option
- Fit

#### Architecture Recommendation Table

Columns:

- Dimension
- Option
- Fit

#### Hosting Recommendation Table

Columns:

- Dimension
- Option
- Fit

The fit cell should be colored:

- red for unsuitable
- orange for conditionally suitable
- green for suitable
- white or neutral for unaffected

### Section 4: Explanation of Key Choices

Short explanations should appear after the tables. The explanations should focus on the most important red, orange, and green decisions.

### Section 5: Questionnaire Results

Show the original questionnaire answers.

Columns:

- Theme
- Requirement
- Question
- Selected answer
- Score
- Additional context

---

## 17. PDF Export

The PDF should use a clean report layout rather than copying the webpage exactly.

### PDF Sections

1. Report title and timestamp
2. Recommendation summary
3. Requirement profile charts
4. Model recommendation table
5. Architecture recommendation table
6. Hosting recommendation table
7. Explanation of key choices
8. Questionnaire results

The user exports the PDF by pressing a button on the result page.

The PDF should be generated as an actual `.pdf` file and downloaded by the browser.

---

## 18. Suggested File Structure

```text
app/
  page.tsx
  questionnaire/
    page.tsx
  results/
    [id]/
      page.tsx
  history/
    page.tsx
  api/
    recommend/
      route.ts
    export-pdf/
      route.ts

components/
  QuestionnaireStep.tsx
  RequirementScale.tsx
  RadarChartCard.tsx
  RequirementProfileSection.tsx
  TrafficLightTable.tsx
  RecommendationSummary.tsx
  KeyExplanations.tsx
  QuestionnaireResults.tsx
  PdfExportButton.tsx

lib/
  requirements.ts
  recommendations.ts
  schemas.ts
  prompt.ts
  storage.ts
  pdf.ts
  scoring.ts

data/
  runs/
```

---

## 19. Main Components

### QuestionnaireStep

Displays one requirement question, answer options, optional context field, and navigation buttons.

### RequirementScale

Reusable five-point scale component.

### RadarChartCard

Displays one radar chart for a requirement theme.

### TrafficLightTable

Displays recommendation options with traffic-light labels.

### RecommendationSummary

Displays the LLM-generated overall summary.

### KeyExplanations

Displays short explanations for the most important choices.

### QuestionnaireResults

Displays all questions, answers, scores, and optional context.

### PdfExportButton

Calls the PDF export API route and downloads the generated report.

---

## 20. API Routes

### POST /api/recommend

Input:

- questionnaire answers

Process:

1. Validate input with Zod.
2. Build structured prompt.
3. Call GPT nano.
4. Validate LLM output with Zod.
5. Save run to disk.
6. Return run ID and result.

Output:

- recommendation result

### POST /api/export-pdf

Input:

- run ID

Process:

1. Load saved run from disk.
2. Render clean PDF report.
3. Return PDF file.

Output:

- downloadable PDF

---

## 21. Error Handling

The MVP should handle:

- missing answer
- invalid score
- failed LLM call
- invalid LLM JSON output
- failed file save
- missing run ID
- failed PDF generation

If the LLM output fails validation, the app should show an error and allow the user to retry.

---

## 22. Cost Control

The app uses one LLM call per completed questionnaire to reduce API costs.

Additional cost-saving measures:

- use GPT nano for testing
- keep prompt compact
- use predefined option lists
- request short explanations
- avoid one call per requirement
- save results to avoid repeated calls
- allow viewing old runs without re-calling the LLM

---

## 23. Development Milestones

### Milestone 1: Static Questionnaire

- define requirements in `requirements.ts`
- build questionnaire UI
- implement Next/Back navigation
- store answers in local component state

### Milestone 2: Requirement Profile

- convert answers to values
- group by theme
- render radar charts

### Milestone 3: LLM Recommendation

- create Zod schemas
- create prompt builder
- implement `/api/recommend`
- validate LLM response
- display summary and traffic-light tables

### Milestone 4: Local Persistence

- save completed runs as JSON files
- implement history page
- load old results

### Milestone 5: PDF Export

- create clean report layout
- implement `/api/export-pdf`
- add PDF download button

### Milestone 6: Polish

- improve UI
- improve prompt
- add error handling
- add retry behavior
- refine explanations

---

## 24. Open Design Questions

The following decisions can be refined during implementation:

1. Which PDF library should be used?
2. Should radar charts appear in the PDF as SVG, canvas screenshots, or regenerated server-side?
3. Should the app allow editing a previous run and regenerating recommendations?
4. Should the LLM explain every option or only key choices?
5. Should the app include a confidence score for each recommendation?

For the MVP, the current decision is to explain only the key choices after the recommendation tables.
