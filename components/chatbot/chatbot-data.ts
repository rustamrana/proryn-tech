// FAQ knowledge base for PRORYN TECH AI Assistant
// Each entry has keywords for pattern matching and an answer string

export interface FAQEntry {
  keywords: string[];
  answer: string;
}

export const faqData: FAQEntry[] = [
  {
    keywords: ["services", "what do you do", "offer", "provide", "help with"],
    answer:
      "We offer a comprehensive suite of enterprise technology services including Custom Software Development, AI & Machine Learning Solutions, Cloud Infrastructure & DevOps, Business Process Automation, Mobile App Development, and Resource Augmentation. Would you like details on any specific service?",
  },
  {
    keywords: ["products", "businessos", "business os", "erp", "software product"],
    answer:
      "Our flagship product is BusinessOS — an all-in-one enterprise platform that integrates CRM, Project Management, HR, Finance, and Analytics into a single unified dashboard. It's designed for SMEs and enterprises looking to streamline operations. Want to learn more or schedule a demo?",
  },
  {
    keywords: ["pricing", "cost", "how much", "budget", "quote", "rates", "price"],
    answer:
      "Our pricing is tailored to each project's scope and complexity. We offer flexible engagement models — Fixed Price for well-defined projects, Time & Material for evolving requirements, and Dedicated Teams for long-term partnerships. Contact our sales team at sales@proryntech.com for a custom quote.",
  },
  {
    keywords: ["contact", "reach", "email", "phone", "get in touch", "talk to"],
    answer:
      "You can reach us at:\n📧 Email: info@proryntech.com\n📞 Phone: +91 90397 30924\n🌐 Website: proryntech.com/contact\n\nOur team typically responds within 24 hours on business days.",
  },
  {
    keywords: ["technology", "tech stack", "technologies", "tools", "framework", "language"],
    answer:
      "We work with cutting-edge technologies including React, Next.js, Node.js, Python, .NET, Flutter, React Native, AWS, Azure, GCP, Docker, Kubernetes, TensorFlow, and more. Our team stays current with the latest industry standards to deliver modern, scalable solutions.",
  },
  {
    keywords: ["career", "job", "hiring", "work with you", "openings", "apply", "join"],
    answer:
      "We're always looking for talented engineers, designers, and innovators! Check our Careers page for current openings across Software Engineering, AI/ML, DevOps, UI/UX Design, and more. We offer competitive salaries, remote-first culture, and continuous learning opportunities.",
  },
  {
    keywords: ["location", "where", "office", "address", "based", "headquarters"],
    answer:
      "PRORYN TECH is headquartered in Bhopal, Madhya Pradesh, India — at IT Park, Sector-C, Scheme 74-C, Vijay Nagar (462010). We serve clients globally with remote-first collaboration capabilities.",
  },
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "chatbot", "automation"],
    answer:
      "We specialize in AI & ML solutions including Natural Language Processing, Computer Vision, Predictive Analytics, Intelligent Automation, and Custom AI Assistants. Our team builds production-ready AI systems that integrate seamlessly with your existing infrastructure.",
  },
  {
    keywords: ["cloud", "aws", "azure", "devops", "infrastructure", "deployment"],
    answer:
      "Our Cloud & DevOps services cover cloud migration, infrastructure-as-code, CI/CD pipelines, containerization with Docker/Kubernetes, monitoring, and cost optimization across AWS, Azure, and GCP. We help you build resilient, scalable cloud architectures.",
  },
  {
    keywords: ["mobile", "app", "ios", "android", "flutter", "react native"],
    answer:
      "We develop cross-platform and native mobile applications using Flutter, React Native, Swift, and Kotlin. From MVP to enterprise-grade apps, we handle the full lifecycle — design, development, testing, deployment, and ongoing maintenance.",
  },
  {
    keywords: ["about", "company", "who are you", "proryn", "team"],
    answer:
      "PRORYN TECH is an enterprise software development company engineering intelligent solutions for modern businesses. We partner with startups, SMEs, enterprises, and government organizations worldwide to deliver scalable, secure, and innovative technology solutions.",
  },
  {
    keywords: ["support", "maintenance", "help", "issue", "bug", "problem"],
    answer:
      "We provide comprehensive post-launch support including 24/7 monitoring, bug fixes, performance optimization, security patches, and feature enhancements. Reach our support team at support@proryntech.com for existing project issues.",
  },
  {
    keywords: ["timeline", "how long", "duration", "delivery", "deadline"],
    answer:
      "Project timelines vary based on scope and complexity. Typical ranges: MVPs in 6-8 weeks, mid-size projects in 3-4 months, and enterprise solutions in 6-12 months. We follow agile methodologies with bi-weekly sprint deliveries so you see progress continuously.",
  },
  {
    keywords: ["consultation", "free", "discovery", "meeting", "discuss", "call"],
    answer:
      "Yes! We offer a free 30-minute discovery consultation to understand your requirements and suggest the best approach. Book a call through our contact page or email sales@proryntech.com with your project details.",
  },
];

/**
 * Matches user input against FAQ entries using keyword matching.
 * Returns the best matching answer or null if no confident match.
 */
export function matchFAQ(userMessage: string): string | null {
  const normalized = userMessage.toLowerCase().trim();

  if (normalized.length < 2) return null;

  let bestMatch: { entry: FAQEntry; score: number } | null = null;

  for (const entry of faqData) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        // Longer keyword matches get higher weight
        score += keyword.length;
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { entry, score };
    }
  }

  // Require a minimum confidence threshold
  if (bestMatch && bestMatch.score >= 3) {
    return bestMatch.entry.answer;
  }

  return null;
}
