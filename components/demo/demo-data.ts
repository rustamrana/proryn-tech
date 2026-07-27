export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  label: string;
  description: string;
}

export interface DemoStepData {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  hotspots: Hotspot[];
}

export const businessOSSteps: DemoStepData[] = [
  {
    id: 'dashboard',
    title: 'Unified Dashboard',
    description:
      'Get a 360° view of your business operations in one place. Monitor KPIs, track team performance, and spot trends instantly.',
    icon: 'LayoutDashboard',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    hotspots: [
      {
        id: 'dash-kpi',
        x: 20,
        y: 30,
        label: 'Live KPIs',
        description:
          'Real-time metrics update every 30 seconds — revenue, active users, conversion rates, and more.',
      },
      {
        id: 'dash-alerts',
        x: 75,
        y: 25,
        label: 'Smart Alerts',
        description:
          'AI-powered anomaly detection sends proactive alerts before issues become problems.',
      },
      {
        id: 'dash-widgets',
        x: 50,
        y: 70,
        label: 'Custom Widgets',
        description:
          'Drag-and-drop widget builder lets every team member customize their view.',
      },
    ],
  },
  {
    id: 'crm',
    title: 'Smart CRM',
    description:
      'Manage leads, customers, and sales pipeline with AI insights. Automate follow-ups and never miss a deal.',
    icon: 'Users',
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    hotspots: [
      {
        id: 'crm-pipeline',
        x: 25,
        y: 40,
        label: 'Visual Pipeline',
        description:
          'Drag deals across stages with a Kanban view. Set automated triggers for each stage transition.',
      },
      {
        id: 'crm-scoring',
        x: 70,
        y: 30,
        label: 'AI Lead Scoring',
        description:
          'Machine learning model scores every lead based on engagement, fit, and intent signals.',
      },
      {
        id: 'crm-comms',
        x: 50,
        y: 75,
        label: 'Unified Inbox',
        description:
          'All emails, calls, and chats with a contact in one timeline — no context switching.',
      },
    ],
  },
  {
    id: 'projects',
    title: 'Project Management',
    description:
      'Plan, track, and deliver projects with Kanban boards, Gantt charts, and resource allocation tools.',
    icon: 'FolderKanban',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    hotspots: [
      {
        id: 'proj-gantt',
        x: 30,
        y: 35,
        label: 'Gantt Charts',
        description:
          'Visualize timelines, dependencies, and critical paths with interactive Gantt views.',
      },
      {
        id: 'proj-collab',
        x: 65,
        y: 55,
        label: 'Team Collaboration',
        description:
          'Comment threads, file sharing, and @mentions keep everyone aligned without meetings.',
      },
      {
        id: 'proj-burndown',
        x: 80,
        y: 25,
        label: 'Burndown Reports',
        description:
          'Track sprint progress and predict delivery dates with velocity-based forecasting.',
      },
    ],
  },
  {
    id: 'hr',
    title: 'HR & Payroll',
    description:
      'Automate HR processes from recruitment to payroll. Employee self-service, attendance tracking, and compliance built in.',
    icon: 'UserCog',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    hotspots: [
      {
        id: 'hr-recruit',
        x: 20,
        y: 35,
        label: 'Smart Recruitment',
        description:
          'AI-assisted resume screening, interview scheduling, and candidate ranking.',
      },
      {
        id: 'hr-payroll',
        x: 55,
        y: 65,
        label: 'Auto Payroll',
        description:
          'One-click payroll processing with tax calculations, deductions, and compliance reports.',
      },
      {
        id: 'hr-self-service',
        x: 75,
        y: 30,
        label: 'Employee Portal',
        description:
          'Leave requests, payslips, and documents — employees manage everything themselves.',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Business Intelligence',
    description:
      'Real-time analytics and AI-powered insights for data-driven decisions. Custom dashboards and automated reporting.',
    icon: 'BarChart3',
    gradient: 'from-orange-500 via-rose-500 to-pink-600',
    hotspots: [
      {
        id: 'bi-drill',
        x: 30,
        y: 40,
        label: 'Drill-Down Reports',
        description:
          'Click any metric to explore underlying data layers — from summary to individual transactions.',
      },
      {
        id: 'bi-predict',
        x: 65,
        y: 30,
        label: 'Predictive Models',
        description:
          'Built-in ML models forecast revenue, churn risk, and resource needs automatically.',
      },
      {
        id: 'bi-export',
        x: 50,
        y: 75,
        label: 'One-Click Export',
        description:
          'Generate PDF, Excel, or scheduled email reports with a single click.',
      },
    ],
  },
];
