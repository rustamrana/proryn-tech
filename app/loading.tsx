// Next.js App Router loading.tsx
// This renders during route segment loading — keep it minimal so it doesn't block content

export default function Loading() {
  return (
    // Thin branded progress bar at top only — no fullscreen overlay
    <div className="fixed top-0 left-0 z-[300] h-[3px] w-full overflow-hidden" aria-hidden="true">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-secondary to-brand-accent"
        style={{ animation: 'loadingBar 1s ease-in-out infinite' }}
      />
      <style>{`
        @keyframes loadingBar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
