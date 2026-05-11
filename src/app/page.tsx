"use client";

import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { Landing } from "@/components/views/landing";
import { SimpleComposerView } from "@/components/views/simple-composer-view";
import { SlidesView } from "@/components/views/slides-view";
import { WebpageView } from "@/components/views/webpage-view";
import { VideoView } from "@/components/views/video-view";
import { ArticleResult } from "@/components/views/article-result";
import { SlidesResult } from "@/components/views/slides-result";
import { WebpageResult } from "@/components/views/webpage-result";
import { VideoResult } from "@/components/views/video-result";
import { LoadingView } from "@/components/views/loading-view";
import { PLACEHOLDERS } from "@/lib/nav";
import type {
  ModeId,
  Status,
  StyleId,
  ViewId,
  VideoOptions,
  WebpageStyleId,
} from "@/lib/types";

export default function Home() {
  const [view, setView] = useState<ViewId>("landing");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<StyleId>("freestyle");
  const [webStyle, setWebStyle] = useState<WebpageStyleId | null>(null);
  const [options, setOptions] = useState<VideoOptions>({});
  const [status, setStatus] = useState<Status>("idle");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isLanding = view === "landing";

  function handleNav(id: ModeId) {
    setView(id);
    setStatus("idle");
    setPrompt("");
  }

  function handleSubmit() {
    if (!prompt.trim()) return;
    setStatus("loading");
    setGeneratedPrompt(prompt);
    setTimeout(() => setStatus("done"), 1200);
  }

  function handleReset() {
    setStatus("idle");
    setPrompt("");
  }

  function renderMain() {
    if (isLanding) return <Landing onSelect={handleNav} />;
    if (status === "loading") return <LoadingView />;
    if (status === "done") {
      if (view === "video")
        return <VideoResult initialPrompt={generatedPrompt} onReset={handleReset} />;
      if (view === "slides")
        return <SlidesResult initialPrompt={generatedPrompt} style={style} onReset={handleReset} />;
      if (view === "webpage")
        return <WebpageResult initialPrompt={generatedPrompt} style={webStyle} onReset={handleReset} />;
      return <ArticleResult initialPrompt={generatedPrompt} onReset={handleReset} />;
    }

    const common = { prompt, setPrompt, onSubmit: handleSubmit };
    if (view === "slides")
      return <SlidesView {...common} style={style} setStyle={setStyle} />;
    if (view === "webpage")
      return <WebpageView {...common} webStyle={webStyle} setWebStyle={setWebStyle} />;
    if (view === "video")
      return <VideoView {...common} options={options} setOptions={setOptions} />;
    return (
      <SimpleComposerView {...common} placeholder={PLACEHOLDERS[view as ModeId]} />
    );
  }

  return (
    <TooltipProvider delay={150}>
      <div className="grid grid-rows-[54px_1fr] h-screen bg-canvas">
        <Header
          canCollapse={!isLanding}
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
        />
        <div
          className={`grid min-h-0 bg-surface ${
            isLanding
              ? "grid-cols-1"
              : sidebarCollapsed
                ? "grid-cols-[72px_1fr]"
                : "grid-cols-[270px_1fr]"
          } max-md:grid-cols-1 transition-[grid-template-columns] duration-200`}
        >
          {!isLanding && (
            <Sidebar
              active={view as ModeId}
              collapsed={sidebarCollapsed}
              onChange={handleNav}
            />
          )}
          <main className="overflow-y-auto bg-surface min-w-0">{renderMain()}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
