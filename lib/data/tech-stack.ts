import type { TechItem } from "@/types";

export const techStack: TechItem[] = [
  // Backend
  {
    id: "java",
    name: "Java",
    category: "Backend",
    description:
      "Our primary language for enterprise application backends, chosen for its maturity, performance, and robust ecosystem for building mission-critical systems.",
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    category: "Backend",
    description:
      "We use Spring Boot as the foundation for our Java microservices and REST API backends, leveraging its production-ready features for security, monitoring, and cloud deployment.",
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend",
    description:
      "We use Node.js for real-time applications, API gateways, and event-driven microservices where high concurrency and low latency are critical requirements.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Backend",
    description:
      "TypeScript is our standard language for all new JavaScript-based development, ensuring type safety, better tooling, and improved maintainability across frontend and Node.js backends.",
  },

  // Frontend
  {
    id: "react",
    name: "React",
    category: "Frontend",
    description:
      "React is our primary frontend framework, used to build complex, interactive enterprise dashboards and customer-facing web applications with rich user experiences.",
  },
  {
    id: "angular",
    name: "Angular",
    category: "Frontend",
    description:
      "We use Angular for large-scale enterprise frontend applications where its opinionated structure, strong typing, and built-in tooling improve team productivity on complex codebases.",
  },

  // Mobile
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile",
    description:
      "Flutter is our preferred framework for cross-platform mobile development, enabling us to deliver high-quality native-feeling apps for both Android and iOS from a single codebase.",
  },

  // Databases
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Databases",
    description:
      "Our default relational database for enterprise applications, selected for its reliability, advanced querying capabilities, and strong support for complex data models and transactions.",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Databases",
    description:
      "We use MySQL for applications requiring a proven, widely supported relational database, particularly in environments with existing MySQL infrastructure or specific compliance requirements.",
  },
  {
    id: "redis",
    name: "Redis",
    category: "Databases",
    description:
      "We deploy Redis as a high-performance caching layer and message broker to dramatically reduce database load and improve response times in high-traffic enterprise applications.",
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    category: "Databases",
    description:
      "RabbitMQ powers our asynchronous messaging and event-driven integration patterns, enabling reliable communication between microservices and decoupled system integrations.",
  },

  // Infrastructure
  {
    id: "docker",
    name: "Docker",
    category: "Infrastructure",
    description:
      "We containerize all application workloads using Docker to ensure consistent, reproducible deployments across development, staging, and production environments.",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Infrastructure",
    description:
      "We use Kubernetes to orchestrate containerized workloads for enterprise clients, enabling auto-scaling, self-healing deployments, and zero-downtime rolling updates.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "Infrastructure",
    description:
      "GitHub is our version control and CI/CD platform, enabling automated testing, code review workflows, and deployment pipelines that maintain code quality and release velocity.",
  },

  // Cloud
  {
    id: "aws",
    name: "AWS",
    category: "Cloud",
    description:
      "Amazon Web Services is our primary cloud platform, used to host enterprise applications with high availability, global reach, and a comprehensive set of managed services.",
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud",
    description:
      "We deploy on Microsoft Azure for enterprise clients with existing Microsoft ecosystem investments, leveraging Azure's enterprise-grade compliance certifications and hybrid cloud capabilities.",
  },
];
