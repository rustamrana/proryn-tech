import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "manufacturing-erp",
    industry: "Manufacturing",
    title: "Transforming Operations for a Mid-Size Auto Parts Manufacturer",
    challenge:
      "A mid-size auto parts manufacturer with 800 employees and five warehouses was operating with entirely manual, paper-based processes for production planning, inventory management, and order fulfillment. Data lived in disconnected spreadsheets across departments, creating costly errors, shipment delays, and a near-complete lack of real-time operational visibility. The leadership team had no reliable way to understand inventory levels, production throughput, or order status without physically checking each department.",
    solution:
      "PRORYN TECH designed and delivered a custom ERP system built on the PRORYN BusinessOS platform, integrating production planning, multi-warehouse inventory management, purchase order automation, sales order processing, billing, and management reporting into a single unified system. The solution was deployed on AWS with a high-availability architecture and a mobile-friendly interface for warehouse staff. We also provided comprehensive staff training and a phased go-live plan to minimize operational disruption.",
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
    ],
    outcomes: [
      "40% reduction in operational costs",
      "3× faster order processing",
      "99.9% system uptime since go-live",
      "60% reduction in manual data entry",
      "Real-time inventory visibility across 5 warehouses",
    ],
  },
  {
    id: "healthcare-portal",
    industry: "Healthcare",
    title:
      "Digital Patient Management for a 500-Bed Multi-Specialty Hospital",
    challenge:
      "A 500-bed multi-specialty hospital was managing patient records entirely on paper, causing significant delays in patient registration, medical history retrieval, and appointment scheduling. Clinical staff lost an average of 45 minutes per shift locating paper records, and appointment booking required patients to visit the hospital in person. The hospital also faced growing compliance pressure to digitize records under national healthcare data standards.",
    solution:
      "PRORYN TECH built a fully HIPAA-compliant digital health platform encompassing electronic patient records, online appointment booking, doctor availability management, lab result integration, and a patient-facing mobile portal. The system was deployed on AWS with end-to-end encryption, role-based access controls, and full audit logging to meet regulatory requirements. We migrated and digitized the hospital's existing paper records database during a structured data migration programme.",
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    outcomes: [
      "70% reduction in patient wait times",
      "50,000+ patient records successfully digitized",
      "35% increase in appointment bookings within 90 days",
      "99.8% data accuracy rate post-migration",
      "Fully HIPAA compliant from day one",
    ],
  },
  {
    id: "retail-automation",
    industry: "Retail",
    title: "AI-Powered Retail Management for a National Retail Chain",
    challenge:
      "A national retail chain operating 120 stores across four regions was struggling with disconnected POS systems, manual inventory counting, and a complete absence of real-time analytics. Store managers spent hours each week compiling spreadsheet reports that were already outdated by the time leadership reviewed them. Stockouts were frequent, leading to lost revenue, while overstocking in other categories created significant working capital inefficiency.",
    solution:
      "PRORYN TECH delivered a unified retail management platform that integrated all 120 stores' POS systems, automated inventory replenishment using AI demand forecasting, and provided a real-time analytics dashboard accessible to both store managers and executive leadership. An AI-powered customer loyalty engine was integrated to personalize promotions and improve repeat purchase rates. The platform was built on Microsoft Azure for regional cloud coverage and deployed with zero store downtime using a phased rollout strategy.",
    technologies: [
      "Python",
      "React",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Azure",
      "RabbitMQ",
    ],
    outcomes: [
      "28% increase in sales revenue within 6 months",
      "45% reduction in stockouts across all stores",
      "Real-time analytics across all 120 stores",
      "15% improvement in customer retention through loyalty personalization",
      "3-month ROI achieved ahead of projections",
    ],
  },
];
