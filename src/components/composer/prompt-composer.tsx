"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  toolbarExtras?: ReactNode;
  className?: string;
};

export function PromptComposer({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask anything or describe what to create",
  toolbarExtras,
  className,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 240) + "px";
  }, [value]);

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSubmit();
    }
  }

  return (
    <div className={cn("bg-input-wrap rounded-xl p-[1px] pt-[10px] flex flex-col gap-[10px] w-[600px] max-w-full", className)}>
      <div className="flex items-center gap-2 px-3">
        <button
          type="button"
          className="inline-flex items-center gap-1 h-6 px-1 bg-canvas rounded text-[13px] text-ink-muted hover:bg-canvas/80 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
        >
          <Image src="/icons/file-add.svg" alt="" width={16} height={16} />
          <span>Add files</span>
        </button>
        {toolbarExtras}
      </div>
      <div
        className="bg-surface rounded-[11px] px-3 pt-[14px] pb-3 flex flex-col gap-[31px]"
        style={{ boxShadow: "var(--shadow-composer)" }}
      >
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={1}
          className="w-full border-0 outline-0 resize-none bg-transparent px-1 text-[15px] leading-6 text-ink placeholder:text-ink-soft tracking-[-0.006em] min-h-6"
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-0.5 px-1.5 py-1.5 rounded-lg text-sm font-semibold text-accent-blue hover:bg-accent-blue/5 focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
            style={{ filter: "drop-shadow(0 1px 1px rgb(10 13 20 / 0.03))" }}
          >
            <span className="px-1 leading-5">Enhance prompt</span>
            <Image src="/icons/ai-magic.svg" alt="" width={20} height={20} />
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Voice input"
              className="size-8 rounded-full bg-soft grid place-items-center p-1.5 hover:bg-line-chip focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
            >
              <Image src="/icons/mic-01.svg" alt="" width={16} height={16} />
            </button>
            <button
              type="button"
              aria-label="Send"
              onClick={onSubmit}
              disabled={!value.trim()}
              className="bg-send-bg rounded-full p-[5px] grid place-items-center transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
            >
              <Image
                src="/icons/send.svg"
                alt=""
                width={22}
                height={22}
                className="invert"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
