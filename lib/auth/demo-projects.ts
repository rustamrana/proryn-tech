/**
 * Mock project data for the Client Portal demo.
 */

export type ProjectStatus = 'Active' | 'Completed' | 'On Hold';
export type MilestoneStatus = 'completed' | 'in-progress' | 'pending';

export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  date: string;
}

export interface Deliverable {
  id: string;
  name: string;
  type: string; // e.g. 'PDF', 'ZIP', 'DOCX'
  size: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number; // 0-100
  description: string;
  startDate: string;
  endDate: string | null;
  milestones: Milestone[];
  deliverables: Deliverable[];
}

export const demoProjects: Project[] = [
  {
    id: 'PRJ-2024-001',
    name: 'Enterprise ERP System',
    client: 'Acme Technologies',
    status: 'Active',
    progress: 65,
    description:
      'Full-scale ERP implementation with modules for inventory, HR, finance, and supply chain management.',
    startDate: '2024-01-15',
    endDate: null,
    milestones: [
      { id: 'm1', title: 'Requirements & Discovery', status: 'completed', date: '2024-02-01' },
      { id: 'm2', title: 'UI/UX Design Approval', status: 'completed', date: '2024-02-28' },
      { id: 'm3', title: 'Core Module Development', status: 'completed', date: '2024-04-15' },
      { id: 'm4', title: 'Integration & API Layer', status: 'in-progress', date: '2024-06-01' },
      { id: 'm5', title: 'UAT & Quality Assurance', status: 'pending', date: '2024-07-15' },
      { id: 'm6', title: 'Production Deployment', status: 'pending', date: '2024-08-30' },
    ],
    deliverables: [
      { id: 'd1', name: 'Requirements Document v2.1', type: 'PDF', size: '2.4 MB' },
      { id: 'd2', name: 'UI Design Mockups', type: 'ZIP', size: '18.7 MB' },
      { id: 'd3', name: 'API Documentation', type: 'PDF', size: '1.1 MB' },
    ],
  },
  {
    id: 'PRJ-2024-002',
    name: 'AI-Powered Analytics Dashboard',
    client: 'Acme Technologies',
    status: 'Active',
    progress: 40,
    description:
      'Real-time business intelligence dashboard with predictive analytics, ML-driven insights, and automated reporting.',
    startDate: '2024-03-10',
    endDate: null,
    milestones: [
      { id: 'm1', title: 'Data Architecture Design', status: 'completed', date: '2024-03-25' },
      { id: 'm2', title: 'ML Model Training', status: 'completed', date: '2024-04-20' },
      { id: 'm3', title: 'Dashboard Frontend', status: 'in-progress', date: '2024-05-30' },
      { id: 'm4', title: 'Reporting Engine', status: 'pending', date: '2024-07-01' },
      { id: 'm5', title: 'Go-Live & Monitoring', status: 'pending', date: '2024-08-15' },
    ],
    deliverables: [
      { id: 'd1', name: 'Data Architecture Blueprint', type: 'PDF', size: '3.2 MB' },
      { id: 'd2', name: 'ML Model Performance Report', type: 'DOCX', size: '890 KB' },
    ],
  },
  {
    id: 'PRJ-2023-018',
    name: 'Cloud Migration & DevOps Setup',
    client: 'Acme Technologies',
    status: 'Completed',
    progress: 100,
    description:
      'End-to-end migration of legacy infrastructure to AWS with CI/CD pipelines, containerization, and monitoring.',
    startDate: '2023-09-01',
    endDate: '2024-01-20',
    milestones: [
      { id: 'm1', title: 'Infrastructure Audit', status: 'completed', date: '2023-09-15' },
      { id: 'm2', title: 'Migration Strategy', status: 'completed', date: '2023-10-05' },
      { id: 'm3', title: 'Containerization (Docker/K8s)', status: 'completed', date: '2023-11-10' },
      { id: 'm4', title: 'CI/CD Pipeline Setup', status: 'completed', date: '2023-12-01' },
      { id: 'm5', title: 'Production Cutover', status: 'completed', date: '2024-01-10' },
      { id: 'm6', title: 'Post-Migration Support', status: 'completed', date: '2024-01-20' },
    ],
    deliverables: [
      { id: 'd1', name: 'Infrastructure Audit Report', type: 'PDF', size: '4.5 MB' },
      { id: 'd2', name: 'Migration Runbook', type: 'DOCX', size: '1.8 MB' },
      { id: 'd3', name: 'CI/CD Pipeline Configs', type: 'ZIP', size: '256 KB' },
      { id: 'd4', name: 'Final Handoff Package', type: 'ZIP', size: '12.3 MB' },
    ],
  },
];

// Quick stats derived from data
export const portalStats = {
  activeProjects: demoProjects.filter((p) => p.status === 'Active').length,
  completedMilestones: demoProjects
    .flatMap((p) => p.milestones)
    .filter((m) => m.status === 'completed').length,
  totalDeliverables: demoProjects.flatMap((p) => p.deliverables).length,
};
