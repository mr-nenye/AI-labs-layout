"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold, Italic, Underline, Strikethrough, Link2, Highlighter, Type, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Pos = { top: number; left: number };

type Props = { rootRef: React.RefObject<HTMLElement | null> };

export function InlineToolbar({ rootRef }: Props) {
  const [pos, setPos] = useState<Pos | null>(null);
  const [active, setActive] = useState<Set<string>>(new Set());
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function update() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) {
        setPos(null);
        return;
      }
      const range = sel.getRangeAt(0);
      const root = rootRef.current;
      if (!root || !root.contains(range.commonAncestorContainer)) {
        setPos(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        setPos(null);
        return;
      }
      setPos({
        top: rect.top - 8 + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
      const next = new Set<string>();
      ["bold", "italic", "underline", "strikethrough"].forEach((c) => {
        try {
          if (document.queryCommandState(c)) next.add(c);
        } catch {
          // ignore
        }
      });
      setActive(next);
    }

    document.addEventListener("selectionchange", update);
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("selectionchange", update);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [rootRef]);

  function exec(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(cmd)) next.delete(cmd);
      else next.add(cmd);
      return next;
    });
  }

  if (!pos) return null;

  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label="Formatting"
      style={{ top: pos.top, left: pos.left }}
      className="fixed z-50 -translate-x-1/2 -translate-y-full bg-ink text-white rounded-lg shadow-xl flex items-center gap-0.5 px-1 py-1 animate-in fade-in-0 zoom-in-95 duration-150"
      onMouseDown={(e) => e.preventDefault()}
    >
      <ToolbarBtn label="Style" onClick={() => exec("formatBlock", "h3")}>
        <Type className="size-3.5" /> <ChevronDown className="size-3 opacity-60" />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn label="Bold" active={active.has("bold")} onClick={() => exec("bold")}>
        <Bold className="size-3.5" />
      </ToolbarBtn>
      <ToolbarBtn label="Italic" active={active.has("italic")} onClick={() => exec("italic")}>
        <Italic className="size-3.5" />
      </ToolbarBtn>
      <ToolbarBtn label="Underline" active={active.has("underline")} onClick={() => exec("underline")}>
        <Underline className="size-3.5" />
      </ToolbarBtn>
      <ToolbarBtn
        label="Strikethrough"
        active={active.has("strikethrough")}
        onClick={() => exec("strikethrough")}
      >
        <Strikethrough className="size-3.5" />
      </ToolbarBtn>
      <Divider />
      <ToolbarBtn label="Highlight" onClick={() => exec("hiliteColor", "#ffe0e0")}>
        <Highlighter className="size-3.5" />
      </ToolbarBtn>
      <ToolbarBtn
        label="Link"
        onClick={() => {
          const url = window.prompt("URL");
          if (url) exec("createLink", url);
        }}
      >
        <Link2 className="size-3.5" />
      </ToolbarBtn>
    </div>
  );
}

function ToolbarBtn({
  children,
  label,
  active,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-0.5 px-1.5 py-1 rounded text-xs transition-colors",
        active ? "bg-white/20 text-white" : "hover:bg-white/10 text-white/80"
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="w-px h-4 bg-white/15 mx-0.5" />;
}
