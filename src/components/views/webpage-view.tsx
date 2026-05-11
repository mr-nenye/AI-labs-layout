"use client";

import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import { PromptComposer } from "@/components/composer/prompt-composer";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Greeting } from "./greeting";
import { WEBPAGE_STYLES } from "@/lib/styles";
import type { WebpageStyleId } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  onSubmit: () => void;
  webStyle: WebpageStyleId | null;
  setWebStyle: (s: WebpageStyleId) => void;
};

const EXAMPLES = [
  { n: "#1", desc: "Create a clean SaaS landing page with hero, 3 features, testimonial, and CTA." },
  { n: "#2", desc: "Generate a minimal productivity app landing page with hero, benefits, and strong CTA." },
  { n: "#3", desc: "Create a modern tech startup landing page with hero, features, and how-it-works section." },
  { n: "#4", desc: "Generate a simple AI platform landing page with hero, features, and final CTA." },
];

export function WebpageView({ prompt, setPrompt, onSubmit, webStyle, setWebStyle }: Props) {
  const activeStyle = WEBPAGE_STYLES.find((s) => s.id === webStyle);

  return (
    <section className="min-h-full flex flex-col items-center justify-center gap-6 p-6 animate-fade-in">
      <Greeting />
      <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={onSubmit}
        placeholder="Turn your course into stunning slides"
        toolbarExtras={
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 h-6 px-1.5 bg-canvas rounded text-[13px] text-ink-muted hover:bg-canvas/80 transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none">
              {activeStyle ? (
                <Image
                  src={activeStyle.thumb}
                  alt=""
                  width={14}
                  height={14}
                  className="rounded-sm size-3.5 object-cover"
                />
              ) : (
                <Image src="/icons/paint-board.svg" alt="" width={14} height={14} />
              )}
              <span>{activeStyle?.label ?? "Style"}</span>
              <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              sideOffset={6}
              className="w-[264px] p-1 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
            >
              {WEBPAGE_STYLES.map((s) => (
                <DropdownMenuItem
                  key={s.id}
                  onClick={() => setWebStyle(s.id)}
                  className={cn(
                    "gap-3 px-3 py-2 rounded-xl text-xs",
                    webStyle === s.id && "bg-rail font-medium"
                  )}
                >
                  <Image
                    src={s.thumb}
                    alt=""
                    width={24}
                    height={24}
                    className="size-6 rounded-xl object-cover shadow-[4px_0_12px_rgba(0,0,0,0.04)]"
                  />
                  <span className="flex-1 text-ink">{s.label}</span>
                  {webStyle === s.id && <Check className="size-3.5 text-accent-blue" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      <div className="w-[600px] max-w-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-sm font-medium text-[#535862]">Example prompts</span>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.n}
              type="button"
              onClick={() => setPrompt(ex.desc)}
              className="text-left border border-line-chip rounded-[10px] px-4 py-3.5 bg-surface hover:border-ink-mute hover:bg-canvas focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none transition-colors"
            >
              <div className="font-semibold text-[13px] text-ink mb-1">Example {ex.n}</div>
              <div className="text-xs text-ink-mute leading-snug">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
