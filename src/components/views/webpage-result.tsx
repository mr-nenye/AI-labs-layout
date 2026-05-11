"use client";

import { useState } from "react";
import {
  RotateCw, Download, ThumbsUp, ThumbsDown, RotateCcw, Check, X, Trash2,
  Clock, Sparkles,
} from "lucide-react";
import { PromptComposer } from "@/components/composer/prompt-composer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Revision, WebpageStyleId } from "@/lib/types";
import { WEBPAGE_STYLES } from "@/lib/styles";

type Props = { initialPrompt: string; style: WebpageStyleId | null; onReset: () => void };

const BULLETS = [
  "Sticky nav with blur backdrop and subtle shadow",
  "Hero with animated dashboard preview, floating stat badges, sparkline chart, and staggered fade-up animations",
  "Logos bar for social proof",
  "Features in alternating two-column layouts with inline mini-visuals (sparkline + security card)",
  '6-card Benefits grid with hover-reveal top-border animation',
  "4-step How It Works with contextual progress line",
  '3-tier Pricing with a scaled "Most Popular" card',
  "6 Testimonials with avatar initials and star ratings",
  "FAQ with smooth accordion open/close",
  "CTA banner with dark gradient",
  "Footer with social icons, column links, and compliance badges",
];

function PreviewSurface({ inset = false }: { inset?: boolean }) {
  return (
    <div className={cn("bg-gradient-to-b from-[#f1f4ff] to-[#e9eeff] rounded-xl border border-line-chip overflow-hidden", inset ? "" : "shadow-sm")}>
      <div className="flex items-center justify-between px-6 py-4 bg-surface/80 backdrop-blur border-b border-line-chip">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-accent-blue grid place-items-center text-white text-[10px] font-bold">N</div>
          <span className="font-semibold text-sm text-ink">Nexus</span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-xs text-ink-2">
          <span>Features</span>
          <span>How It Works</span>
          <span>Pricing</span>
          <span>FAQ</span>
          <span>Sign in</span>
        </div>
        <button className="text-xs bg-ink text-white px-3 py-1.5 rounded-md font-medium">Get Started Free</button>
      </div>

      <div className="px-6 pt-10 pb-8 text-center">
        <div className="inline-block text-[10px] bg-accent-blue/10 text-accent-blue rounded-full px-2 py-0.5 mb-3 font-medium">
          NEW · AI-powered portfolio insights are live
        </div>
        <h3 className="text-[28px] leading-[1.1] font-bold text-ink mb-1">
          Your money,
          <br />
          <span className="italic font-serif text-accent-blue">intelligently</span> managed
        </h3>
        <p className="text-xs text-ink-2 max-w-md mx-auto mt-3 leading-relaxed">
          Nexus brings together banking, investing, and financial planning in one beautifully simple platform designed for modern life.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <button className="text-[11px] bg-ink text-white px-4 py-2 rounded-md font-medium">Start for free →</button>
          <button className="text-[11px] bg-[#eef1ff] text-accent-blue px-4 py-2 rounded-md font-medium">See how it works</button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-ink rounded-xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between mb-3 text-[10px] text-white/60">
            <span>Overview</span>
            <span>Last 30 days</span>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {[
              { l: "Net Worth", v: "$248,391", g: "+10.4%" },
              { l: "Monthly Income", v: "$9,200", g: "+8 400" },
              { l: "Savings Rate", v: "38.2%", g: "+3%" },
              { l: "Credit Score", v: "794", g: "+ 4 pts" },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 rounded-md p-2.5">
                <div className="text-[9px] text-white/60 mb-1">{s.l}</div>
                <div className="text-sm font-semibold">{s.v}</div>
                <div className="text-[9px] text-[#4ed884]">{s.g}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-md p-3 h-20 flex items-end gap-1">
              {[40, 60, 80, 50, 70, 90, 65, 75, 95, 55].map((h, i) => (
                <div key={i} className="flex-1 bg-accent-blue/60 rounded-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="bg-white/5 rounded-md p-3 grid place-items-center">
              <div className="size-14 rounded-full border-[6px] border-accent-blue/60 border-t-[#4ed884]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebpageResult({ initialPrompt, style, onReset }: Props) {
  const activeStyle = WEBPAGE_STYLES.find((s) => s.id === style) ?? WEBPAGE_STYLES[1];
  const [revisions, setRevisions] = useState<Revision[]>([
    { role: "user", text: initialPrompt },
    {
      role: "assistant",
      text: `Here's your **Nexus Finance** landing page — a fully self-contained HTML file with every section built out.\n\nHere's what's included:`,
    },
  ]);
  const [followup, setFollowup] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  function handleFollowup() {
    if (!followup.trim()) return;
    setRevisions((r) => [
      ...r,
      { role: "user", text: followup },
      { role: "assistant", text: "Updated. Click Preview to see the live page." },
    ]);
    setFollowup("");
  }

  return (
    <div className="grid grid-cols-[360px_1fr] h-full animate-fade-in max-md:grid-cols-1">
      <aside className="border-r border-line bg-canvas flex flex-col min-h-0 max-md:hidden">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
          <div className="inline-flex items-center gap-1.5 self-start text-[11px] text-ink-mute font-medium">
            <Sparkles className="size-3" />
            Thought for 10 seconds <Clock className="size-3" />
          </div>
          {revisions.map((r, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl px-3.5 py-3 text-[13px] leading-relaxed animate-fade-in",
                r.role === "user"
                  ? "bg-[#eef1ff] text-ink self-end max-w-[85%] border border-[#eef1ff]"
                  : "bg-surface text-ink-2 border border-line"
              )}
              dangerouslySetInnerHTML={{
                __html: r.text
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>')
                  .replace(/\n/g, "<br/>"),
              }}
            />
          ))}
          <ul className="bg-surface border border-line rounded-xl px-4 py-3 text-[12px] text-ink-2 space-y-1.5 list-disc list-inside">
            {BULLETS.map((b) => (
              <li key={b} className="leading-snug">{b}</li>
            ))}
          </ul>
          <p className="text-[11px] text-ink-mute leading-snug px-2 mt-1">
            <strong className="text-ink-2 font-medium">Design choices:</strong> DM Serif Display for editorial headings paired with DM Sans for clean body text, a confident blue-on-navy palette with green accents for positive indicators, scroll-triggered reveal animations, and a real interactive dashboard mockup in the Hero.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button className="text-ink-mute hover:text-ink-2 transition-colors" aria-label="Delete">
              <Trash2 className="size-3.5" />
            </button>
            <button className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#e54545]">
              <RotateCw className="size-3" /> Restore this version
            </button>
          </div>
        </div>
        <PromptComposer
          value={followup}
          onChange={setFollowup}
          onSubmit={handleFollowup}
          placeholder="Ask anything or describe what to create"
          className="w-full rounded-none"
        />
      </aside>

      <div className="overflow-y-auto p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-medium text-ink">Nexus Finance landing page</span>
            <span className="text-ink-mute">·</span>
            <span className="text-ink-mute text-xs">Style: {activeStyle.label}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-[#eef1ff] text-accent-blue hover:bg-[#dde3ff]"
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
        </div>

        <PreviewSurface />

        <div className="sticky bottom-0 -mx-6 px-6 py-4 flex justify-between items-center bg-gradient-to-t from-surface from-50% to-transparent">
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="sm"><Download className="size-3" /> Download</Button>
            <Button variant="ghost" size="icon"><ThumbsUp className="size-3.5" /></Button>
            <Button variant="ghost" size="icon"><ThumbsDown className="size-3.5" /></Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onReset}>
              <RotateCcw className="size-3" /> Reset to default
            </Button>
            <Button size="sm" className="bg-accent-blue hover:bg-[#1f3478]">
              <Check className="size-3" /> Apply updates
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[1100px] w-[95vw] max-h-[90vh] overflow-y-auto bg-canvas/95 backdrop-blur p-6 border-0 shadow-xl rounded-2xl"
        >
          <DialogTitle className="sr-only">Webpage preview</DialogTitle>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-ink-2">Preview: Nexus Finance landing page</h3>
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="size-8 rounded-full bg-white grid place-items-center hover:bg-canvas transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>
          <PreviewSurface />
        </DialogContent>
      </Dialog>
    </div>
  );
}
