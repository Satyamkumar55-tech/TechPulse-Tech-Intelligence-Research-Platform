// Mock Database for TechPulse AI - AI News Research Agent

export const initialArticles = [
  {
    id: "art-1",
    title: "OpenAI Announces GPT-5 Developer Beta with Multimodal Reasoning",
    source: "TechCrunch",
    pubDate: "2026-06-11T09:30:00Z",
    category: "AI",
    importanceScore: 9.6,
    summary: "OpenAI has officially launched a private developer beta of its next-generation frontier model, GPT-5. The model boasts advanced multimodal reasoning, active problem-solving capabilities, and a 50% reduction in API pricing. Early benchmarks show superior performance in complex code generation, logical reasoning, and agentic workflows.",
    content: "OpenAI has officially opened access to its highly anticipated frontier model, GPT-5, through a private developer beta. According to internal reports, the new model introduces advanced agentic reasoning, which enables it to formulate multi-step plans and correct its own mistakes in real-time. OpenAI claims that GPT-5 reduces latency by 30% and API execution cost by 50% compared to GPT-4o. Developers can now sign up for the waitlist, with general availability expected by late Q3. Benchmark scores indicate major leaps in math, coding, and multi-turn conversational memory.",
    url: "https://techcrunch.com/openai-gpt5-beta",
    whyItMatters: "GPT-5 marks a shift from passive text generation to active, agentic problem-solving. This will accelerate the deployment of autonomous AI agents in enterprise workflows, software development, and customer support, while forcing competitors to lower pricing.",
    readTime: "4 min read",
    author: "Sarah Perez"
  },
  {
    id: "art-2",
    title: "Critical Zero-Day Vulnerability Found in Linux Kernel Network Stack",
    source: "Hacker News",
    pubDate: "2026-06-10T14:15:00Z",
    category: "Cybersecurity",
    importanceScore: 9.2,
    summary: "A critical remote code execution (RCE) zero-day vulnerability (CVE-2026-44021) has been discovered in the Linux kernel network stack. The bug allows unauthenticated attackers to execute arbitrary code with root privileges over the network. Security patches have been rushed out for major distributions.",
    content: "Security researchers have disclosed a highly critical vulnerability in the Linux kernel network stack, specifically affecting version 5.15 and newer. Dubbed 'NetCollide', the vulnerability (CVE-2026-44021) is a buffer overflow that can be triggered by sending malformed IPv6 packets. Because the crash occurs inside kernel space, an attacker can bypass all standard sandbox layers and execute arbitrary code. Red Hat, Ubuntu, and Debian have released emergency security patches. Admins are urged to apply updates immediately or disable IPv6 processing as a temporary mitigation.",
    url: "https://hackernews.com/linux-kernel-zero-day",
    whyItMatters: "Since Linux powers over 90% of cloud infrastructure and enterprise servers, this vulnerability represents an existential threat to cloud service providers and containerized environments. Instant patching is mandatory to prevent widespread exploitation.",
    readTime: "5 min read",
    author: "Alex Ionescu"
  },
  {
    id: "art-3",
    title: "Stripe Acquires Blockchain Startup PayFlow for $320M in Enterprise Expansion",
    source: "Wired",
    pubDate: "2026-06-11T08:00:00Z",
    category: "Startups",
    importanceScore: 8.4,
    summary: "Stripe has completed the acquisition of PayFlow, a startup specializing in stablecoin-based cross-border payments for businesses. The $320 million deal highlights Stripe's aggressive expansion into crypto-native billing and instant global payouts.",
    content: "Payments giant Stripe has announced the acquisition of PayFlow, an early-stage startup that enables businesses to run stablecoin billing pipelines with automatic fiat conversions. PayFlow, which had raised $25M in venture capital, was acquired for $320M in cash and stock. This represents Stripe's largest acquisition in the Web3 space. Stripe plan to integrate PayFlow's APIs directly into its core dashboard, allowing global merchants to receive stablecoins (USDC/USDT) and automatically settle in local bank accounts within seconds, bypassing high SWIFT fees.",
    url: "https://wired.com/stripe-acquires-payflow",
    whyItMatters: "This acquisition signals that mainstream fintech is fully adopting stablecoins as a settlement layer for international B2B payments, greatly reducing transaction settlement delays and fees.",
    readTime: "3 min read",
    author: "Maria Johnston"
  },
  {
    id: "art-4",
    title: "AWS Launches Aurora Serverless v3 with Instant Auto-Scaling",
    source: "AWS Blog",
    pubDate: "2026-06-09T16:45:00Z",
    category: "Cloud Computing",
    importanceScore: 7.9,
    summary: "Amazon Web Services has announced the general availability of Aurora Serverless v3. The database now scales up or down in fractions of a second without active connections dropping, reducing costs for unpredictable database workloads by up to 40%.",
    content: "AWS has introduced Aurora Serverless v3, the next generation of its serverless relational database. The key innovation is a sub-second scale engine that can double database capacity (ACUs) in less than 200 milliseconds to handle sudden traffic spikes without dropped TCP connections or query timeouts. AWS has also introduced a zero-scaling state where the database goes into a warm hibernation to save cost when idle, resuming within 1 second of an incoming connection.",
    url: "https://aws.amazon.com/blog/aurora-serverless-v3",
    whyItMatters: "Serverless databases have historically struggled with latency during scale-up actions, known as the 'cold start' DB problem. AWS v3 resolves this, making serverless databases viable for high-throughput, latency-sensitive production systems.",
    readTime: "6 min read",
    author: "Jeff Barr"
  },
  {
    id: "art-5",
    title: "TypeScript 6.0 Released with Native Type-Checking in WebAssembly",
    source: "InfoQ",
    pubDate: "2026-06-08T11:20:00Z",
    category: "Software Development",
    importanceScore: 8.1,
    summary: "Microsoft has released TypeScript 6.0, featuring a compiled compiler written in Rust that runs inside WebAssembly. This changes compile speeds, making type-checking in IDEs up to 10 times faster for large-scale enterprise codebases.",
    content: "TypeScript 6.0 has officially launched, and it represents a complete architectural overhaul. The TypeScript compiler (tsc) has been rewritten from JavaScript to Rust, and compiled to WebAssembly (Wasm) for cross-platform execution. The result is a 10x improvement in compile speeds and type-checking latency. Additionally, TS 6.0 introduces native runtime type assertion hints and deep pattern matching syntax, aligning JavaScript development closer to functional programming standards.",
    url: "https://infoq.com/typescript-6-released",
    whyItMatters: "Slow compile times have been a major developer productivity bottleneck in large React and Node repositories. A 10x compiler speedup will save developers hours of wait time every week and improve IDE responsiveness.",
    readTime: "5 min read",
    author: "Devon Sinclair"
  },
  {
    id: "art-6",
    title: "Anthropic Releases Claude 4.5: Outperforms Competitors in Agentic Autonomy",
    source: "TechCrunch",
    pubDate: "2026-06-10T10:00:00Z",
    category: "AI",
    importanceScore: 9.4,
    summary: "Anthropic has launched Claude 4.5, boasting an enhanced context window of 500k tokens and advanced agentic features. In testing, Claude 4.5 achieved a 92% success rate in autonomous web research and software debugging, surpassing competitor averages.",
    content: "Anthropic has debuted Claude 4.5, its new flagship AI model. Claude 4.5 is optimized for long-context comprehension and autonomous task execution. It has an expanded context window of 500,000 tokens (roughly 375,000 words) and features a new 'Computer Use' API that is twice as fast and reliable as prior versions. In testing, the model successfully completed complex developer tasks like migrating legacy code bases and performing competitive market research with minimal human oversight.",
    url: "https://techcrunch.com/anthropic-claude-4-5",
    whyItMatters: "Claude 4.5 pushes the boundary of long-form reading and developer workflows. A 500k context window allows developers to feed entire repositories or large documents directly to the model for context-rich generation.",
    readTime: "4 min read",
    author: "Sarah Perez"
  },
  {
    id: "art-7",
    title: "Ransomware Attack Disrupts Major US Healthcare Network",
    source: "Wired",
    pubDate: "2026-06-09T18:30:00Z",
    category: "Cybersecurity",
    importanceScore: 8.8,
    summary: "A sophisticated ransomware attack by the LockBit syndicate has locked out medical systems at CareAlliance, one of the largest healthcare networks on the East Coast. Patient records are offline, forcing hospitals to divert critical patients.",
    content: "CareAlliance, a healthcare provider running 14 major hospitals, was hit by a coordinated ransomware attack early Tuesday. The LockBit group claimed responsibility and demanded $45M in crypto. Digital networks and electronic health record (EHR) databases were encrypted. Hospital staffs have reverted to paper charting, and ambulances are being diverted to neighboring networks. The Cybersecurity and Infrastructure Security Agency (CISA) is assisting in system recovery, but full restoration may take weeks.",
    url: "https://wired.com/carealliance-ransomware",
    whyItMatters: "Healthcare remains a primary, vulnerable target for ransomware syndicates due to legacy infrastructure and critical dependence on live data. This attack will likely renew political pressure to mandate cybersecurity standards for medical institutions.",
    readTime: "5 min read",
    author: "Maria Johnston"
  },
  {
    id: "art-8",
    title: "Vercel Announces v0 Enterprise Edition with On-Premise AI Models",
    source: "InfoQ",
    pubDate: "2026-06-10T13:40:00Z",
    category: "Software Development",
    importanceScore: 8.3,
    summary: "Vercel has announced an enterprise-tier of its v0 generative UI design platform. The new offering lets enterprise teams connect v0 to their internal Design Systems and run the AI models locally behind corporate virtual private clouds (VPC).",
    content: "Vercel is expanding its AI footprint with v0 Enterprise. The generative design platform can now ingest custom design systems, React component libraries, and Figma tokens to generate code tailored to a company's exact brand standards. Critically, to address IP leakage concerns, Vercel allows companies to run v0 on private, isolated AI instances inside AWS VPCs, ensuring that generated code and inputs never train public foundation models.",
    url: "https://infoq.com/vercel-v0-enterprise",
    whyItMatters: "IP security has prevented large companies from adopting generative UI tools. By offering on-premise, design-system-aligned generations, Vercel opens the door for massive enterprise adoption of AI-generated frontends.",
    readTime: "3 min read",
    author: "Devon Sinclair"
  },
  {
    id: "art-9",
    title: "Y Combinator Launches $500M AI-First Fund for Early Stage Startups",
    source: "TechCrunch",
    pubDate: "2026-06-08T09:00:00Z",
    category: "Startups",
    importanceScore: 7.7,
    summary: "Y Combinator has unveiled a dedicated $500 million fund to invest in startups building core AI infrastructure, developer tooling, and applied machine learning models, reflecting the continued investor appetite in the generative AI space.",
    content: "Y Combinator is doubling down on AI with a new $500M fund, which will invest in pre-seed and seed-stage AI companies. The accelerator notes that over 70% of its recent batches consist of companies utilizing LLMs or training bespoke ML models. YC intends to leverage this fund to provide larger follow-on investments and allocate credits for specialized GPU compute clusters for its batch participants, attempting to counter rising GPU hardware costs.",
    url: "https://techcrunch.com/yc-500m-ai-fund",
    whyItMatters: "Despite talks of an AI hype bubble, major venture capitals and accelerators are raising larger pools of capital to fund AI founders, proving that structural capital flows into the AI sector remain robust.",
    readTime: "3 min read",
    author: "Sarah Perez"
  },
  {
    id: "art-10",
    title: "Kubernetes 1.32 Released: In-Place Pod Resizing and native GPU Scheduling",
    source: "Hacker News",
    pubDate: "2026-06-07T15:20:00Z",
    category: "Cloud Computing",
    importanceScore: 7.5,
    summary: "The CNCF has released Kubernetes 1.32. Key additions include stable support for resizing pods dynamically without restart (In-Place Pod Resizing) and first-class scheduling and monitoring for multi-tenant Nvidia GPU workloads.",
    content: "Kubernetes version 1.32 is now available, delivering critical updates for modern AI cloud clusters. The standout feature is the promotion of In-Place Pod Resizing to stable, allowing operators to change CPU/memory limits of running pods on-the-fly without restarting containers. Additionally, a new Dynamic Resource Allocation (DRA) API makes scheduling and sharing GPUs across workloads much more granular, maximizing utilization in expensive AI computing nodes.",
    url: "https://hackernews.com/k8s-1-32-released",
    whyItMatters: "Dynamic pod resizing reduces application downtime during traffic spikes. Native GPU partitioning and scheduling will help organizations reduce their machine learning training costs by sharing expensive hardware infrastructure.",
    readTime: "5 min read",
    author: "Alex Ionescu"
  },
  {
    id: "art-11",
    title: "Mistral AI Releases Codestral 2: A Compact 12B Code LLM That Rivals Llama 3 70B",
    source: "TechCrunch",
    pubDate: "2026-06-11T11:15:00Z",
    category: "AI",
    importanceScore: 8.7,
    summary: "French startup Mistral AI has released Codestral 2, a open-weights 12-billion parameter model specialized for coding. In benchmark evaluations, it matches the coding capabilities of models four times its size, supporting over 80 programming languages.",
    content: "Mistral AI continues its open-source momentum with Codestral 2. The 12B model features an 80k context window and is specifically fine-tuned for code completion, translation, and repo-level explanation. It runs efficiently on a single consumer GPU while achieving 81.2% on HumanEval, placing it neck-and-neck with Llama-3 70B and Claude 3.5 Sonnet on programming tasks. The model is released under a developer-friendly research and commercial license.",
    url: "https://techcrunch.com/mistral-codestral-2",
    whyItMatters: "Developers can run Codestral 2 locally on a standard MacBook Pro or low-cost cloud instance. This reduces dependence on proprietary APIs, protects intellectual property, and lowers developer tooling costs.",
    readTime: "3 min read",
    author: "Sarah Perez"
  },
  {
    id: "art-12",
    title: "Okta Suffers Sophisticated Phishing Attack: Admin Credentials Compromised",
    source: "Cybersecurity",
    pubDate: "2026-06-10T17:00:00Z",
    category: "Cybersecurity",
    importanceScore: 9.0,
    summary: "Identity management firm Okta has disclosed a security incident where customer support admin credentials were stolen via a target phishing campaign. Attackers briefly accessed internal files, but Okta claims no production databases were affected.",
    content: "Okta has revealed that unauthorized actors gained access to its customer support management system. The attack utilized an advanced browser-in-the-browser (BitB) phishing technique directed at an employee's personal device, bypassing hardware security keys via session hijacking. The hackers downloaded HAR (HTTP Archive) files containing active session tokens, which could be used to impersonate customer admins. Okta has invalidated all affected tokens and notified impacted enterprise customers.",
    url: "https://okta.com/security-disclosure-june-2026",
    whyItMatters: "As a major identity provider, Okta is a high-value target. A breach in Okta's support pipeline can compromise session security for hundreds of fortune 500 corporations, underscoring the dangers of support desk social engineering.",
    readTime: "4 min read",
    author: "Jeff Geronimo"
  }
];

export const initialReports = [
  {
    id: "rep-daily-1",
    title: "Daily Tech Research Report",
    date: "2026-06-11",
    summary: "Today's report highlights OpenAI's launch of GPT-5, bringing advanced agentic reasoning to developers, alongside Stripe's expansion into blockchain payouts via the $320M acquisition of PayFlow. In cybersecurity, we track a major Linux kernel zero-day vulnerability (NetCollide) that demands immediate patching, and ongoing fallout from the CareAlliance ransomware crisis.",
    articles: ["art-1", "art-2", "art-3", "art-11"],
    insights: [
      "Generative AI is shifting from conversational text toward agentic, autonomous execution models (GPT-5, Claude 4.5).",
      "Traditional financial networks are experiencing pressure as major processors (Stripe) adopt stablecoins for global settlements.",
      "Linux server architectures are vulnerable to a new remote code execution flaw in the network stack, requiring emergency server updates."
    ],
    takeaways: [
      "**GPT-5 Developer Beta**: Reduces API pricing by 50% and provides active multi-step planning, enabling cheaper and smarter agents.",
      "**Linux zero-day (NetCollide)**: Affects IPv6 handling in Linux kernel 5.15+. Patches are available from RedHat, Debian, and Ubuntu.",
      "**Fintech Consolidation**: Stripe's acquisition of PayFlow validates stablecoins as a key enterprise rail for cross-border transactions.",
      "**Mistral AI Release**: Codestral 2 brings 70B-grade coding intelligence down to a lightweight 12B model that can run on consumer workstations."
    ],
    whyItMatters: "As AI capabilities mature into autonomous execution and stablecoins integrate into mainstream finance, the speed of software deployment and global commerce is accelerating. However, these advancements are accompanied by highly critical infrastructure vulnerabilities (Linux NetCollide) that showcase how security defaults (like IPv6 handling) can expose entire server clusters to immediate compromise."
  },
  {
    id: "rep-weekly-1",
    title: "Weekly Tech Research Digest",
    date: "2026-06-08",
    summary: "This week's research focuses on the developer ecosystem, featuring TypeScript 6.0's rewrite in Rust, AWS's latency-busting Aurora Serverless v3, and Kubernetes 1.32's native support for dynamic container resizing and optimized GPU scheduling.",
    articles: ["art-4", "art-5", "art-10", "art-9"],
    insights: [
      "Developer tooling is undergoing a Rust-powered migration (TypeScript compiler, SWC, Turbopack) to achieve double-digit performance gains.",
      "Cloud databases are evolving to address serverless cold starts, with AWS Aurora v3 enabling sub-second auto-scaling.",
      "Venture Capital is structuring massive GPU-backed funds to aid early-stage founders with hardware acquisition."
    ],
    takeaways: [
      "**Rust compiler rewrite**: TypeScript 6.0 features a WASM-compiled Rust engine, accelerating IDE code checking and builds by 10x.",
      "**Sub-second scaling**: AWS Aurora Serverless v3 scales up in 200ms without connection drops, and suspends databases when idle.",
      "**Kubernetes 1.32**: Pods can now be resized without container restarts, and GPUs can be shared dynamically across tenant workloads.",
      "**YC Fund**: A new $500M fund ensures AI startups receive compute credits and follow-on investments amidst hardware shortages."
    ],
    whyItMatters: "Developer productivity and hardware cost reduction are the primary focus of cloud infrastructure providers. By reducing compile times (TypeScript) and database scaling lag (AWS), companies can operate software faster and more cost-efficiently. Simultaneously, Kubernetes updates ensure hardware resources like GPUs are fully utilized, minimizing waste."
  }
];

export const trendingTopics = [
  { name: "AI", score: 98, trend: "up", change: "+12%" },
  { name: "Cybersecurity", score: 85, trend: "up", change: "+8%" },
  { name: "Startups", score: 72, trend: "down", change: "-3%" },
  { name: "Cloud Computing", score: 68, trend: "steady", change: "0%" },
  { name: "Software Development", score: 62, trend: "up", change: "+5%" }
];

export const initialNotifications = [
  {
    id: "not-1",
    type: "report",
    text: "Daily Tech Research Report (June 11) is now available.",
    time: "30 mins ago",
    read: false
  },
  {
    id: "not-2",
    type: "alert",
    text: "BREAKING: Critical Linux NetCollide vulnerability published (9.2 score).",
    time: "2 hours ago",
    read: false
  },
  {
    id: "not-3",
    type: "system",
    text: "Weekly Tech Research Digest is ready.",
    time: "3 days ago",
    read: true
  }
];

// Helper database functions

export const getArticleCount = (articles) => articles.length;

export const getAvgImportanceScore = (articles) => {
  if (articles.length === 0) return 0;
  const total = articles.reduce((sum, art) => sum + art.importanceScore, 0);
  return (total / articles.length).toFixed(1);
};

export const getArticlesByCategory = (articles) => {
  const counts = {};
  articles.forEach(art => {
    counts[art.category] = (counts[art.category] || 0) + 1;
  });
  return counts;
};

// Simulated AI Agent responses for the Chat Assistant
export const getAIResponse = (query, articles) => {
  const lowercaseQuery = query.toLowerCase();
  
  if (lowercaseQuery.includes("summarize") || lowercaseQuery.includes("gpt-5") || lowercaseQuery.includes("openai")) {
    const art = articles.find(a => a.id === "art-1") || articles[0];
    return `Here is an AI executive summary for **${art.title}**:\n\n* **What happened**: OpenAI released a private developer beta of GPT-5.\n* **Key Features**: Supports advanced multimodal reasoning, active problem-solving (multi-step planning), and decreases API pricing by 50%.\n* **Why it matters**: This model enables the building of autonomous agentic pipelines that can self-correct, dramatically lowering the cost of deploying enterprise-grade agents.`;
  }
  
  if (lowercaseQuery.includes("cybersecurity") || lowercaseQuery.includes("vulnerability") || lowercaseQuery.includes("linux") || lowercaseQuery.includes("netcollide")) {
    const art = articles.find(a => a.id === "art-2");
    return `Security Alert regarding **NetCollide (CVE-2026-44021)**:\n\n* **Severity**: Critical (9.2 Importance Score).\n* **Vulnerability Type**: Remote Code Execution (RCE) via a buffer overflow in the Linux kernel network stack (IPv6 packets).\n* **Impact**: Unauthenticated attackers can execute arbitrary code with full root access.\n* **Recommendation**: Major Linux vendors (RedHat, Debian, Ubuntu) have released patches. Apply updates immediately, or disable IPv6 processing as a temporary bypass.`;
  }

  if (lowercaseQuery.includes("recommend") || lowercaseQuery.includes("suggest") || lowercaseQuery.includes("reading")) {
    const highScores = [...articles].sort((a, b) => b.importanceScore - a.importanceScore).slice(0, 3);
    return `Based on your profile, here are the top 3 recommended articles today:\n\n1. **${highScores[0].title}** (Score: ${highScores[0].importanceScore}/10) - *${highScores[0].source}*\n2. **${highScores[1].title}** (Score: ${highScores[1].importanceScore}/10) - *${highScores[1].source}*\n3. **${highScores[2].title}** (Score: ${highScores[2].importanceScore}/10) - *${highScores[2].source}*\n\nWould you like me to summarize any of these for you?`;
  }

  if (lowercaseQuery.includes("trend") || lowercaseQuery.includes("insights") || lowercaseQuery.includes("what's hot")) {
    return `Currently, **AI** and **Cybersecurity** are showing the highest momentum today:\n\n* **AI (+12%)**: Driven by OpenAI's GPT-5 developer beta and Anthropic's Claude 4.5 releases.\n* **Cybersecurity (+8%)**: Driven by the Okta phishing disclosure and the critical Linux kernel network stack zero-day.\n* **Startups (-3%)**: Stable, but Stripe's acquisition of PayFlow for $320M signals steady fintech consolidation.`;
  }

  // Default fallback response
  return `I am the TechPulse AI Research Assistant. I can help you with:\n\n* Summarizing specific articles (e.g. "Summarize GPT-5")\n* Explaining recent security vulnerabilities (e.g. "Tell me about the Linux zero-day")\n* Recommending articles based on score (e.g. "Recommend articles")\n* Outlining current industry trends (e.g. "Show me trends")\n\nHow can I help you research today?`;
};
