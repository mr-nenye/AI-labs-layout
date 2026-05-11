"use client";

import { PromptComposer } from "@/components/composer/prompt-composer";
import { Separator } from "@/components/ui/separator";
import { Greeting } from "./greeting";
import { cn } from "@/lib/utils";
import type { StyleId } from "@/lib/types";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  onSubmit: () => void;
  style: StyleId;
  setStyle: (s: StyleId) => void;
};

const STYLES: { id: StyleId; label: string }[] = [
  { id: "freestyle", label: "Freestyle" },
  { id: "summarised", label: "Summarised" },
  { id: "academic", label: "Academic" },
  { id: "minimal", label: "Minimal" },
];

function ThumbFreestyle() {
  return (
    <div
      className="w-full h-[130px] rounded-xl relative overflow-hidden flex items-center gap-2 px-4 pt-3"
      style={{ background: "linear-gradient(113.82deg, rgb(20 167 184 / 0.9) 5%, rgb(66 213 230 / 0.9) 100%)" }}
    >
      <span className="absolute -top-[30px] -right-10 size-[100px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_70%)]" />
      <span className="flex-1 h-[82px] bg-white rounded-lg" />
      <span className="flex-1 h-[82px] bg-white/70 rounded-lg" />
      <span className="flex-1 h-[82px] bg-white/50 rounded-lg" />
      <span className="flex-1 h-[82px] bg-white/15 rounded-lg" />
    </div>
  );
}

function ThumbSummarised() {
  return (
    <div className="w-full h-[130px] rounded-xl relative overflow-hidden flex flex-col items-center p-[22px] gap-1.5 bg-[#f15024]">
      <span className="absolute -top-[30px] -right-10 size-[100px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_70%)]" />
      <span className="w-[94px] h-1 bg-white/10 rounded-full" />
      <span className="w-[126px] h-1 bg-white/30 rounded-full" />
      <div className="bg-white rounded-lg p-2 flex flex-col gap-1.5 w-full min-h-[60px] z-10">
        <span className="block w-[76px] h-1 rounded-full bg-line-chip" />
        <span className="block w-[117px] h-1 rounded-full bg-line-chip" />
        <span className="block w-[68px] h-1 rounded-full bg-line-chip" />
        <span className="block w-24 h-1 rounded-full bg-line-chip" />
      </div>
    </div>
  );
}

function ThumbAcademic() {
  return (
    <div className="w-full h-[130px] rounded-xl relative overflow-hidden flex flex-col items-center p-[22px] gap-1.5 bg-[#375dfb]">
      <span className="absolute -top-[30px] -right-10 size-[100px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_70%)]" />
      <div className="bg-white rounded-lg p-2 flex flex-col gap-1.5 w-full min-h-[86px] z-10">
        <span className="block w-10 h-1 rounded-full bg-ink" />
        <span className="block w-full h-1 rounded-full bg-line-chip" />
        <span className="block w-full h-1 rounded-full bg-line-chip" />
        <span className="block w-[77px] h-1 rounded-full bg-line-chip" />
      </div>
    </div>
  );
}

function ThumbMinimal() {
  return (
    <div className="w-full h-[130px] rounded-xl relative overflow-hidden flex flex-col items-stretch p-[22px] gap-2.5 bg-[#38c793]">
      <span className="absolute -top-[30px] -right-10 size-[100px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_70%)]" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 w-[138px] h-16 rounded-lg bg-white/25" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-3 w-[138px] h-16 rounded-lg bg-white/25" />
      <div className="bg-white rounded-lg p-2 flex flex-col gap-1.5 w-full z-10">
        <div className="flex items-center gap-1">
          <span className="size-[18px] rounded-full bg-gradient-to-br from-[#f59e7a] to-[#ad5a3a]" />
          <span className="block w-8 h-1 rounded-full bg-line-chip" />
        </div>
        <span className="block w-full h-1 rounded-full bg-line-chip" />
        <span className="block w-full h-1 rounded-full bg-line-chip" />
        <span className="block w-[61px] h-1 rounded-full bg-line-chip" />
      </div>
    </div>
  );
}

const THUMBS: Record<StyleId, React.FC> = {
  freestyle: ThumbFreestyle,
  summarised: ThumbSummarised,
  academic: ThumbAcademic,
  minimal: ThumbMinimal,
};

export function SlidesView({ prompt, setPrompt, onSubmit, style, setStyle }: Props) {
  return (
    <section className="min-h-full flex flex-col items-center justify-center gap-6 p-6 animate-fade-in">
      <Greeting />
      <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={onSubmit}
        placeholder="Turn your course into stunning slides"
      />
      <div className="w-[600px] max-w-full flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-sm font-medium text-[#535862]">Select style</span>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-4 w-[601px] max-w-full">
          {STYLES.map(({ id, label }) => {
            const Thumb = THUMBS[id];
            const selected = style === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setStyle(id)}
                className={cn(
                  "bg-surface border border-line-chip rounded-2xl pt-1 px-1 w-[292px] max-w-full overflow-hidden flex flex-col items-stretch text-left transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none",
                  selected && "ring-2 ring-accent-blue ring-offset-0"
                )}
                style={{ boxShadow: "0 4px 6px rgb(0 0 0 / 0.02)" }}
              >
                <Thumb />
                <span className="p-3 text-xs font-medium text-ink leading-4">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
