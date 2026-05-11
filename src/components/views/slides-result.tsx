"use client";

import { useState } from "react";
import { MessageSquare, RotateCw, Download, ThumbsUp, ThumbsDown, RotateCcw, Check, X, Trash2 } from "lucide-react";
import { PromptComposer } from "@/components/composer/prompt-composer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Revision, StyleId } from "@/lib/types";

type Props = { initialPrompt: string; style: StyleId; onReset: () => void };

const STYLE_LABELS: Record<StyleId, string> = {
  freestyle: "Freestyle",
  summarised: "Summarised",
  academic: "Academic",
  minimal: "Minimal",
};

const BODY =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const SLIDES = Array.from({ length: 6 }, (_, i) => ({
  n: i + 1,
  title: "Introduction to Thermodynamics",
  body: BODY,
}));

export function SlidesResult({ initialPrompt, style, onReset }: Props) {
  const [revisions, setRevisions] = useState<Revision[]>([
    { role: "user", text: initialPrompt },
    {
      role: "assistant",
      text: `I have created a well explained 6 page slides for thermodynamics using the **${STYLE_LABELS[style]}** selected style that was selected.`,
    },
  ]);
  const [followup, setFollowup] = useState("");
  const [previewSlide, setPreviewSlide] = useState<number | null>(null);

  function handleFollowup() {
    if (!followup.trim()) return;
    setRevisions((r) => [
      ...r,
      { role: "user", text: followup },
      { role: "assistant", text: "Updated the deck. Click Preview on any slide to expand." },
    ]);
    setFollowup("");
  }

  return (
    <div className="grid grid-cols-[320px_1fr] h-full animate-fade-in max-md:grid-cols-1">
      <aside className="border-r border-line bg-canvas flex flex-col min-h-0 max-md:hidden">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5">
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
                __html: r.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink font-semibold">$1</strong>'),
              }}
            />
          ))}
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

      <div className="overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-medium text-ink">Slide Pages</h2>
          <Button variant="secondary" size="sm" className="bg-[#eef1ff] text-accent-blue hover:bg-[#dde3ff]">
            Preview
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {SLIDES.map((slide) => (
            <article
              key={slide.n}
              className="border border-line-chip rounded-2xl px-6 py-5 bg-surface group relative transition-all duration-200 hover:border-ink-mute hover:shadow-sm animate-fade-in"
              style={{ animationDelay: `${slide.n * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-ink-mute font-medium">Slide {slide.n}</span>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="size-6 grid place-items-center rounded text-ink-mute hover:bg-canvas"
                    aria-label="Comment"
                  >
                    <MessageSquare className="size-3.5" />
                  </button>
                  <button
                    className="size-6 grid place-items-center rounded text-ink-mute hover:bg-canvas"
                    aria-label="Regenerate"
                    onClick={() => setPreviewSlide(slide.n)}
                  >
                    <RotateCw className="size-3.5" />
                  </button>
                </div>
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">{slide.title}</h3>
              <p className="text-[13px] text-ink-2 leading-[1.7]">{slide.body}</p>
            </article>
          ))}
        </div>

        <div className="sticky bottom-0 -mx-6 px-6 py-4 mt-6 flex justify-between items-center bg-gradient-to-t from-surface from-50% to-transparent">
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

      <Dialog open={previewSlide !== null} onOpenChange={(o) => !o && setPreviewSlide(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[960px] w-[90vw] bg-canvas/95 backdrop-blur p-8 border-0 shadow-xl rounded-2xl"
        >
          <DialogTitle className="sr-only">Slide preview</DialogTitle>
          {previewSlide !== null && (
            <>
              <button
                type="button"
                onClick={() => setPreviewSlide(null)}
                className="absolute right-6 top-6 size-8 rounded-full bg-white grid place-items-center hover:bg-canvas transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
              <article className="bg-surface border border-line rounded-2xl px-8 py-6 shadow-sm animate-fade-in">
                <div className="text-xs text-ink-mute font-medium mb-2">Slide {previewSlide}</div>
                <h3 className="text-lg font-semibold text-ink mb-3">Introduction to Thermodynamics</h3>
                <p className="text-sm text-ink-2 leading-[1.7]">{BODY}</p>
              </article>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
