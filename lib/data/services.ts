import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "enterprise-software-development",
    icon: "Building2",
    title: "Enterprise Software Development",
    description:
      "We architect and build robust enterprise-grade software solutions tailored to your organization's unique operational requirements. From ERP and CRM to HRMS and billing systems, our solutions are designed for scale, security, and long-term maintainability.",
    features: ["ERP", "CRM", "HRMS", "Inventory", "Billing", "Workflow"],
    longDescription:
      "Our enterprise software development practice covers the full lifecycle — from requirements analysis and architecture design through development, testing, deployment, and post-launch support. We specialize in large-scale, mission-critical systems that must handle thousands of concurrent users, complex business logic, and rigorous compliance requirements. Each solution is built on a modern, cloud-ready technology stack using Java, Spring Boot, and React, ensuring high performance and maintainability. Our enterprise clients benefit from dedicated project teams, transparent delivery milestones, and a long-term partnership model.",
  },
  {
    id: "custom-web-application-development",
    icon: "Globe",
    title: "Custom Web Application Development",
    description:
      "We design and develop high-performance web applications that solve real business problems and deliver exceptional user experiences. Whether you need a customer-facing portal, a complex SaaS platform, or an internal admin dashboard, we bring full-stack expertise to every engagement.",
    features: [
      "Business Applications",
      "SaaS Platforms",
      "Customer Portals",
      "Admin Dashboards",
      "REST APIs",
      "PWA",
    ],
    longDescription:
      "Our web application development service spans the entire spectrum from single-page applications to multi-tenant SaaS platforms processing millions of transactions. We follow a component-driven architecture using React and Next.js on the frontend, paired with robust Node.js or Java backends and well-designed RESTful APIs. We prioritize performance, accessibility, and security at every stage of development. Our Progressive Web App (PWA) capabilities ensure users get a native-app-quality experience on any device, without requiring an app store download.",
  },
  {
    id: "mobile-app-development",
    icon: "Smartphone",
    title: "Mobile App Development",
    description:
      "We build cross-platform and native mobile applications that deliver seamless user experiences on Android and iOS. Our mobile solutions range from enterprise field-force applications and customer engagement apps to complex mobile-first platforms, all optimized for performance and reliability.",
    features: [
      "Android",
      "iOS",
      "Flutter",
      "React Native",
      "App Store",
      "Play Store",
    ],
    longDescription:
      "Our mobile development team delivers high-quality applications using Flutter and React Native for cross-platform efficiency, as well as native Android and iOS development for performance-critical use cases. We handle the complete mobile product lifecycle, from UX wireframing and prototyping to development, QA, and submission to the Google Play Store and Apple App Store. Our apps are built with offline-first capabilities, push notification integration, and deep platform API access where needed. We also provide post-launch monitoring, A/B testing support, and iterative feature development to keep your mobile product competitive.",
  },
  {
    id: "artificial-intelligence-solutions",
    icon: "Brain",
    title: "Artificial Intelligence Solutions",
    description:
      "We integrate practical, business-ready AI capabilities into your operations to automate repetitive tasks, extract insights from unstructured data, and deliver intelligent user interactions. Our AI solutions are purpose-built for enterprise contexts, not generic demos.",
    features: [
      "AI Chatbot",
      "AI Assistant",
      "WhatsApp Automation",
      "OCR",
      "AI Reports",
      "Document AI",
    ],
    longDescription:
      "Our AI solutions practice focuses on delivering measurable business value through applied machine learning, natural language processing, and intelligent document processing. We build conversational AI assistants and chatbots that handle customer inquiries, internal helpdesk tickets, and workflow approvals at scale. Our WhatsApp Business API integrations enable enterprises to automate customer communications, order updates, and support workflows directly within the messaging platform their customers already use. We also deliver Optical Character Recognition (OCR) and Document AI solutions that digitize paper-based workflows, extract structured data from invoices and forms, and integrate directly with your ERP or CRM systems.",
  },
  {
    id: "business-automation",
    icon: "Workflow",
    title: "Business Automation",
    description:
      "We help organizations eliminate manual, error-prone processes and replace them with intelligent, automated workflows that run reliably at scale. Our automation solutions connect your existing systems, enforce business rules, and reduce operational overhead across departments.",
    features: [
      "Workflow Automation",
      "Process Digitization",
      "RPA",
      "Integration",
      "Notifications",
      "Approval Flows",
    ],
    longDescription:
      "Business automation at PRORYN TECH goes beyond simple task scheduling — we design end-to-end automated processes that span multiple systems, teams, and approval layers. Our Robotic Process Automation (RPA) implementations handle high-volume, rule-based tasks such as data entry, report generation, and cross-system reconciliation. We use integration platforms and custom APIs to create seamless data flows between your ERP, CRM, HRMS, and third-party SaaS tools, eliminating manual data handoffs. Our process digitization consulting identifies the highest-ROI automation opportunities within your organization and delivers production-ready implementations with full audit trails and exception handling.",
  },
  {
    id: "cloud-devops",
    icon: "Cloud",
    title: "Cloud & DevOps",
    description:
      "We design, build, and manage cloud infrastructure and DevOps pipelines that give your engineering teams the speed, reliability, and cost efficiency to ship software with confidence. Our cloud-native approach ensures your applications scale seamlessly with demand.",
    features: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Infrastructure as Code",
    ],
    longDescription:
      "Our Cloud & DevOps practice combines deep expertise in AWS and Microsoft Azure with modern containerization, orchestration, and automation tooling. We design cloud architectures with high availability, disaster recovery, and security as first-class requirements, not afterthoughts. Using Docker and Kubernetes, we containerize workloads for consistent, repeatable deployments across environments. Our CI/CD pipeline implementations using GitHub Actions, Jenkins, or Azure DevOps eliminate manual deployment steps, reduce release risk, and enable development teams to deploy multiple times per day with confidence. We also provide Infrastructure as Code (IaC) solutions using Terraform and Ansible, ensuring your cloud configuration is version-controlled, auditable, and reproducible.",
  },
  {
    id: "resource-augmentation",
    icon: "Users",
    title: "Resource Augmentation",
    description:
      "We provide skilled, pre-vetted software engineers, QA specialists, DevOps engineers, and technology architects who integrate seamlessly into your existing development teams. Our augmented resources work as an extension of your organization, not as an outsourced vendor.",
    features: [
      "Software Engineers",
      "QA Engineers",
      "DevOps Engineers",
      "Dedicated Teams",
      "Tech Leads",
      "Architects",
    ],
    longDescription:
      "Our Resource Augmentation service gives organizations immediate access to senior-level technology talent without the overhead of permanent hiring cycles. We carefully match engineers to your technology stack, team culture, and project requirements, ensuring a productive contribution from day one. Our augmented professionals are available for short-term project sprints, extended multi-year engagements, or fully dedicated team setups with their own Tech Lead and QA function. All PRORYN TECH engineers follow our internal coding standards, conduct regular code reviews, and participate in your sprint ceremonies just like full-time employees. We maintain full transparency through weekly status reporting and direct communication between your management and our engineers.",
  },
  {
    id: "annual-maintenance-support",
    icon: "Headphones",
    title: "Annual Maintenance & Support",
    description:
      "We provide comprehensive Annual Maintenance Contract (AMC) services that keep your mission-critical applications running at peak performance, secure against emerging threats, and continuously improving. Our support teams are available around the clock to address incidents and prevent downtime.",
    features: [
      "24/7 Monitoring",
      "Bug Fixes",
      "Security Updates",
      "Performance Optimization",
      "Version Upgrades",
      "SLA Support",
    ],
    longDescription:
      "Our Annual Maintenance & Support service is designed for organizations that need a reliable technology partner to maintain, optimize, and evolve their production applications over time. We offer tiered SLA options with guaranteed response and resolution times, ensuring that critical incidents receive immediate attention regardless of business hours or time zone. Our proactive monitoring setup detects performance degradation, security anomalies, and infrastructure issues before they impact end users. Regular security patch cycles, dependency updates, and version upgrades ensure your applications remain compliant with current security standards. We also conduct periodic performance audits and recommend optimizations to reduce infrastructure costs and improve application responsiveness.",
  },
  {
    id: "technology-consulting",
    icon: "Lightbulb",
    title: "Technology Consulting",
    description:
      "We provide strategic technology advisory services that help organizations make informed decisions about their digital investments, architectural choices, and technology roadmaps. Our consultants bring hands-on implementation experience, not just theoretical frameworks.",
    features: [
      "Architecture Review",
      "Digital Strategy",
      "Technology Roadmap",
      "Vendor Selection",
      "Security Assessment",
      "Compliance",
    ],
    longDescription:
      "Our Technology Consulting practice bridges the gap between business strategy and technical execution, helping leadership teams translate organizational goals into actionable technology initiatives. We conduct comprehensive architecture reviews that identify technical debt, scalability bottlenecks, and security vulnerabilities in existing systems, and we provide a prioritized remediation roadmap with business impact analysis. Our digital transformation engagements help SMEs and enterprises define their 3–5 year technology strategy, select appropriate platforms and vendors, and build the internal capabilities needed to execute. We also advise on regulatory compliance for industries subject to frameworks such as HIPAA, ISO 27001, and GDPR, helping organizations design systems that meet compliance requirements without compromising agility.",
  },
];
