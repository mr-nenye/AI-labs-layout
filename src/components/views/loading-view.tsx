export function LoadingView() {
  return (
    <section className="min-h-full flex flex-col items-center justify-center gap-4 p-6 animate-fade-in text-ink-mute">
      <div className="size-8 border-[3px] border-line-chip border-t-accent-blue rounded-full animate-spin-slow" />
      <div>Generating your content…</div>
    </section>
  );
}
