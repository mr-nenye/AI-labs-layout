"use client";

import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { NAV_ITEMS } from "@/lib/nav";
import type { ModeId } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  active: ModeId | null;
  collapsed: boolean;
  onChange: (id: ModeId) => void;
};

export function Sidebar({ active, collapsed, onChange }: Props) {
  return (
    <aside
      className={cn(
        "border-r border-line bg-surface p-6 flex flex-col gap-0 overflow-y-auto transition-[width] duration-200",
        collapsed ? "w-[72px] items-center" : "w-[270px]"
      )}
    >
      {NAV_ITEMS.map(({ id, label, icon }) => {
        const isActive = active === id;
        const triggerClasses = cn(
          "flex items-center gap-3 p-0.5 rounded-xl text-left transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none",
          collapsed ? "w-auto" : "w-[222px]",
          isActive ? "bg-rail" : "hover:bg-black/[0.02]"
        );
        const contents = (
          <>
            <span
              className={cn(
                "grid place-items-center p-2 bg-surface rounded-[10px] shrink-0",
                isActive && "shadow-card"
              )}
            >
              <Image src={icon} alt="" width={18} height={18} />
            </span>
            {!collapsed && (
              <span
                className={cn(
                  "text-sm font-medium leading-6",
                  isActive ? "text-ink" : "text-ink-mute"
                )}
              >
                {label}
              </span>
            )}
          </>
        );

        if (collapsed) {
          return (
            <Tooltip key={id}>
              <TooltipTrigger
                onClick={() => onChange(id)}
                aria-current={isActive ? "page" : undefined}
                className={triggerClasses}
              >
                {contents}
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          );
        }

        return (
          <button
            type="button"
            key={id}
            onClick={() => onChange(id)}
            aria-current={isActive ? "page" : undefined}
            className={triggerClasses}
          >
            {contents}
          </button>
        );
      })}
    </aside>
  );
}
