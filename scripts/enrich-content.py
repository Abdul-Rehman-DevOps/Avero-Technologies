#!/usr/bin/env python3
"""Enrich Avero public content using enterprise IT catalog patterns (original copy)."""
from __future__ import annotations

from pathlib import Path
import textwrap

ROOT = Path(__file__).resolve().parents[1] / "content" / "public"


def md(path: Path, front: dict, body: str) -> None:
    lines = ["---"]
    for k, v in front.items():
        if k == "seo":
            lines.append("seo:")
            lines.append(f'  title: "{v["title"]}"')
            lines.append(f'  description: "{v["description"]}"')
            continue
        if isinstance(v, list):
            lines.append(f"{k}:")
            for item in v:
                if isinstance(item, str):
                    lines.append(f'  - "{item}"')
                else:
                    lines.append(f"  - {item}")
            continue
        if isinstance(v, bool):
            lines.append(f"{k}: {'true' if v else 'false'}")
            continue
        if isinstance(v, (int, float)) or v is None:
            lines.append(f"{k}: {v}")
            continue
        lines.append(f'{k}: "{v}"')
    lines.append("---")
    lines.append("")
    lines.append(body.strip())
    lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")


SERVICES = {
    "software-engineering": {
        "title": "Software Engineering",
        "capability": "engineering",
        "summary": "Design and build APIs, web products, and distributed services ready for production traffic.",
        "purpose": "Deliver maintainable software systems with clear contracts, tests, and operational ownership.",
        "problem": "Product teams often ship features without durable architecture, so reliability and change cost degrade as scale increases.",
        "capabilities": [
            "Domain modeling and API contract design",
            "Backend and frontend product engineering",
            "Integration with identity, payments, and third-party systems",
            "Automated testing, quality gates, and release readiness",
            "Performance baselines and failure-mode analysis",
        ],
        "approach": "Clarify outcomes and constraints, design service boundaries, implement in thin vertical slices, verify with automated tests, then harden for production.",
        "technologies": ["TypeScript", "Node.js", "Python", "Go", "PostgreSQL", "Redis", "gRPC", "REST"],
        "securityConsiderations": "Threat-aware design, input validation, secrets isolation, dependency scanning, and least-privilege service identities.",
        "engagementContext": "Ideal for new products, platform rebuilds, and modernization of critical business applications.",
    },
    "application-modernization": {
        "title": "Application Modernization",
        "capability": "engineering",
        "summary": "Evolve legacy systems into modular, cloud-ready applications without big-bang risk.",
        "purpose": "Reduce technical debt while preserving business continuity during migration.",
        "problem": "Monoliths and brittle integrations slow delivery and raise outage risk when teams need faster product change.",
        "capabilities": [
            "Current-state architecture assessment",
            "Strangler-fig and incremental extraction plans",
            "API facades over legacy cores",
            "Data migration and dual-run strategies",
            "Cutover playbooks and rollback criteria",
        ],
        "approach": "Map dependencies, isolate high-value seams, extract services behind stable contracts, and migrate traffic in controlled waves.",
        "technologies": ["Java", ".NET", "Kubernetes", "Terraform", "Event streaming", "API gateways"],
        "securityConsiderations": "Preserve audit trails, revalidate authZ models, and avoid exposing legacy endpoints during transition.",
        "engagementContext": "Used when core systems must keep running while teams move to modern delivery models.",
    },
    "saas-platforms": {
        "title": "SaaS Platforms",
        "capability": "engineering",
        "summary": "Multi-tenant product foundations: tenancy, billing hooks, entitlements, and admin surfaces.",
        "purpose": "Give SaaS teams a durable platform core so product squads ship features faster.",
        "problem": "Early SaaS products hard-code tenancy and permissions, then stall when enterprise customers demand isolation and controls.",
        "capabilities": [
            "Tenant isolation models and data partitioning",
            "Entitlements and feature-flag architecture",
            "Admin consoles and customer onboarding flows",
            "Usage metering hooks for billing systems",
            "Enterprise SSO and SCIM readiness",
        ],
        "approach": "Define tenancy and identity first, then build shared platform services that product teams consume through paved paths.",
        "technologies": ["Next.js", "Node.js", "PostgreSQL", "OIDC", "Stripe APIs", "Feature flags"],
        "securityConsiderations": "Strict tenant boundaries, encryption at rest for sensitive fields, and privileged-action auditing.",
        "engagementContext": "Best for B2B SaaS companies preparing for mid-market and enterprise growth.",
    },
    "generative-ai-systems": {
        "title": "Generative AI Systems",
        "capability": "ai",
        "summary": "Production generative AI features with evaluation, safety controls, and measurable quality.",
        "purpose": "Ship AI assistants and workflows that stay reliable after launch.",
        "problem": "Teams demo generative features quickly, then struggle with regressions, prompt drift, and unsafe outputs in production.",
        "capabilities": [
            "Use-case selection and risk classification",
            "Prompt and tool orchestration design",
            "Offline and online evaluation harnesses",
            "Human review loops for high-stakes flows",
            "Cost, latency, and quality dashboards",
        ],
        "approach": "Start with constrained workflows, instrument evaluation early, and promote changes only when quality gates pass.",
        "technologies": ["Python", "LangChain or custom orchestration", "OpenAI/Anthropic APIs", "Vector databases", "Feature flags"],
        "securityConsiderations": "PII redaction, provider secret handling, output filtering, and access control on evaluation datasets.",
        "engagementContext": "For product organizations adding generative features to customer or internal workflows.",
    },
    "rag-and-knowledge-systems": {
        "title": "RAG and Knowledge Systems",
        "capability": "ai",
        "summary": "Retrieval-augmented generation grounded in your documents, policies, and operational knowledge.",
        "purpose": "Make organizational knowledge searchable and usable through controlled AI interfaces.",
        "problem": "Knowledge is scattered across wikis and tickets, so answers are inconsistent and audits are painful.",
        "capabilities": [
            "Corpus inventory and access mapping",
            "Chunking, embedding, and retrieval strategies",
            "Citation and source-traceability UX",
            "Freshness pipelines for document updates",
            "Permission-aware retrieval filters",
        ],
        "approach": "Curate high-value corpora, design retrieval quality metrics, then iterate on ranking and grounding before expanding coverage.",
        "technologies": ["Embeddings", "pgvector", "Elasticsearch", "Python", "Object storage"],
        "securityConsiderations": "Respect document ACLs in retrieval, encrypt stores, and log access to sensitive corpora.",
        "engagementContext": "Common for support, policy Q&A, engineering knowledge bases, and regulated document assistants.",
    },
    "ai-agents-and-automation": {
        "title": "AI Agents and Automation",
        "capability": "ai",
        "summary": "Tool-using agents and workflow automation with guardrails, approvals, and observability.",
        "purpose": "Automate multi-step work without losing control or auditability.",
        "problem": "Unconstrained agents create unpredictable side effects and are difficult to trust in business processes.",
        "capabilities": [
            "Task decomposition and tool contracts",
            "Approval gates for irreversible actions",
            "Sandboxing and rate limits",
            "Run tracing and replay for debugging",
            "Escalation paths to human operators",
        ],
        "approach": "Automate narrow, measurable workflows first. Expand tools only after failure modes are understood.",
        "technologies": ["Python", "Workflow engines", "Queues", "OIDC", "Observability stacks"],
        "securityConsiderations": "Least-privilege tool credentials, action allowlists, and immutable audit logs.",
        "engagementContext": "Useful for ops automation, internal copilots, and controlled customer workflow assistants.",
    },
    "cloud-architecture": {
        "title": "Cloud Architecture",
        "capability": "cloud",
        "summary": "Identity-first cloud foundations across accounts, networks, and shared platform services.",
        "purpose": "Establish secure, scalable landing zones that product teams can build on.",
        "problem": "Cloud estates grow account by account without shared guardrails, creating drift and security gaps.",
        "capabilities": [
            "Multi-account organization design",
            "Network segmentation and connectivity patterns",
            "Central logging and security baselines",
            "Shared services for DNS, images, and secrets",
            "Architecture decision records and diagrams",
        ],
        "approach": "Align control catalog first, then implement landing zones and workload accounts with policy-as-code.",
        "technologies": ["AWS", "Azure", "GCP", "Terraform", "OIDC", "Transit networking"],
        "securityConsiderations": "Break-glass procedures, encryption defaults, and continuous posture scanning.",
        "engagementContext": "Foundational for startups scaling cloud usage and enterprises consolidating cloud estates.",
    },
    "cloud-migration": {
        "title": "Cloud Migration",
        "capability": "cloud",
        "summary": "Plan and execute migrations with wave strategies, dual-run windows, and measurable cutovers.",
        "purpose": "Move workloads to cloud with controlled risk and clear success criteria.",
        "problem": "Migrations stall when discovery is incomplete and rollback plans are missing.",
        "capabilities": [
            "Application and dependency discovery",
            "6R classification and wave planning",
            "Landing-zone prerequisites",
            "Data sync and cutover rehearsal",
            "Post-migration optimization",
        ],
        "approach": "Discover thoroughly, migrate low-risk waves first, rehearse cutovers, then optimize cost and reliability.",
        "technologies": ["Terraform", "Containers", "Database replication", "CDN", "Load balancers"],
        "securityConsiderations": "Preserve identity boundaries during migration and validate secrets handling in the target environment.",
        "engagementContext": "For organizations leaving data centers or consolidating clouds.",
    },
    "infrastructure-as-code": {
        "title": "Infrastructure as Code",
        "capability": "cloud",
        "summary": "Repeatable infrastructure modules, pipelines, and policy checks for every environment.",
        "purpose": "Make infrastructure changes reviewable, testable, and recoverable.",
        "problem": "Click-ops environments diverge and create undocumented risk.",
        "capabilities": [
            "Module standards and naming conventions",
            "Environment promotion pipelines",
            "Policy-as-code for security baselines",
            "Drift detection and remediation",
            "Documentation and ownership maps",
        ],
        "approach": "Codify shared modules, enforce reviews in CI, and treat infrastructure like software.",
        "technologies": ["Terraform", "Pulumi", "OpenTofu", "OPA/Conftest", "GitOps"],
        "securityConsiderations": "Remote state locking, least-privilege runners, and secrets never stored in VCS.",
        "engagementContext": "Pairs with cloud architecture and platform engineering engagements.",
    },
    "platform-engineering": {
        "title": "Platform Engineering",
        "capability": "platform",
        "summary": "Internal developer platforms that make the secure path the easy path.",
        "purpose": "Raise delivery speed while encoding organizational standards.",
        "problem": "Every team reinvents CI, environments, and observability, creating inconsistent risk.",
        "capabilities": [
            "Golden-path service templates",
            "Self-service environment provisioning",
            "Developer portal information architecture",
            "Platform SLOs and adoption metrics",
            "Office hours and enablement programs",
        ],
        "approach": "Treat product teams as customers. Ship paved roads, measure adoption, and retire friction.",
        "technologies": ["Kubernetes", "Backstage-style portals", "CI systems", "GitOps", "OIDC"],
        "securityConsiderations": "Templates include SAST/SCA, secret injection patterns, and signed artifact promotion.",
        "engagementContext": "For organizations with multiple product teams and rising delivery complexity.",
    },
    "devops-and-cicd": {
        "title": "DevOps and CI/CD",
        "capability": "platform",
        "summary": "Reliable build, test, and release pipelines with evidence for every promotion.",
        "purpose": "Shorten lead time without sacrificing quality gates.",
        "problem": "Manual releases and flaky pipelines make delivery unpredictable.",
        "capabilities": [
            "Pipeline standardization across repos",
            "Test pyramid and quality gates",
            "Artifact versioning and promotion",
            "Environment parity improvements",
            "Release metrics and bottleneck analysis",
        ],
        "approach": "Stabilize the critical path first, then automate promotion with clear ownership of failures.",
        "technologies": ["GitHub Actions", "GitLab CI", "Jenkins", "Artifact registries", "Containers"],
        "securityConsiderations": "OIDC to cloud, no long-lived keys, signed artifacts, and protected branches.",
        "engagementContext": "Often the first platform investment before broader developer experience work.",
    },
    "site-reliability-engineering": {
        "title": "Site Reliability Engineering",
        "capability": "platform",
        "summary": "SLOs, error budgets, incident response, and reliability engineering practices.",
        "purpose": "Keep user-facing systems reliable as traffic and complexity grow.",
        "problem": "Teams react to outages without shared definitions of healthy service behavior.",
        "capabilities": [
            "SLO and error-budget design",
            "On-call and escalation models",
            "Incident command and postmortems",
            "Capacity and load testing plans",
            "Toil reduction programs",
        ],
        "approach": "Define user journeys and SLOs, instrument symptoms, then reduce toil that blocks reliability work.",
        "technologies": ["Prometheus", "Grafana", "OpenTelemetry", "Pager systems", "Chaos tooling"],
        "securityConsiderations": "Protect observability data, control access to production tooling, and audit privileged actions.",
        "engagementContext": "For products with uptime commitments or rising operational load.",
    },
    "observability": {
        "title": "Observability",
        "capability": "platform",
        "summary": "Traces, metrics, and logs designed for fast diagnosis and product decision-making.",
        "purpose": "Give teams shared visibility into system behavior.",
        "problem": "Blind spots and noisy alerts make incidents longer and more expensive.",
        "capabilities": [
            "Telemetry standards and cardinality controls",
            "Distributed tracing for critical paths",
            "Dashboard and alert hygiene",
            "Log pipelines and retention policies",
            "Developer instrumentation guidance",
        ],
        "approach": "Instrument high-value journeys first, then expand coverage with consistent libraries and naming.",
        "technologies": ["OpenTelemetry", "Prometheus", "Loki/ELK", "APM platforms", "Trace stores"],
        "securityConsiderations": "Scrub PII from traces and logs, encrypt telemetry stores, and restrict query access.",
        "engagementContext": "Pairs with SRE and platform engineering for production readiness.",
    },
    "automation": {
        "title": "Automation",
        "capability": "platform",
        "summary": "Operational and business workflow automation that replaces ticket-driven toil.",
        "purpose": "Free engineers for higher-value work through safe automation.",
        "problem": "Repetitive operational tasks consume delivery capacity and introduce human error.",
        "capabilities": [
            "Toil inventory and ROI ranking",
            "Runbook automation",
            "Self-service request workflows",
            "Integration with ITSM and chatops",
            "Guardrails and rollback hooks",
        ],
        "approach": "Automate the top toil sources with measurable time savings and clear ownership.",
        "technologies": ["Workflow engines", "Python", "APIs", "Queues", "Infrastructure APIs"],
        "securityConsiderations": "Scoped credentials, approval for destructive actions, and full action audit trails.",
        "engagementContext": "Useful once platforms exist and teams need to scale operations.",
    },
    "devsecops": {
        "title": "DevSecOps",
        "capability": "security",
        "summary": "Security controls embedded in CI/CD: SAST, SCA, secrets, and policy gates.",
        "purpose": "Catch vulnerabilities early without blocking every release.",
        "problem": "Late security reviews create friction and still miss pipeline-borne risk.",
        "capabilities": [
            "Pipeline security control design",
            "SAST/SCA/secrets scanning integration",
            "Policy exceptions and risk acceptance flows",
            "Developer enablement and fix guidance",
            "Evidence packs for audits",
        ],
        "approach": "Put high-signal checks on the critical path and keep noise out of developer workflows.",
        "technologies": ["SAST tools", "SCA tools", "Secret scanners", "OPA", "CI systems"],
        "securityConsiderations": "Protect scanner credentials, prevent false sense of security, and track remediation SLAs.",
        "engagementContext": "For teams preparing enterprise security reviews or regulated deliveries.",
    },
    "application-security": {
        "title": "Application Security",
        "capability": "security",
        "summary": "Threat modeling, secure design reviews, and application hardening for product teams.",
        "purpose": "Reduce exploitable defects before they reach production.",
        "problem": "Features ship without threat models, leaving authZ and data exposure gaps.",
        "capabilities": [
            "Threat modeling workshops",
            "Secure design reviews",
            "AuthN/AuthZ pattern guidance",
            "Abuse-case testing support",
            "Remediation roadmaps",
        ],
        "approach": "Focus on the highest-risk user journeys and enforce secure patterns through reviews and templates.",
        "technologies": ["OWASP ASVS", "Identity providers", "WAF patterns", "Security testing tools"],
        "securityConsiderations": "Prioritize identity, data classification, and injection/authZ classes of bugs.",
        "engagementContext": "Works alongside product engineering and DevSecOps pipelines.",
    },
    "cloud-security-engineering": {
        "title": "Cloud Security Engineering",
        "capability": "security",
        "summary": "Cloud posture, identity, network controls, and workload protection designed together.",
        "purpose": "Make cloud environments resilient to misconfiguration and identity abuse.",
        "problem": "Cloud risk concentrates in identity sprawl, public exposure, and missing detection coverage.",
        "capabilities": [
            "Identity and access design",
            "Network and perimeter controls",
            "CSPM and continuous posture",
            "Workload and container hardening",
            "Detection use cases for cloud events",
        ],
        "approach": "Fix identity and exposure first, then automate posture and detection.",
        "technologies": ["IAM", "CSPM", "SIEM integrations", "Kubernetes security", "KMS"],
        "securityConsiderations": "Break-glass access, encryption keys ownership, and privileged activity monitoring.",
        "engagementContext": "Essential for multi-account cloud estates and regulated workloads.",
    },
    "data-engineering": {
        "title": "Data Engineering",
        "capability": "data",
        "summary": "Reliable pipelines for analytics and AI with quality checks and lineage.",
        "purpose": "Deliver trustworthy data products on predictable schedules.",
        "problem": "Fragile pipelines and unclear ownership make dashboards and AI features unreliable.",
        "capabilities": [
            "Pipeline architecture and orchestration",
            "Data quality tests and contracts",
            "Batch and streaming patterns",
            "Lineage and catalog integration",
            "Cost-aware transformation design",
        ],
        "approach": "Define data contracts, build observable pipelines, and treat failed quality checks as release blockers.",
        "technologies": ["Spark", "dbt", "Airflow/Dagster", "Kafka", "Warehouse/lakehouse platforms"],
        "securityConsiderations": "Column-level access where needed, encryption, and audit of sensitive extracts.",
        "engagementContext": "For analytics platforms and AI-ready data foundations.",
    },
    "data-platforms": {
        "title": "Data Platforms",
        "capability": "data",
        "summary": "Lakehouse and warehouse foundations with governance, access control, and self-service.",
        "purpose": "Give teams a shared, governed place to produce and consume data.",
        "problem": "Shadow datasets proliferate when platforms lack ownership and access models.",
        "capabilities": [
            "Platform architecture selection",
            "Domain data product patterns",
            "Access control and masking",
            "Cost monitoring and workload isolation",
            "Self-service onboarding for analysts and engineers",
        ],
        "approach": "Establish domains and ownership, then build shared platform capabilities that enforce governance by default.",
        "technologies": ["Snowflake/BigQuery/Databricks-style platforms", "Catalog tools", "IAM", "Object storage"],
        "securityConsiderations": "Least privilege, encryption, and monitoring of bulk exports.",
        "engagementContext": "Natural follow-on to data engineering when multiple teams share data.",
    },
    "emerging-technologies": {
        "title": "Emerging Technologies",
        "capability": "labs",
        "summary": "Time-boxed evaluations of emerging tools with clear go or no-go recommendations.",
        "purpose": "Explore new technology without betting the production estate prematurely.",
        "problem": "Hype cycles push tools into production before fitness and risk are understood.",
        "capabilities": [
            "Spike design and success criteria",
            "Security and operability assessment",
            "Cost and lock-in analysis",
            "Prototype with production constraints",
            "Adoption or reject recommendation memos",
        ],
        "approach": "Run bounded experiments with explicit exit criteria, then promote only what clears operational bars.",
        "technologies": ["Varies by evaluation", "Prototype stacks", "Benchmark harnesses"],
        "securityConsiderations": "Isolate experiments from production data unless controls are proven.",
        "engagementContext": "For Labs-driven exploration before broader capability investment.",
    },
}


def write_services() -> None:
    out = ROOT / "services"
    for slug, data in SERVICES.items():
        front = {
            "slug": slug,
            "title": data["title"],
            "capability": data["capability"],
            "summary": data["summary"],
            "purpose": data["purpose"],
            "problem": data["problem"],
            "capabilities": data["capabilities"],
            "approach": data["approach"],
            "technologies": data["technologies"],
            "securityConsiderations": data["securityConsiderations"],
            "engagementContext": data["engagementContext"],
            "visibility": "public",
            "seo": {
                "title": data["title"],
                "description": data["summary"],
            },
        }
        body = textwrap.dedent(
            f"""
            {data['summary']}

            ## Who this is for
            {data['engagementContext']}

            ## How Avero engages
            {data['approach']}
            """
        ).strip()
        md(out / f"{slug}.md", front, body)
    print(f"Wrote {len(SERVICES)} services")


INDUSTRIES = {
    "fintech": {
        "title": "Financial services and FinTech",
        "summary": "Secure cloud, identity, data controls, and resilient product platforms for regulated financial workloads.",
        "useCases": [
            "Secure multi-account cloud landing zones",
            "Customer-facing product and API platforms",
            "Fraud and risk data pipelines",
            "DevSecOps evidence for enterprise bank reviews",
            "High-availability payment and ledger adjacent services",
        ],
        "relatedServiceSlugs": [
            "cloud-architecture",
            "cloud-security-engineering",
            "software-engineering",
            "devsecops",
            "data-engineering",
        ],
        "relatedCapabilities": ["engineering", "cloud", "security", "data"],
        "evidenceLevel": "directional",
    },
    "healthcare": {
        "title": "Healthcare and life sciences",
        "summary": "Privacy-aware platforms, secure integrations, and reliable clinical or operational systems engineering.",
        "useCases": [
            "Patient and provider portal backends",
            "Secure integrations with EHR-adjacent systems",
            "PHI-aware logging and access patterns",
            "Analytics pipelines with de-identification strategies",
            "Cloud foundations for research workloads",
        ],
        "relatedServiceSlugs": [
            "software-engineering",
            "application-security",
            "cloud-architecture",
            "data-platforms",
            "observability",
        ],
        "relatedCapabilities": ["engineering", "security", "cloud", "data"],
        "evidenceLevel": "directional",
    },
    "saas": {
        "title": "SaaS and software products",
        "summary": "Multi-tenant platforms, delivery systems, and AI features that scale with product growth.",
        "useCases": [
            "Tenant isolation and entitlements",
            "Developer platforms for multiple product squads",
            "Generative AI features with evaluation gates",
            "Observability and SRE for uptime commitments",
            "CI/CD with signed artifact promotion",
        ],
        "relatedServiceSlugs": [
            "saas-platforms",
            "platform-engineering",
            "generative-ai-systems",
            "site-reliability-engineering",
            "devops-and-cicd",
        ],
        "relatedCapabilities": ["engineering", "platform", "ai", "security"],
        "evidenceLevel": "directional",
    },
    "ecommerce": {
        "title": "E-commerce and retail",
        "summary": "High-traffic storefronts, catalog and order services, and data systems for personalization.",
        "useCases": [
            "API and service modernization for catalog and checkout",
            "Peak-traffic readiness and load testing",
            "Personalization and recommendation data pipelines",
            "Secure customer identity integrations",
            "Cloud cost control for seasonal scale",
        ],
        "relatedServiceSlugs": [
            "software-engineering",
            "application-modernization",
            "site-reliability-engineering",
            "data-engineering",
            "cloud-architecture",
        ],
        "relatedCapabilities": ["engineering", "platform", "data", "cloud"],
        "evidenceLevel": "directional",
    },
    "logistics": {
        "title": "Logistics and supply chain",
        "summary": "Event-driven integrations, tracking platforms, and operational data systems for physical networks.",
        "useCases": [
            "Shipment and tracking service platforms",
            "Partner integration hubs",
            "Real-time operational dashboards",
            "Warehouse and route optimization data pipelines",
            "Reliable mobile backend services",
        ],
        "relatedServiceSlugs": [
            "software-engineering",
            "data-engineering",
            "observability",
            "cloud-migration",
            "automation",
        ],
        "relatedCapabilities": ["engineering", "data", "platform", "cloud"],
        "evidenceLevel": "directional",
    },
    "enterprise": {
        "title": "Enterprise IT",
        "summary": "Platform standardization, modernization programs, and security controls across large estates.",
        "useCases": [
            "Internal developer platforms",
            "Legacy application modernization waves",
            "Zero-trust delivery pipelines",
            "Enterprise cloud landing zones",
            "Governed data platforms for analytics",
        ],
        "relatedServiceSlugs": [
            "platform-engineering",
            "application-modernization",
            "devsecops",
            "cloud-architecture",
            "data-platforms",
        ],
        "relatedCapabilities": ["platform", "engineering", "security", "cloud", "data"],
        "evidenceLevel": "directional",
    },
    "technology-companies": {
        "title": "Technology companies",
        "summary": "Product engineering, cloud scale, and AI delivery for technology builders.",
        "useCases": [
            "Core product engineering and API platforms",
            "Cloud cost and architecture reviews",
            "AI evaluation platforms",
            "Security hardening for enterprise sales",
            "SRE practices for multi-region products",
        ],
        "relatedServiceSlugs": [
            "software-engineering",
            "cloud-architecture",
            "generative-ai-systems",
            "application-security",
            "site-reliability-engineering",
        ],
        "relatedCapabilities": ["engineering", "cloud", "ai", "security", "platform"],
        "evidenceLevel": "directional",
    },
    "ai-startups": {
        "title": "AI startups",
        "summary": "Production AI systems, data foundations, and secure delivery for early-stage teams moving past demos.",
        "useCases": [
            "RAG systems grounded in proprietary corpora",
            "Agent workflows with approval gates",
            "Evaluation harnesses before launch",
            "Cloud foundations that scale without chaos",
            "DevSecOps for investor and enterprise diligence",
        ],
        "relatedServiceSlugs": [
            "generative-ai-systems",
            "rag-and-knowledge-systems",
            "ai-agents-and-automation",
            "cloud-architecture",
            "devsecops",
        ],
        "relatedCapabilities": ["ai", "data", "cloud", "security"],
        "evidenceLevel": "directional",
    },
}


def write_industries() -> None:
    out = ROOT / "industries"
    for slug, data in INDUSTRIES.items():
        front = {
            "slug": slug,
            "title": data["title"],
            "summary": data["summary"],
            "useCases": data["useCases"],
            "relatedServiceSlugs": data["relatedServiceSlugs"],
            "relatedCapabilities": data["relatedCapabilities"],
            "evidenceLevel": data["evidenceLevel"],
            "visibility": "public",
            "seo": {
                "title": data["title"],
                "description": data["summary"],
            },
        }
        body = textwrap.dedent(
            f"""
            {data['summary']}

            ## Typical engagement themes
            {chr(10).join(f'- {u}' for u in data['useCases'])}
            """
        ).strip()
        md(out / f"{slug}.md", front, body)
    print(f"Wrote {len(INDUSTRIES)} industries")


SOLUTIONS = {
    "secure-cloud-platforms": {
        "title": "Secure cloud platforms",
        "problem": "Cloud estates lack consistent identity, network, and logging baselines across accounts.",
        "outcome": "A reusable landing-zone model with shared guardrails and faster environment provisioning.",
        "approach": "Define a control catalog, implement identity and logging first, then add network spokes and workload accounts.",
        "relatedServiceSlugs": ["cloud-architecture", "cloud-security-engineering", "infrastructure-as-code"],
        "relatedCapabilities": ["cloud", "security", "platform"],
    },
    "ai-ready-data-foundations": {
        "title": "AI-ready data foundations",
        "problem": "AI initiatives stall because data is incomplete, poorly governed, or inaccessible under production constraints.",
        "outcome": "Trusted pipelines and governed datasets that analytics and generative systems can consume.",
        "approach": "Establish data contracts, quality checks, lineage, and access models before expanding model work.",
        "relatedServiceSlugs": ["data-engineering", "data-platforms", "rag-and-knowledge-systems"],
        "relatedCapabilities": ["data", "ai", "security"],
    },
    "developer-delivery-platforms": {
        "title": "Developer delivery platforms",
        "problem": "Teams wait on tickets for environments and pipelines, creating inconsistent security posture.",
        "outcome": "Self-service paved roads that cut lead time and encode secure defaults.",
        "approach": "Ship golden-path templates, self-service provisioning, and adoption metrics as a product.",
        "relatedServiceSlugs": ["platform-engineering", "devops-and-cicd", "devsecops"],
        "relatedCapabilities": ["platform", "security", "engineering"],
    },
    "enterprise-integration-hub": {
        "title": "Enterprise integration hub",
        "problem": "Point-to-point integrations multiply until change risk and outages become routine.",
        "outcome": "A governed integration layer with clear contracts, observability, and ownership.",
        "approach": "Inventory integrations, introduce an API or event hub pattern, and migrate high-churn connections first.",
        "relatedServiceSlugs": ["software-engineering", "application-modernization", "observability"],
        "relatedCapabilities": ["engineering", "platform", "data"],
    },
    "zero-trust-software-delivery": {
        "title": "Zero-trust software delivery",
        "problem": "CI/CD trusts developer machines and long-lived credentials, creating supply-chain risk.",
        "outcome": "Identity-based pipelines with signed artifacts and auditable promotions.",
        "approach": "Replace standing keys with OIDC, sign artifacts, and enforce admission policy at deploy time.",
        "relatedServiceSlugs": ["devsecops", "devops-and-cicd", "cloud-security-engineering"],
        "relatedCapabilities": ["security", "platform", "cloud"],
    },
    "customer-facing-product-systems": {
        "title": "Customer-facing product systems",
        "problem": "Growth products need durable backends for identity, entitlements, and reliability under load.",
        "outcome": "A product platform core that supports faster feature delivery with clearer ownership.",
        "approach": "Stabilize core services, introduce SLOs, and create paved paths for product squads.",
        "relatedServiceSlugs": ["saas-platforms", "software-engineering", "site-reliability-engineering"],
        "relatedCapabilities": ["engineering", "platform", "security"],
    },
}


def write_solutions() -> None:
    out = ROOT / "solutions"
    for slug, data in SOLUTIONS.items():
        front = {
            "slug": slug,
            "title": data["title"],
            "problem": data["problem"],
            "outcome": data["outcome"],
            "approach": data["approach"],
            "relatedServiceSlugs": data["relatedServiceSlugs"],
            "relatedCapabilities": data["relatedCapabilities"],
            "visibility": "public",
            "seo": {
                "title": data["title"],
                "description": data["outcome"],
            },
        }
        body = textwrap.dedent(
            f"""
            ## Problem
            {data['problem']}

            ## Outcome
            {data['outcome']}

            ## Approach
            {data['approach']}
            """
        ).strip()
        md(out / f"{slug}.md", front, body)
    print(f"Wrote {len(SOLUTIONS)} solutions")


def main() -> None:
    write_services()
    write_industries()
    write_solutions()
    print("Content enrichment complete.")


if __name__ == "__main__":
    main()
