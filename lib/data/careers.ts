import type { JobListing, CompanyBenefit } from "@/types";

export const jobListings: JobListing[] = [
  {
    id: "senior-full-stack-developer",
    title: "Senior Full Stack Developer",
    department: "Engineering",
    location: "Bhopal / Remote",
    type: "Full-time",
    mode: "Hybrid",
    description:
      "We are looking for a Senior Full Stack Developer with 5+ years of experience building enterprise-grade web applications using Java/Spring Boot on the backend and React/TypeScript on the frontend. You will work on complex, high-impact projects for enterprise clients across manufacturing, healthcare, and retail sectors. Strong experience with PostgreSQL, REST API design, Docker, and cloud deployment on AWS or Azure is required. You will mentor junior engineers, conduct code reviews, and contribute to architectural decisions. This is a high-ownership role where your technical leadership directly shapes client outcomes and product quality.",
  },
  {
    id: "react-nextjs-frontend-developer",
    title: "React / Next.js Frontend Developer",
    department: "Engineering",
    location: "Bhopal / Remote",
    type: "Full-time",
    mode: "Hybrid",
    description:
      "We are seeking a skilled React and Next.js Frontend Developer with 3+ years of experience building modern, accessible, and high-performance web interfaces. You should have strong proficiency in TypeScript, Tailwind CSS, and component architecture, along with experience consuming RESTful APIs and implementing responsive designs. Experience with Framer Motion or other animation libraries, performance optimization, and Core Web Vitals is a significant advantage. You will work closely with our UI/UX designers and backend engineers to deliver polished, enterprise-quality user experiences for both client products and internal SaaS platforms.",
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Bhopal",
    type: "Full-time",
    mode: "Onsite",
    description:
      "We are hiring a DevOps Engineer with hands-on experience in cloud infrastructure, containerization, and CI/CD pipeline automation. You will be responsible for designing, implementing, and maintaining the infrastructure that powers our clients' production applications on AWS and Azure. Required skills include Docker, Kubernetes, Terraform, GitHub Actions, and strong Linux system administration. Experience with monitoring and observability tooling (Prometheus, Grafana, ELK stack) and a solid understanding of security best practices for cloud environments are essential. You will work directly with our development teams to automate deployment workflows and build resilient, scalable infrastructure.",
  },
  {
    id: "business-development-manager",
    title: "Business Development Manager",
    department: "Sales",
    location: "Bhopal",
    type: "Full-time",
    mode: "Onsite",
    description:
      "We are looking for an experienced Business Development Manager to drive revenue growth by identifying, engaging, and closing enterprise software development opportunities across India and international markets. You will generate leads through outbound prospecting, networking, and industry events, qualify opportunities, lead discovery calls, and coordinate with our technical team to develop compelling proposals. A background in IT services sales with 4+ years of experience, strong understanding of enterprise software development, and demonstrable success in closing deals of ₹25 lakh and above is required. Excellent communication skills, executive presence, and the ability to build long-term client relationships are essential.",
  },
];

export const companyBenefits: CompanyBenefit[] = [
  {
    id: "competitive-salary",
    icon: "BadgeIndianRupee",
    title: "Competitive Salary",
    description:
      "We benchmark our compensation against the top 25th percentile of the Bhopal and remote technology market and conduct annual salary reviews to ensure our team members are paid fairly for their skills and contributions.",
  },
  {
    id: "flexible-work-hours",
    icon: "Clock",
    title: "Flexible Work Hours",
    description:
      "We trust our team to manage their time effectively. Core collaboration hours are 10 AM–4 PM, and you have the flexibility to structure the rest of your workday around your peak productivity windows and personal commitments.",
  },
  {
    id: "learning-development",
    icon: "BookOpen",
    title: "Learning & Development Budget",
    description:
      "Every team member receives an annual learning budget for courses, certifications, conference attendance, and technical books. We actively encourage and financially support professional growth in cloud certifications, AI skills, and emerging technologies.",
  },
  {
    id: "health-insurance",
    icon: "HeartPulse",
    title: "Health Insurance",
    description:
      "We provide comprehensive group health insurance coverage for all full-time employees, including coverage for hospitalization, critical illness, and preventive health check-ups. Coverage extends to direct family members.",
  },
  {
    id: "remote-work",
    icon: "Laptop",
    title: "Remote Work Options",
    description:
      "Most engineering and design roles at PRORYN TECH are eligible for hybrid or fully remote arrangements. We invest in the tooling, processes, and communication practices needed to make remote collaboration genuinely effective.",
  },
  {
    id: "career-growth",
    icon: "TrendingUp",
    title: "Career Growth Path",
    description:
      "We have a transparent, structured career progression framework from Junior Engineer through Senior, Tech Lead, and Principal Engineer levels. Regular 1:1s, quarterly performance reviews, and internal mobility opportunities ensure your career grows with the company.",
  },
];
