import { AnswerLabel, Theme } from "@/lib/schemas";

export type RequirementDefinition = {
  id: string;
  theme: Theme;
  themeLabel: string;
  name: string;
  description: string;
  question: string;
  lowImportanceExample?: string;
  mediumImportanceExample?: string;
  highImportanceExample?: string;
};

export const answerOptions: Array<{
  label: string;
  answerLabel: AnswerLabel;
  value: -2 | -1 | 0 | 1 | 2;
}> = [
  { label: "Not at all", answerLabel: "not_at_all", value: -2 },
  { label: "Not really", answerLabel: "not_really", value: -1 },
  { label: "Do not know", answerLabel: "do_not_know", value: 0 },
  { label: "A little", answerLabel: "a_little", value: 1 },
  { label: "A lot", answerLabel: "a_lot", value: 2 },
];

export const themeLabels: Record<Theme, string> = {
  technical_flexibility: "Technical flexibility",
  trust_and_risk: "Trust and risk",
  user_agency: "User agency",
  workflow_fit: "Workflow fit",
};

export const requirements: RequirementDefinition[] = [
  {
    id: "modularity",
    theme: "technical_flexibility",
    themeLabel: themeLabels.technical_flexibility,
    name: "Modularity",
    description: "The system should allow components to be exchanged or extended.",
    question: "Do you need the system to support modular components that can be swapped or extended over time?",
  },
  {
    id: "memory_context_continuity",
    theme: "technical_flexibility",
    themeLabel: themeLabels.technical_flexibility,
    name: "Memory / context continuity",
    description:
      "The system should preserve relevant user, task, project, or conversation context across interactions when continuity is needed.",
    question: "Do you need the system to preserve relevant context across sessions, users, or tasks?",
    lowImportanceExample: "Each task is independent, so the AI does not need to remember past interactions.",
    mediumImportanceExample: "The AI should remember context within one project or session.",
    highImportanceExample: "The system should preserve user, project, or task context across sessions to reduce repeated explanations.",
  },
  {
    id: "replaceability",
    theme: "technical_flexibility",
    themeLabel: themeLabels.technical_flexibility,
    name: "Replaceability",
    description: "The organization should be able to switch models, providers, or components.",
    question: "Is it important that you can replace models, providers, or infrastructure without major rework?",
  },
  {
    id: "system_architecture_flexibility",
    theme: "technical_flexibility",
    themeLabel: themeLabels.technical_flexibility,
    name: "System architecture flexibility",
    description:
      "The architecture should support different components such as RAG, tool use, validation layers, or human review when the use case evolves.",
    question: "Do you expect the system to grow with added retrieval, tools, validation, or memory components?",
    lowImportanceExample: "A simple prompt-based tool is sufficient.",
    mediumImportanceExample: "The system may later need retrieval or validation.",
    highImportanceExample:
      "The system should be able to support several components such as RAG, tool use, validation, memory, and human review if the use case evolves.",
  },
  {
    id: "governance",
    theme: "trust_and_risk",
    themeLabel: themeLabels.trust_and_risk,
    name: "Governance",
    description:
      "The system must comply with organizational rules, approved-tool policies, access controls, auditability needs, and regulatory or compliance requirements.",
    question: "Do you need the system to fit strict governance, audit, or approved-tool policies?",
    lowImportanceExample: "The use case is informal and does not involve company rules or regulated data.",
    mediumImportanceExample: "The tool should follow internal policies but does not require strict approval workflows.",
    highImportanceExample: "Only approved tools may be used, and access, logging, compliance, and policy controls are mandatory.",
  },
  {
    id: "privacy_data_sovereignty",
    theme: "trust_and_risk",
    themeLabel: themeLabels.trust_and_risk,
    name: "Privacy and data sovereignty",
    description:
      "Sensitive or proprietary data must be protected, including control over where data is processed, stored, retained, or shared.",
    question: "Do you need strong privacy, data sovereignty, or tight control over where sensitive data is processed?",
    lowImportanceExample: "The task uses public or non-sensitive information.",
    mediumImportanceExample: "Some internal data may be used, but it is not highly confidential.",
    highImportanceExample: "Sensitive, proprietary, regulated, or customer data must stay under organizational or local control.",
  },
  {
    id: "reliability",
    theme: "trust_and_risk",
    themeLabel: themeLabels.trust_and_risk,
    name: "Reliability",
    description: "The system should produce dependable outputs for the intended use case.",
    question: "Do you need the system to deliver dependable results with limited tolerance for inconsistent behavior?",
    lowImportanceExample: "Occasional mistakes are acceptable because the output is only used for brainstorming.",
    mediumImportanceExample: "The output should usually be correct, but users can tolerate some manual correction.",
    highImportanceExample: "Incorrect outputs could cause legal, financial, operational, or reputational harm.",
  },
  {
    id: "output_verification",
    theme: "trust_and_risk",
    themeLabel: themeLabels.trust_and_risk,
    name: "Output verification",
    description: "Users should be able to check whether outputs are correct, grounded, or suitable.",
    question: "Do you need the system to support strong verification, validation, or grounding of outputs?",
    lowImportanceExample: "The user does not need to check the output because it is only exploratory.",
    mediumImportanceExample: "The user should be able to inspect sources, evidence, or validation checks for important outputs.",
    highImportanceExample: "Outputs must be traceable, source-grounded, or validated before they are used.",
  },
  {
    id: "deployment_constraints",
    theme: "trust_and_risk",
    themeLabel: themeLabels.trust_and_risk,
    name: "Deployment constraints",
    description: "The system must respect technical, legal, or organizational deployment restrictions.",
    question: "Are there major legal, technical, or organizational deployment constraints that limit where the system can run?",
    lowImportanceExample: "There are no strong restrictions on where the AI runs.",
    mediumImportanceExample: "Some deployment options are preferred because of IT or security policies.",
    highImportanceExample: "Certain deployments are not allowed, for example public cloud use is prohibited.",
  },
  {
    id: "human_controllability",
    theme: "user_agency",
    themeLabel: themeLabels.user_agency,
    name: "Human controllability",
    description:
      "Users must retain authority over AI outputs and actions, including the ability to accept, reject, edit, override, or stop them.",
    question: "Do users need strong control to accept, reject, edit, override, or stop AI behavior?",
    lowImportanceExample: "The AI only provides suggestions, and user control is not a major concern.",
    mediumImportanceExample: "Users should be able to edit or reject outputs before using them.",
    highImportanceExample: "Users need clear mechanisms to approve, edit, override, stop, or reverse AI outputs or actions.",
  },
  {
    id: "adoption_usability",
    theme: "user_agency",
    themeLabel: themeLabels.user_agency,
    name: "Adoption usability",
    description: "The system should be easy enough to access, understand, and use.",
    question: "Is ease of adoption and day-to-day usability important for this use case?",
    lowImportanceExample: "The tool is used by experts who can handle a complex interface.",
    mediumImportanceExample: "The tool should be reasonably easy to learn.",
    highImportanceExample: "The tool must be simple, embedded, and usable by non-technical employees with little training.",
  },
  {
    id: "interactivity",
    theme: "user_agency",
    themeLabel: themeLabels.user_agency,
    name: "Interactivity",
    description: "The system should support iterative dialogue, refinement, and co-creation.",
    question: "Do you need iterative interaction, refinement, or co-creation between the user and the system?",
    lowImportanceExample: "One-shot outputs are enough.",
    mediumImportanceExample: "Users should be able to ask follow-up questions and refine outputs.",
    highImportanceExample: "The main value comes from iterative co-creation, feedback, and dialogue with the AI.",
  },
  {
    id: "human_in_the_loop_use",
    theme: "user_agency",
    themeLabel: themeLabels.user_agency,
    name: "Human-in-the-loop use",
    description:
      "Human review or approval is required at defined workflow points before important outputs, decisions, or actions are finalized.",
    question: "Should human review or approval be built into the workflow before important outputs or actions are finalized?",
    lowImportanceExample: "No formal human review is needed before outputs are used.",
    mediumImportanceExample: "Human review is useful for important outputs.",
    highImportanceExample: "Human approval is mandatory before the AI output leads to action, publication, or a decision.",
  },
  {
    id: "integration",
    theme: "workflow_fit",
    themeLabel: themeLabels.workflow_fit,
    name: "Integration",
    description: "The system should connect to existing tools, systems, or data sources.",
    question: "Do you need the system to integrate with existing tools, business systems, or data sources?",
    lowImportanceExample: "Copy-pasting between the AI and other tools is acceptable.",
    mediumImportanceExample: "The AI should connect to some existing systems or data sources.",
    highImportanceExample: "The AI must be embedded into core tools such as CRM, ERP, ticketing, coding, or document systems.",
  },
  {
    id: "latency",
    theme: "workflow_fit",
    themeLabel: themeLabels.workflow_fit,
    name: "Latency",
    description: "The system should respond fast enough for the task.",
    question: "Is fast response time important for the way this system will be used?",
    lowImportanceExample: "Slow responses are acceptable because the task is not time-sensitive.",
    mediumImportanceExample: "The system should respond reasonably fast for normal work.",
    highImportanceExample:
      "The system needs near-real-time responses because it supports live work, customer-facing processes, or time-sensitive operations.",
  },
  {
    id: "output_format",
    theme: "workflow_fit",
    themeLabel: themeLabels.workflow_fit,
    name: "Output format",
    description: "The system should produce outputs in reusable formats or schemas.",
    question: "Do you need outputs in reusable formats, schemas, or structures rather than plain free-form text?",
    lowImportanceExample: "Free-text output is enough.",
    mediumImportanceExample: "The output should follow templates or semi-structured formats.",
    highImportanceExample: "The output must follow strict schemas such as JSON, tables, forms, or system-readable formats.",
  },
  {
    id: "fit_existing_work_practices",
    theme: "workflow_fit",
    themeLabel: themeLabels.workflow_fit,
    name: "Fit with existing work practices",
    description:
      "The system should align with how people already perform their work and should not force unnecessary process changes.",
    question: "Does the system need to fit closely with current routines, approvals, or established work practices?",
    lowImportanceExample: "The organization is willing to change the workflow around the AI tool.",
    mediumImportanceExample: "The AI should fit most existing routines, but some process changes are acceptable.",
    highImportanceExample: "The AI must fit existing routines, approvals, and work practices closely to be adopted.",
  },
];

export const requirementInterpretationGuidance = [
  "Requirement scores indicate importance, not automatic decisions.",
  "Optional user context should be used to interpret why a requirement matters.",
  "Negative scores mean the requirement is not important for this use case; they do not mean the opposite requirement is important.",
  "A score of 0 means neutral, unknown, or no clear signal.",
  "Score 2 is a strong driver and can justify a strong recommendation.",
  "Score 1 is a mild supporting signal and should support orange or contribute to green only when combined with stronger signals.",
  "Score 0 should not be used as a driver unless the user context clearly supports it.",
  "Score -1 or -2 is low relevance and must not be used as a positive justification.",
  "Only describe a requirement as a strong driver if its score is 2.",
  "Do not describe requirements with score 0 or negative as important, central, dominant, or prioritized.",
  "Do not infer strict constraints unless the score and context clearly support them.",
] as const;

export type RequirementGuidance = {
  theme: Theme;
  themeLabel: string;
  requirement: string;
  definition: string;
  lowImportanceExample?: string | null;
  mediumImportanceExample?: string | null;
  highImportanceExample?: string | null;
};

export const requirementGuidance: RequirementGuidance[] = [
  {
    theme: "technical_flexibility",
    themeLabel: "Technical flexibility",
    requirement: "Modularity",
    definition:
      "The system is built from separable components, so models, tools, retrieval sources, or interfaces can be changed without redesigning the whole system.",
    lowImportanceExample: "The AI is used as a standalone chatbot and does not need to connect to other components.",
    mediumImportanceExample: "The organization may later add retrieval, tools, or another interface.",
    highImportanceExample:
      "The organization must be able to replace models, tools, and providers without rebuilding the system.",
  },
  {
    theme: "technical_flexibility",
    themeLabel: "Technical flexibility",
    requirement: "Memory / context continuity",
    definition:
      "The system can preserve relevant user, task, project, or conversation context across interactions when continuity is needed.",
    lowImportanceExample: "Each task is independent, so the AI does not need to remember past interactions.",
    mediumImportanceExample: "The AI should remember context within one project or session.",
    highImportanceExample:
      "The system should preserve user, project, or task context across sessions to reduce repeated explanations.",
  },
  {
    theme: "technical_flexibility",
    themeLabel: "Technical flexibility",
    requirement: "Replaceability",
    definition:
      "The organization can switch models, vendors, or infrastructure when costs, performance, policies, or available technologies change.",
    lowImportanceExample: "The organization is comfortable depending on one vendor or model.",
    mediumImportanceExample: "Switching providers may be useful in the future but is not urgent.",
    highImportanceExample:
      "Vendor lock-in must be avoided because costs, policies, or model availability may change quickly.",
  },
  {
    theme: "technical_flexibility",
    themeLabel: "Technical flexibility",
    requirement: "System architecture flexibility",
    definition:
      "The system can support different architectural components, such as RAG, tool use, validation layers, or human review, depending on the use case.",
    lowImportanceExample: "A simple prompt-based tool is sufficient.",
    mediumImportanceExample: "The system may later need retrieval or validation.",
    highImportanceExample:
      "The system should be able to support several components such as RAG, tool use, validation, memory, and human review if the use case evolves.",
  },
  {
    theme: "trust_and_risk",
    themeLabel: "Trust and risk",
    requirement: "Governance",
    definition:
      "The system must comply with organizational rules, approved-tool policies, access controls, auditability needs, and regulatory or compliance requirements.",
    lowImportanceExample: "The use case is informal and does not involve company rules or regulated data.",
    mediumImportanceExample: "The tool should follow internal policies but does not require strict approval workflows.",
    highImportanceExample: "Only approved tools may be used, and access, logging, compliance, and policy controls are mandatory.",
  },
  {
    theme: "trust_and_risk",
    themeLabel: "Trust and risk",
    requirement: "Privacy and data sovereignty",
    definition:
      "Sensitive or proprietary data must be protected, including control over where data is processed, stored, retained, or shared.",
    lowImportanceExample: "The task uses public or non-sensitive information.",
    mediumImportanceExample: "Some internal data may be used, but it is not highly confidential.",
    highImportanceExample: "Sensitive, proprietary, regulated, or customer data must stay under organizational or local control.",
  },
  {
    theme: "trust_and_risk",
    themeLabel: "Trust and risk",
    requirement: "Reliability",
    definition:
      "The system should produce outputs that are sufficiently accurate, consistent, and dependable for the intended task.",
    lowImportanceExample: "Occasional mistakes are acceptable because the output is only used for brainstorming.",
    mediumImportanceExample: "The output should usually be correct, but users can tolerate some manual correction.",
    highImportanceExample: "Incorrect outputs could cause legal, financial, operational, or reputational harm.",
  },
  {
    theme: "trust_and_risk",
    themeLabel: "Trust and risk",
    requirement: "Output verification",
    definition:
      "Users must be able to check whether an AI output is correct, grounded, or suitable before using it.",
    lowImportanceExample: "The user does not need to check the output because it is only exploratory.",
    mediumImportanceExample:
      "The user should be able to inspect sources, evidence, or validation checks for important outputs.",
    highImportanceExample: "Outputs must be traceable, source-grounded, or validated before they are used.",
  },
  {
    theme: "trust_and_risk",
    themeLabel: "Trust and risk",
    requirement: "Deployment constraints",
    definition:
      "The system must respect restrictions on where and how the AI may be deployed because of technical, legal, security, or organizational conditions.",
    lowImportanceExample: "There are no strong restrictions on where the AI runs.",
    mediumImportanceExample: "Some deployment options are preferred because of IT or security policies.",
    highImportanceExample: "Certain deployments are not allowed, for example public cloud use is prohibited.",
  },
  {
    theme: "user_agency",
    themeLabel: "User agency",
    requirement: "Human controllability",
    definition:
      "Users must retain authority over AI outputs and actions, including the ability to accept, reject, edit, override, or stop them.",
    lowImportanceExample: "The AI only provides suggestions, and user control is not a major concern.",
    mediumImportanceExample: "Users should be able to edit or reject outputs before using them.",
    highImportanceExample: "Users need clear mechanisms to approve, edit, override, stop, or reverse AI outputs or actions.",
  },
  {
    theme: "user_agency",
    themeLabel: "User agency",
    requirement: "Adoption usability",
    definition:
      "The system must be easy enough to access, understand, and use so that users can realistically adopt it in daily work.",
    lowImportanceExample: "The tool is used by experts who can handle a complex interface.",
    mediumImportanceExample: "The tool should be reasonably easy to learn.",
    highImportanceExample: "The tool must be simple, embedded, and usable by non-technical employees with little training.",
  },
  {
    theme: "user_agency",
    themeLabel: "User agency",
    requirement: "Interactivity",
    definition:
      "The system should support iterative interaction, allowing users to refine, question, correct, or co-create outputs with the AI.",
    lowImportanceExample: "One-shot outputs are enough.",
    mediumImportanceExample: "Users should be able to ask follow-up questions and refine outputs.",
    highImportanceExample:
      "The main value comes from iterative co-creation, feedback, and dialogue with the AI.",
  },
  {
    theme: "user_agency",
    themeLabel: "User agency",
    requirement: "Human-in-the-loop use",
    definition:
      "Human review or approval is required at defined workflow points before important outputs, decisions, or actions are finalized.",
    lowImportanceExample: "No formal human review is needed before outputs are used.",
    mediumImportanceExample: "Human review is useful for important outputs.",
    highImportanceExample: "Human approval is mandatory before the AI output leads to action, publication, or a decision.",
  },
  {
    theme: "workflow_fit",
    themeLabel: "Workflow fit",
    requirement: "Integration",
    definition:
      "The system should connect with existing tools, data sources, and work systems instead of operating separately from the workflow.",
    lowImportanceExample: "Copy-pasting between the AI and other tools is acceptable.",
    mediumImportanceExample: "The AI should connect to some existing systems or data sources.",
    highImportanceExample: "The AI must be embedded into core tools such as CRM, ERP, ticketing, coding, or document systems.",
  },
  {
    theme: "workflow_fit",
    themeLabel: "Workflow fit",
    requirement: "Latency",
    definition:
      "The system should respond fast enough for the time sensitivity of the task.",
    lowImportanceExample: "Slow responses are acceptable because the task is not time-sensitive.",
    mediumImportanceExample: "The system should respond reasonably fast for normal work.",
    highImportanceExample:
      "The system needs near-real-time responses because it supports live work, customer-facing processes, or time-sensitive operations.",
  },
  {
    theme: "workflow_fit",
    themeLabel: "Workflow fit",
    requirement: "Output format",
    definition:
      "The system should produce outputs in a structure or format that can be reused in downstream processes.",
    lowImportanceExample: "Free-text output is enough.",
    mediumImportanceExample: "The output should follow templates or semi-structured formats.",
    highImportanceExample: "The output must follow strict schemas such as JSON, tables, forms, or system-readable formats.",
  },
  {
    theme: "workflow_fit",
    themeLabel: "Workflow fit",
    requirement: "Fit with existing work practices",
    definition:
      "The system should align with how people already perform their work and avoid unnecessary process changes.",
    lowImportanceExample: "The organization is willing to change the workflow around the AI tool.",
    mediumImportanceExample: "The AI should fit most existing routines, but some process changes are acceptable.",
    highImportanceExample: "The AI must fit existing routines, approvals, and work practices closely to be adopted.",
  },
];
