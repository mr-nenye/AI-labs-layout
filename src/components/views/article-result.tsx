"use client";

import { useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Type,
  Image as ImageIcon,
  ThumbsUp,
  ThumbsDown,
  Download,
  RotateCcw,
  Check,
  RotateCw,
  Trash2,
} from "lucide-react";
import { PromptComposer } from "@/components/composer/prompt-composer";
import { Button } from "@/components/ui/button";
import { InlineToolbar } from "@/components/article/inline-toolbar";
import { EditImageModal } from "@/components/article/edit-image-modal";
import { cn } from "@/lib/utils";
import type { Revision } from "@/lib/types";

type Props = { initialPrompt: string; onReset: () => void };

const INITIAL_HTML = `
  <p>
    Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    <mark style="background:#ffe0e0">magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</mark>
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
`;

const TRAILING_HTML = `
  <p>
    Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor. Proin libero feugiat tristique accumsan maecenas
    potenti ultricies. Sit amet consectetur adipiscing elit quisque faucibus ex.
  </p>
  <p>
    Aliquam nisl sodales consequat magna ante condimentum neque. Porta elementum a enim euismod quam justo lectus.
    Fames primis vulputate viverra etiam sagittis vehicula praesent dictumst.
  </p>
`;

export function ArticleResult({ initialPrompt, onReset }: Props) {
  const [revisions, setRevisions] = useState<Revision[]>([
    { role: "user", text: initialPrompt },
    {
      role: "assistant",
      text:
        "The team identified that users drop off when asked for permissions before understanding the app's value. Marcus mocked up a flow that delays the notification prompt until after the first task, and testing showed completion rates improved from 34% to 67%.",
    },
  ]);
  const [followup, setFollowup] = useState("");
  const [editImageOpen, setEditImageOpen] = useState(false);
  const editableRef = useRef<HTMLDivElement>(null);

  function handleFollowup() {
    if (!followup.trim()) return;
    setRevisions((r) => [
      ...r,
      { role: "user", text: followup },
      {
        role: "assistant",
        text:
          "Updated the section above to reflect your feedback. You can restore the previous version any time.",
      },
    ]);
    setFollowup("");
  }

  return (
    <div className="grid grid-cols-[320px_1fr] h-full min-h-0 animate-fade-in max-md:grid-cols-1">
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
            >
              {r.text}
            </div>
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

      <div className="overflow-y-auto px-9 pt-7 pb-24 bg-surface">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-line">
          <div className="flex gap-2.5 items-center">
            <Button variant="outline" size="icon" className="size-7"><ChevronLeft className="size-3.5" /></Button>
            <Button variant="outline" size="icon" className="size-7"><ChevronRight className="size-3.5" /></Button>
            <span className="text-xs text-ink-2">Header · 16px</span>
            <Button variant="outline" size="icon" className="size-7"><Type className="size-3.5" /></Button>
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

        <article>
          <h2 className="text-[22px] font-semibold mb-4 text-ink">Lorem ipsum dolor sit amet lecture Note:</h2>
          <div
            ref={editableRef}
            contentEditable
            suppressContentEditableWarning
            className="prose-article text-ink-2 leading-[1.7] text-sm space-y-3 focus:outline-none [&_p]:mb-3.5"
            dangerouslySetInnerHTML={{ __html: INITIAL_HTML }}
          />
          <InlineToolbar rootRef={editableRef} />

          <div className="my-4 rounded-[10px] h-[220px] bg-gradient-to-br from-[#d4f0c5] to-[#f5e4a3] grid place-items-center text-ink-2 text-sm relative animate-fade-in">
            <Button variant="outline" size="sm" className="absolute top-3 left-3">
              <ImageIcon className="size-3" /> Change
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="absolute top-3 left-[100px]"
              onClick={() => setEditImageOpen(true)}
            >
              <Type className="size-3" /> Edit
            </Button>
            <span className="opacity-50">Generated illustration</span>
          </div>

          <div
            className="prose-article text-ink-2 leading-[1.7] text-sm space-y-3 [&_p]:mb-3.5"
            dangerouslySetInnerHTML={{ __html: TRAILING_HTML }}
          />
        </article>

        <div className="sticky bottom-0 mt-6 pt-4 flex justify-between items-center bg-gradient-to-t from-surface from-30% to-transparent">
          <Button variant="outline" size="sm"><Download className="size-3" /> Download</Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" aria-label="Like"><ThumbsUp className="size-3.5" /></Button>
            <Button variant="ghost" size="icon" aria-label="Dislike"><ThumbsDown className="size-3.5" /></Button>
          </div>
        </div>
      </div>

      <EditImageModal open={editImageOpen} onClose={() => setEditImageOpen(false)} />
    </div>
  );
}
