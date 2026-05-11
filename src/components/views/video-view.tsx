"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { PromptComposer } from "@/components/composer/prompt-composer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Greeting } from "./greeting";
import { cn } from "@/lib/utils";
import { VIDEO_STYLE_OPTIONS, VIDEO_VOICE_OPTIONS } from "@/lib/styles";
import type { VideoOptions } from "@/lib/types";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  onSubmit: () => void;
  options: VideoOptions;
  setOptions: (o: VideoOptions) => void;
};

type Swatch = { id: string; label: string; swatch: string };
type ChipDef = {
  id: keyof VideoOptions;
  label: string;
  icon: string;
  options: string[] | Swatch[];
};

const CHIPS: ChipDef[] = [
  { id: "ratio", label: "Aspect ratio", icon: "/icons/rectangular.svg", options: ["9:16", "16:9", "1:1", "4:5"] },
  { id: "duration", label: "Duration", icon: "/icons/clock.svg", options: ["30s", "1 min", "2 min", "5 min"] },
  { id: "style", label: "Style", icon: "/icons/paint-board.svg", options: VIDEO_STYLE_OPTIONS },
  { id: "voice", label: "Voice", icon: "/icons/mic-02.svg", options: VIDEO_VOICE_OPTIONS },
  { id: "accent", label: "Accent", icon: "/icons/volume-high.svg", options: ["US", "UK", "AU", "Neutral"] },
];

function hasSwatch(opt: string | Swatch): opt is Swatch {
  return typeof opt !== "string";
}

function findSwatch(options: ChipDef["options"], value: string | undefined): Swatch | null {
  if (!value) return null;
  const match = options.find((o) => hasSwatch(o) && o.label === value);
  return match && hasSwatch(match) ? match : null;
}

export function VideoView({ prompt, setPrompt, onSubmit, options, setOptions }: Props) {
  return (
    <section className="min-h-full flex flex-col items-center justify-center gap-6 p-6 animate-fade-in">
      <Greeting />
      <div className="flex gap-2 w-[600px] max-w-full flex-wrap">
        {CHIPS.map((chip) => {
          const value = options[chip.id];
          const isActive = !!value;
          const swatch = findSwatch(chip.options, value);
          return (
            <DropdownMenu key={chip.id}>
              <DropdownMenuTrigger
                className={cn(
                  "inline-flex items-center gap-2 px-3 py-2 border rounded-[10px] text-sm font-medium leading-5 transition-all duration-150 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none hover:scale-[1.02]",
                  isActive
                    ? "border-accent-blue bg-[#eef1ff] text-accent-blue shadow-[0_0_0_3px_rgb(46_72_152/0.06)]"
                    : "border-line-chip text-ink-3 hover:border-ink-mute"
                )}
              >
                {swatch ? (
                  <span
                    className="size-[18px] rounded-full shrink-0 shadow-[0_1px_3px_rgb(0_0_0/0.15)]"
                    style={{ background: swatch.swatch }}
                  />
                ) : (
                  <Image src={chip.icon} alt="" width={18} height={18} />
                )}
                <span>{value ?? chip.label}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="min-w-[180px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
              >
                {chip.options.map((opt) => {
                  const label = hasSwatch(opt) ? opt.label : opt;
                  const selected = value === label;
                  return (
                    <DropdownMenuItem
                      key={label}
                      onClick={() => setOptions({ ...options, [chip.id]: label })}
                      className={cn(
                        "justify-between gap-3",
                        selected && "bg-rail font-medium"
                      )}
                    >
                      <span className="flex items-center gap-2.5">
                        {hasSwatch(opt) && (
                          <span
                            className="size-6 rounded-full shrink-0 shadow-[0_2px_6px_rgb(0_0_0/0.08)]"
                            style={{ background: opt.swatch }}
                          />
                        )}
                        <span>{label}</span>
                      </span>
                      {selected && <Check className="size-3.5 text-accent-blue" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        })}
      </div>
      <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={onSubmit}
        placeholder="Turn your course into stunning slides"
      />
    </section>
  );
}
