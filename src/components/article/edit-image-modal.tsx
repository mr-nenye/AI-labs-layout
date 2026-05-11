"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Mic, Send, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const VARIATIONS = [
  "/icons/style-immersive.jpg",
  "/icons/style-minimal.jpg",
  "/icons/style-brutalism.jpg",
];

const TYPES = ["Vector", "Photo", "3D rendered"];
const STYLES = ["Realistic", "Cartoon", "Anime", "Watercolor"];

type Props = { open: boolean; onClose: () => void };

export function EditImageModal({ open, onClose }: Props) {
  const [type, setType] = useState("Vector");
  const [activeStyle, setActiveStyle] = useState("Realistic");
  const [variation, setVariation] = useState(0);
  const [prompt, setPrompt] = useState("");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[1080px] w-[95vw] max-h-[90vh] p-0 border-0 bg-transparent shadow-none overflow-visible"
      >
        <DialogTitle className="sr-only">Edit image</DialogTitle>
        <div className="grid grid-cols-[1.4fr_1fr] gap-4 max-md:grid-cols-1">
          <div className="bg-[#fdfaf3] rounded-2xl overflow-hidden flex items-center justify-center min-h-[480px] relative">
            <div className="absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 240 320" className="w-2/3 max-w-[280px]" aria-hidden>
                <defs>
                  <linearGradient id="vine" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2748b8" />
                    <stop offset="1" stopColor="#0a2a8a" />
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="220" height="300" fill="#fdfaf3" stroke="#0a2a8a" strokeWidth="1.5" rx="6" />
                {Array.from({ length: 18 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={30 + (i % 5) * 40 + (Math.sin(i) * 6)}
                    cy={40 + Math.floor(i / 5) * 60 + (Math.cos(i) * 6)}
                    rx="12"
                    ry="20"
                    fill="url(#vine)"
                    opacity={0.7 + (i % 3) * 0.1}
                    transform={`rotate(${i * 17} ${30 + (i % 5) * 40} ${40 + Math.floor(i / 5) * 60})`}
                  />
                ))}
                {Array.from({ length: 24 }).map((_, i) => (
                  <circle key={`c-${i}`} cx={20 + (i % 8) * 26} cy={25 + Math.floor(i / 8) * 80} r="3" fill="#2748b8" opacity="0.6" />
                ))}
              </svg>
            </div>
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider text-ink-mute bg-white/80 px-2 py-1 rounded-md">
              Preview
            </span>
          </div>

          <div className="bg-surface rounded-2xl p-6 flex flex-col gap-5 min-h-[480px] relative">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-ink">Edit image</h3>
              <button
                type="button"
                onClick={onClose}
                className="size-7 rounded-full grid place-items-center text-ink-mute hover:bg-canvas transition-colors"
                aria-label="Close"
              >
                <X className="size-4" />
              </button>
            </div>

            <section>
              <label className="text-xs font-medium text-ink-mute mb-1.5 block">Type</label>
              <div className="flex flex-wrap gap-1.5">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      type === t
                        ? "bg-ink text-white"
                        : "bg-canvas text-ink-2 hover:bg-line-soft"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-xs font-medium text-ink-mute mb-2 block">Art Style</label>
              <div className="grid grid-cols-3 gap-2">
                {VARIATIONS.map((v, i) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVariation(i)}
                    className={cn(
                      "rounded-lg overflow-hidden border-2 transition-all aspect-[4/3]",
                      variation === i ? "border-accent-blue" : "border-transparent hover:border-line-chip"
                    )}
                  >
                    <Image src={v} alt="" width={120} height={90} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            <section>
              <label className="text-xs font-medium text-ink-mute mb-1.5 block">Style</label>
              <div className="flex flex-wrap gap-1.5">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setActiveStyle(s)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      activeStyle === s
                        ? "bg-ink text-white"
                        : "bg-canvas text-ink-2 hover:bg-line-soft"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            <div className="mt-auto bg-canvas rounded-xl p-3 flex items-center gap-2">
              <Sparkles className="size-4 text-accent-blue shrink-0" />
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe a change…"
                className="flex-1 bg-transparent text-sm border-0 outline-none placeholder:text-ink-mute"
              />
              <button
                type="button"
                aria-label="Voice"
                className="size-7 rounded-full bg-surface grid place-items-center text-ink-2 hover:bg-line-soft"
              >
                <Mic className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="Send"
                disabled={!prompt.trim()}
                className="size-7 rounded-full bg-ink text-white grid place-items-center disabled:opacity-40 transition-transform hover:scale-105"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
