export type RecommendationOption = {
  layer: "model" | "architecture" | "hosting";
  dimension: string;
  option: string;
};

export type RecommendationGuidance = RecommendationOption & {
  lowRelevanceExample: string;
  mediumRelevanceExample: string;
  highRelevanceExample: string;
};

export const recommendationSelectivityGuidance = [
  "Do not mark all options in the same dimension as suitable.",
  "Within model scalability, prefer one primary suitable scale and use conditionally_suitable for adjacent alternatives.",
  "Use conditionally_suitable when an option could work but is not clearly required.",
  "Use unaffected when the questionnaire does not provide a meaningful signal for an option.",
  "If evidence is weak or mixed, prefer conditionally_suitable or unaffected over suitable or unsuitable.",
  "Do not infer offline use, strict local processing, or real-time latency unless the user selected or described it.",
  "Do not infer multimodal needs unless the user selected or described images, audio, video, screenshots, or documents as inputs.",
  "Do not treat governance as a property of model size; governance is mainly affected by hosting, access control, validation, auditability, and workflow design.",
  "Do not mark planning and task decomposition as suitable solely because interactivity is high.",
  "Do not mark a domain-specific model as suitable unless domain specialization is explicitly required by the score profile or user context.",
  "If the use case is broad, exploratory, or highly interactive, task-specific models should usually be conditionally_suitable rather than suitable.",
  "If integration is negative, discourage tool and system access unless user context explicitly requires it.",
  "Negative integration discourages tool access, but does not automatically rule out private or self-contained retrieval.",
  "Knowledge retrieval or RAG should usually be conditionally_suitable when internal knowledge, grounding, or source-based reliability are not clearly required.",
  "Do not mark public cloud/API as unsuitable solely because privacy is mildly positive.",
  "Do not mark private cloud, on-premise/local, or organization-controlled as suitable solely from weak privacy or governance signals.",
  "Edge or device-local should be suitable only when offline use, very low latency, device-local processing, or strict local processing is clearly needed.",
] as const;

export const modelOptions: RecommendationOption[] = [
  { layer: "model", dimension: "Scalability tier", option: "Small-scale model" },
  { layer: "model", dimension: "Scalability tier", option: "Medium-scale model" },
  { layer: "model", dimension: "Scalability tier", option: "Large-scale model" },
  { layer: "model", dimension: "Scalability tier", option: "Ultra-scale / frontier model" },
  { layer: "model", dimension: "Application / business orientation", option: "General-purpose model" },
  { layer: "model", dimension: "Application / business orientation", option: "Domain-specific model" },
  { layer: "model", dimension: "Application / business orientation", option: "Task-specific model" },
  { layer: "model", dimension: "Application / business orientation", option: "Multimodal model" },
];

export const architectureOptions: RecommendationOption[] = [
  { layer: "architecture", dimension: "Memory and context continuity", option: "Short-term memory, long-term memory, persistent chat history, user/task context" },
  { layer: "architecture", dimension: "Knowledge retrieval / RAG", option: "Document retrieval, database retrieval, GraphRAG, internal knowledge base" },
  { layer: "architecture", dimension: "Tool and system access", option: "APIs, function calling, MCP, business-system integration" },
  { layer: "architecture", dimension: "Planning and task decomposition", option: "Step-by-step planning, task decomposition, agentic workflows" },
  { layer: "architecture", dimension: "Control and validation", option: "Guardrails, schema validation, human review, audit checks" },
  { layer: "architecture", dimension: "Profile and role configuration", option: "User profiles, role-based agents, task-specific personas" },
];

export const hostingOptions: RecommendationOption[] = [
  { layer: "hosting", dimension: "Execution location", option: "Public cloud / API" },
  { layer: "hosting", dimension: "Execution location", option: "Private cloud" },
  { layer: "hosting", dimension: "Execution location", option: "On-premise / local" },
  { layer: "hosting", dimension: "Execution location", option: "Edge / device-local" },
  { layer: "hosting", dimension: "Execution location", option: "Hybrid" },
  { layer: "hosting", dimension: "Ownership / control", option: "Provider-controlled" },
  { layer: "hosting", dimension: "Ownership / control", option: "Enterprise-managed" },
  { layer: "hosting", dimension: "Ownership / control", option: "Organization-controlled" },
  { layer: "hosting", dimension: "Ownership / control", option: "Device-controlled" },
  { layer: "hosting", dimension: "Ownership / control", option: "Shared control" },
];

export const allRecommendationOptions = [
  ...modelOptions,
  ...architectureOptions,
  ...hostingOptions,
];

export const modelRecommendationGuidance: RecommendationGuidance[] = [
  {
    layer: "model",
    dimension: "Scalability",
    option: "Small-scale model",
    lowRelevanceExample:
      "The task requires complex reasoning and broad knowledge, so a small model is probably insufficient.",
    mediumRelevanceExample:
      "The task is simple, repetitive, or narrow, but some quality trade-offs are acceptable.",
    highRelevanceExample:
      "The use case explicitly prioritizes low cost, very low latency, local execution, or privacy-preserving processing over broad reasoning ability.",
  },
  {
    layer: "model",
    dimension: "Scalability",
    option: "Medium-scale model",
    lowRelevanceExample:
      "The task is either very simple or requires frontier-level reasoning.",
    mediumRelevanceExample:
      "The task involves common organizational work such as summarization, drafting, or classification.",
    highRelevanceExample:
      "The organization needs a balanced model for common work where cost, quality, and latency all matter.",
  },
  {
    layer: "model",
    dimension: "Scalability",
    option: "Large-scale model",
    lowRelevanceExample:
      "The task is narrow, repetitive, or can be solved with a smaller model.",
    mediumRelevanceExample:
      "The task requires good reasoning, flexibility, or few-shot performance.",
    highRelevanceExample:
      "The task is complex, variable, and quality-sensitive, but still does not clearly require maximum frontier-level reasoning.",
  },
  {
    layer: "model",
    dimension: "Scalability",
    option: "Ultra-scale / frontier model",
    lowRelevanceExample: "The task is simple, low-risk, or cost-sensitive.",
    mediumRelevanceExample:
      "The task sometimes requires advanced reasoning or creative support.",
    highRelevanceExample:
      "The use case explicitly depends on maximum reasoning quality, complex ideation, or high-value decision support that smaller models are unlikely to satisfy.",
  },
  {
    layer: "model",
    dimension: "Application",
    option: "General-purpose model",
    lowRelevanceExample: "The task is highly specialized or requires strict domain behavior.",
    mediumRelevanceExample:
      "The system supports several related knowledge-work tasks.",
    highRelevanceExample:
      "The AI should support broad activities such as writing, summarization, analysis, ideation, and support.",
  },
  {
    layer: "model",
    dimension: "Application",
    option: "Domain-specific model",
    lowRelevanceExample: "The task uses general language and does not require specialized knowledge.",
    mediumRelevanceExample:
      "The use case involves some domain terminology or internal company context.",
    highRelevanceExample:
      "The task depends on legal, medical, financial, technical, or company-specific expertise.",
  },
  {
    layer: "model",
    dimension: "Application",
    option: "Task-specific model",
    lowRelevanceExample: "The user needs flexible, open-ended interaction across many tasks.",
    mediumRelevanceExample:
      "A repeated task exists, but users still need some flexibility.",
    highRelevanceExample:
      "The AI should perform one narrow task very reliably, such as extraction, classification, search, or code generation.",
  },
  {
    layer: "model",
    dimension: "Application",
    option: "Multimodal model",
    lowRelevanceExample: "The task is text-only.",
    mediumRelevanceExample:
      "The system occasionally needs to process documents, images, or screenshots.",
    highRelevanceExample:
      "The use case regularly involves PDFs, images, forms, screenshots, audio, video, or mixed media.",
  },
];

export const architectureRecommendationGuidance: RecommendationGuidance[] = [
  {
    layer: "architecture",
    dimension: "Memory",
    option: "Memory/context continuity",
    lowRelevanceExample: "Each interaction is independent and no past context is needed.",
    mediumRelevanceExample: "Context should be remembered within a project or session.",
    highRelevanceExample:
      "The system must preserve user, project, or task context across sessions to avoid repeated explanations.",
  },
  {
    layer: "architecture",
    dimension: "Retrieval",
    option: "Knowledge retrieval / RAG",
    lowRelevanceExample:
      "The task can be answered from the model’s general knowledge or user-provided prompt.",
    mediumRelevanceExample:
      "The system sometimes needs access to internal documents or updated information.",
    highRelevanceExample:
      "The system must answer from company documents, databases, policies, or traceable sources.",
  },
  {
    layer: "architecture",
    dimension: "Tools",
    option: "Tool and system access",
    lowRelevanceExample:
      "The AI only generates text and does not need to interact with other systems.",
    mediumRelevanceExample:
      "The AI should occasionally retrieve data or trigger simple actions.",
    highRelevanceExample:
      "The AI must connect to tools, APIs, databases, CRM, ERP, ticketing, coding, or document systems.",
  },
  {
    layer: "architecture",
    dimension: "Planning",
    option: "Planning and task decomposition",
    lowRelevanceExample: "The task is one-step and does not need planning.",
    mediumRelevanceExample: "The AI should help organize or sequence work.",
    highRelevanceExample:
      "The system must break down and execute multi-step workflows or agentic processes.",
  },
  {
    layer: "architecture",
    dimension: "Control",
    option: "Control and validation",
    lowRelevanceExample: "Outputs are exploratory and mistakes have little consequence.",
    mediumRelevanceExample: "Important outputs should be checked before use.",
    highRelevanceExample:
      "Outputs must be constrained, validated, reviewed, or approved before downstream use.",
  },
  {
    layer: "architecture",
    dimension: "Profiles",
    option: "Profile and role configuration",
    lowRelevanceExample:
      "All users need the same behavior and generic responses are sufficient.",
    mediumRelevanceExample:
      "Some teams or tasks need different prompts, roles, or preferences.",
    highRelevanceExample:
      "The system must adapt to different roles, departments, user profiles, or task-specific personas.",
  },
];

export const hostingRecommendationGuidance: RecommendationGuidance[] = [
  {
    layer: "hosting",
    dimension: "Execution location",
    option: "Public cloud / API",
    lowRelevanceExample:
      "Sensitive data cannot leave the organization, so public API use is unsuitable.",
    mediumRelevanceExample:
      "Public API may be acceptable for low-risk tasks or anonymized data.",
    highRelevanceExample:
      "The organization needs fast access to strong models with low infrastructure effort.",
  },
  {
    layer: "hosting",
    dimension: "Execution location",
    option: "Private cloud",
    lowRelevanceExample: "The task is low-risk and does not require dedicated infrastructure.",
    mediumRelevanceExample:
      "The organization wants more control but still benefits from cloud scalability.",
    highRelevanceExample:
      "The use case involves sensitive data, governance requirements, or controlled enterprise deployment.",
  },
  {
    layer: "hosting",
    dimension: "Execution location",
    option: "On-premise / local",
    lowRelevanceExample:
      "The task needs frontier capability and local infrastructure is not available.",
    mediumRelevanceExample:
      "Local deployment is useful for selected sensitive or cost-sensitive workloads.",
    highRelevanceExample:
      "Cloud use is prohibited, or the organization explicitly requires full infrastructure and data-flow control.",
  },
  {
    layer: "hosting",
    dimension: "Execution location",
    option: "Edge / device-local",
    lowRelevanceExample:
      "The use case is not latency-sensitive and can rely on cloud access.",
    mediumRelevanceExample:
      "Some functions should work locally or offline.",
    highRelevanceExample:
      "The system must run on the user device or edge hardware because offline use, very low latency, or strict local processing is required.",
  },
  {
    layer: "hosting",
    dimension: "Execution location",
    option: "Hybrid",
    lowRelevanceExample: "One deployment environment is sufficient.",
    mediumRelevanceExample:
      "Some data or tasks benefit from local processing, while others need cloud capability.",
    highRelevanceExample:
      "The organization must combine local/private processing with cloud or frontier models depending on sensitivity and complexity.",
  },
  {
    layer: "hosting",
    dimension: "Ownership/control",
    option: "Provider-controlled",
    lowRelevanceExample:
      "Organizational governance, privacy, or control requirements are high.",
    mediumRelevanceExample:
      "Provider control is acceptable for low-risk or generic use cases.",
    highRelevanceExample:
      "The organization prioritizes speed, simplicity, and access to provider-managed capabilities over control.",
  },
  {
    layer: "hosting",
    dimension: "Ownership/control",
    option: "Enterprise-managed",
    lowRelevanceExample:
      "The organization does not need enterprise controls or managed governance.",
    mediumRelevanceExample:
      "Enterprise controls are useful but not strictly required.",
    highRelevanceExample:
      "The system should be externally hosted but governed through contracts, admin controls, compliance settings, and access management.",
  },
  {
    layer: "hosting",
    dimension: "Ownership/control",
    option: "Organization-controlled",
    lowRelevanceExample:
      "The organization lacks infrastructure or does not need strong internal control.",
    mediumRelevanceExample:
      "Internal control is useful for selected workflows or sensitive datasets.",
    highRelevanceExample:
      "The organization must control infrastructure, access, deployment, and data flow.",
  },
  {
    layer: "hosting",
    dimension: "Ownership/control",
    option: "User/device-controlled",
    lowRelevanceExample:
      "Users do not need local control and central management is preferred.",
    mediumRelevanceExample:
      "Some offline or local functions are useful.",
    highRelevanceExample:
      "Processing must happen on the user’s device or local environment for privacy, latency, or offline availability.",
  },
  {
    layer: "hosting",
    dimension: "Ownership/control",
    option: "Shared control",
    lowRelevanceExample:
      "A single provider-controlled or organization-controlled setup is sufficient.",
    mediumRelevanceExample:
      "Responsibilities are split between provider and organization.",
    highRelevanceExample:
      "The system requires a hybrid setup where control is distributed across provider, organization, and local infrastructure.",
  },
];

export type ConstraintGuidance = {
  constraint: string;
  trigger: string;
  favors: string;
  discourages: string;
  rationale: string;
};

export const constraintGuidance: ConstraintGuidance[] = [
  {
    constraint: "Sensitive data must not leave the organization",
    trigger: "Privacy and data sovereignty is critical",
    favors:
      "Private cloud, on-premise/local, organization-controlled, or hybrid with local/private data processing",
    discourages:
      "Public cloud/API and provider-controlled setups unless enterprise safeguards, contracts, and data controls are sufficient",
    rationale:
      "External processing conflicts with the requirement that sensitive data remains under organizational control.",
  },
  {
    constraint: "External cloud processing is prohibited",
    trigger: "Deployment constraints are critical",
    favors: "On-premise/local or edge/device-local",
    discourages:
      "Public cloud/API, provider-controlled, and cloud-only enterprise-managed setups",
    rationale:
      "If cloud processing is not allowed, only local or device-based execution can satisfy the constraint.",
  },
  {
    constraint: "Only approved enterprise tools may be used",
    trigger: "Governance is critical",
    favors:
      "Enterprise-managed, private cloud, or organization-controlled deployment",
    discourages:
      "Unapproved public cloud/API or unmanaged provider-controlled tools",
    rationale:
      "Organizational policy limits the recommendation space to approved and governable systems.",
  },
  {
    constraint: "Human approval is mandatory before action",
    trigger: "Human-in-the-loop use is critical",
    favors:
      "Control and validation layer with human review or approval workflow",
    discourages:
      "Fully autonomous planning or action execution without approval",
    rationale:
      "Mandatory approval means the system cannot act independently at critical decision points.",
  },
  {
    constraint: "Users must be able to override the AI",
    trigger: "Human controllability is critical",
    favors:
      "Editable outputs, stop/override mechanisms, control and validation layer",
    discourages:
      "Autonomous action execution without user override",
    rationale:
      "If users remain accountable, they must be able to intervene before or during AI-supported actions.",
  },
  {
    constraint: "Outputs must be checkable before use",
    trigger: "Output verification is critical",
    favors:
      "RAG, source grounding, validation checks, audit trail, or human review",
    discourages:
      "Ungrounded generation for high-stakes outputs",
    rationale:
      "Users need evidence or validation mechanisms to judge whether the output is reliable.",
  },
  {
    constraint: "Strict structured output is required",
    trigger: "Output format is critical",
    favors:
      "Task-specific model, structured prompting, schema validation, or output parser",
    discourages: "Free-text-only systems without schema or output control",
    rationale:
      "Downstream reuse requires outputs to follow a predictable format.",
  },
  {
    constraint: "The AI must connect to existing systems",
    trigger: "Integration is critical",
    favors:
      "Tool and system access, APIs, MCP, or business-system integration",
    discourages: "Standalone tools without integration capability",
    rationale:
      "If the AI must work inside existing workflows, isolated tools cannot satisfy the use case.",
  },
  {
    constraint: "The system must remember prior context",
    trigger: "Memory/context continuity is critical",
    favors: "Memory and context continuity architecture",
    discourages:
      "Stateless tools with no persistent or session memory",
    rationale:
      "Repeated work and coordination overhead can only be reduced if relevant context is retained.",
  },
  {
    constraint: "Persistent context is not allowed",
    trigger: "Privacy or governance prohibits stored context",
    favors:
      "Stateless or temporary-session design",
    discourages:
      "Long-term memory, persistent profiles, or uncontrolled chat history",
    rationale:
      "Storing context can create privacy, compliance, or retention risks.",
  },
  {
    constraint: "Real-time response is required",
    trigger: "Latency is critical",
    favors:
      "Small/medium model, edge/device-local, on-premise/local, caching, or model routing",
    discourages:
      "Slow frontier-only or cloud-only setup without fallback",
    rationale:
      "Time-sensitive workflows need predictable response times, not only high model quality.",
  },
  {
    constraint: "Offline use is required",
    trigger: "Deployment constraints or latency are critical",
    favors: "Edge/device-local or on-premise/local",
    discourages:
      "Cloud-only public API or cloud-only enterprise-managed setup",
    rationale:
      "Offline use cannot depend on continuous external network or provider availability.",
  },
  {
    constraint: "Provider lock-in must be avoided",
    trigger: "Replaceability is critical",
    favors:
      "Modularity, architecture flexibility, abstraction layer, hybrid/shared-control setup",
    discourages:
      "Closed provider-controlled setup without export, portability, or replacement options",
    rationale:
      "Future changes in cost, policy, or model quality require the ability to switch components.",
  },
  {
    constraint: "Architecture must be extensible",
    trigger: "System architecture flexibility is critical",
    favors:
      "Modular architecture supporting RAG, tools, memory, validation, or role configuration",
    discourages:
      "Closed SaaS tools that cannot be extended",
    rationale:
      "Future requirements may require adding architectural components around the model.",
  },
  {
    constraint: "Model/provider replacement must be possible",
    trigger: "Modularity is critical",
    favors:
      "Model abstraction layer, interchangeable APIs, open interfaces",
    discourages: "Single-vendor hard dependency",
    rationale:
      "A replaceable model layer reduces dependency on one provider or model family.",
  },
  {
    constraint: "Maximum reasoning quality is required",
    trigger: "Reliability or cognitive amplification is critical",
    favors: "Large-scale or ultra-scale/frontier model",
    discourages: "Small-scale model as primary option",
    rationale:
      "Small models may not satisfy complex reasoning, ideation, or high-quality output needs.",
  },
  {
    constraint: "Task is narrow, repetitive, and format-sensitive",
    trigger: "Output format and reliability are critical",
    favors: "Task-specific model and schema validation",
    discourages:
      "General-purpose free-form model without output controls",
    rationale:
      "Narrow tasks benefit from controlled, repeatable behavior rather than open-ended generation.",
  },
  {
    constraint: "Use case requires images, documents, audio, or video",
    trigger: "Multimodal input/output is critical",
    favors: "Multimodal model",
    discourages: "Text-only model",
    rationale:
      "Text-only models cannot process non-textual inputs required by the task.",
  },
  {
    constraint: "Use case requires company-specific knowledge",
    trigger: "Reliability, output verification, or workflow fit is critical",
    favors: "RAG, internal knowledge retrieval, or domain-specific model",
    discourages:
      "Pure general-purpose model without retrieval or domain adaptation",
    rationale:
      "Internal knowledge cannot be reliably supplied by the model’s general training alone.",
  },
];
