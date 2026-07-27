'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FolderKanban,
  CheckCircle2,
  FileDown,
  Clock,
  Circle,
  ArrowRight,
  Download,
  TrendingUp,
  BarChart3,
  Calendar,
} from 'lucide-react';
import { getSession, type SessionUser } from '@/lib/auth/demo-auth';
import {
  demoProjects,
  portalStats,
  type Project,
  type ProjectStatus,
  type MilestoneStatus,
} from '@/lib/auth/demo-projects';

// ── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: ProjectStatus }) {
  const config: Record<ProjectStatus, { bg: string; text: string; dot: string }> = {
    Active: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Completed: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
    'On Hold': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  };
  const c = config[status];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-inter text-xs font-semibold ${c.bg} ${c.text}`}>
      <span className={`h-2 w-2 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
}

// ── Milestone Icon ───────────────────────────────────────────────────────────
function MilestoneIcon({ status }: { status: MilestoneStatus }) {
  if (status === 'completed')
    return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
  if (status === 'in-progress')
    return <Clock className="h-5 w-5 text-brand-secondary animate-pulse" />;
  return <Circle className="h-5 w-5 text-slate-300" />;
}

// ── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onSelect }: { project: Project; onSelect: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 mb-2">
            <StatusBadge status={project.status} />
            <span className="font-inter text-xs text-slate-400">{project.id}</span>
          </div>
          <h3 className="font-poppins text-lg font-bold text-brand-primary truncate">
            {project.name}
          </h3>
          <p className="mt-1 font-inter text-sm text-slate-500 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-inter text-xs font-medium text-slate-500">Progress</span>
          <span className="font-inter text-xs font-bold text-brand-secondary">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} />
      </div>

      {/* Meta */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="h-3.5 w-3.5" />
          <span className="font-inter text-xs">
            {new Date(project.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
          </span>
        </div>
        <button
          onClick={onSelect}
          className="inline-flex items-center gap-1 font-inter text-xs font-semibold text-brand-secondary hover:text-blue-700 transition-colors"
        >
          View Details <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ComponentType<{ className?: string }>; label: string; value: number; color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="font-poppins text-2xl font-bold text-brand-primary">{value}</p>
          <p className="font-inter text-sm text-slate-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ───────────────────────────────────────────────────────────
export default function PortalDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace('/portal/login');
      return;
    }
    setUser(session);
    setIsLoaded(true);
  }, [router]);

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-secondary/20 border-t-brand-secondary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-poppins text-2xl font-extrabold text-brand-primary sm:text-3xl">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="mt-1 font-inter text-sm text-slate-500">
          Here&apos;s an overview of your projects at {user.company}.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <StatCard icon={FolderKanban} label="Active Projects" value={portalStats.activeProjects} color="bg-brand-secondary" />
        <StatCard icon={CheckCircle2} label="Milestones Completed" value={portalStats.completedMilestones} color="bg-emerald-500" />
        <StatCard icon={FileDown} label="Deliverables" value={portalStats.totalDeliverables} color="bg-brand-accent" />
      </div>

      {/* Project Detail or Project Grid */}
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
      ) : (
        <>
          {/* Project Cards */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-poppins text-lg font-bold text-brand-primary">Your Projects</h2>
            <span className="font-inter text-sm text-slate-400">
              {demoProjects.length} total
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {demoProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Project Detail View ──────────────────────────────────────────────────────
function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 font-inter text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
      >
        ← Back to Projects
      </button>

      {/* Project Header */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge status={project.status} />
              <span className="font-inter text-sm text-slate-400">{project.id}</span>
            </div>
            <h2 className="font-poppins text-xl font-bold text-brand-primary sm:text-2xl">
              {project.name}
            </h2>
            <p className="mt-2 font-inter text-sm text-slate-500 max-w-2xl">{project.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-inter text-xs text-slate-400">Overall Progress</p>
            <p className="font-poppins text-3xl font-bold text-brand-secondary">{project.progress}%</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar value={project.progress} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Milestone Timeline */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-5 w-5 text-brand-secondary" />
            <h3 className="font-poppins text-base font-bold text-brand-primary">Milestone Timeline</h3>
          </div>
          <div className="space-y-0">
            {project.milestones.map((milestone, idx) => (
              <div key={milestone.id} className="relative flex gap-4">
                {/* Connector line */}
                {idx < project.milestones.length - 1 && (
                  <div className="absolute left-[9px] top-7 h-full w-0.5 bg-slate-100" />
                )}
                {/* Icon */}
                <div className="relative z-10 mt-0.5 shrink-0">
                  <MilestoneIcon status={milestone.status} />
                </div>
                {/* Content */}
                <div className="pb-6 min-w-0">
                  <p className={`font-inter text-sm font-semibold ${
                    milestone.status === 'completed' ? 'text-slate-700' :
                    milestone.status === 'in-progress' ? 'text-brand-secondary' : 'text-slate-400'
                  }`}>
                    {milestone.title}
                  </p>
                  <p className="font-inter text-xs text-slate-400 mt-0.5">
                    {new Date(milestone.date).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="h-5 w-5 text-brand-accent" />
            <h3 className="font-poppins text-base font-bold text-brand-primary">Deliverables</h3>
          </div>
          {project.deliverables.length === 0 ? (
            <p className="font-inter text-sm text-slate-400">No deliverables yet.</p>
          ) : (
            <div className="space-y-3">
              {project.deliverables.map((deliverable) => (
                <div
                  key={deliverable.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:bg-slate-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-inter text-sm font-semibold text-slate-700 truncate">
                      {deliverable.name}
                    </p>
                    <p className="font-inter text-xs text-slate-400">
                      {deliverable.type} · {deliverable.size}
                    </p>
                  </div>
                  <button
                    onClick={() => alert(`Demo: Download "${deliverable.name}" is not available in demo mode.`)}
                    className="ml-3 inline-flex items-center gap-1.5 rounded-lg bg-brand-secondary/10 px-3 py-2 font-inter text-xs font-semibold text-brand-secondary transition-colors hover:bg-brand-secondary/20"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
