"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  canCollapse: boolean;
  onToggleSidebar: () => void;
};

export function Header({ canCollapse, onToggleSidebar }: Props) {
  return (
    <header className="flex items-center justify-between px-8 py-[15px] border-b border-line bg-surface z-10 h-[54px]">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 h-6">
          <Image src="/icons/logomark.svg" alt="" width={24} height={24} priority />
          <Image
            src="/icons/logotype.svg"
            alt="Logoipsum"
            width={100}
            height={18}
            className="h-[18px] w-[100px] object-contain"
            priority
          />
        </div>
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          disabled={!canCollapse}
          className="size-8 grid place-items-center rounded-lg transition-opacity disabled:opacity-40 hover:bg-canvas focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
        >
          <Image src="/icons/sidebar-toggle.svg" alt="" width={20} height={20} />
        </button>
      </div>

      <div className="flex items-center gap-[17px]">
        <span className="inline-flex items-center gap-2 p-2 rounded-full text-xs font-medium text-black">
          <Image src="/icons/flash.svg" alt="" width={18} height={18} />
          <span>
            <strong>6</strong>
            <span className="font-normal text-ink-meta">/30 days</span>
          </span>
        </span>
        <button
          type="button"
          aria-label="Notifications"
          className="size-6 grid place-items-center rounded-md hover:bg-canvas focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
        >
          <Image src="/icons/notification.svg" alt="" width={24} height={24} />
        </button>
        <button
          type="button"
          className="flex items-center gap-[10px] rounded-full focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
        >
          <Avatar className="size-10">
            <AvatarImage src="/avatar/james.png" alt="James Vendi" />
            <AvatarFallback>JV</AvatarFallback>
          </Avatar>
          <span className="flex flex-col items-start gap-1 leading-none">
            <span className="text-xs font-medium text-black">James Vendi</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-ink-tier">
              <Image src="/icons/verified.svg" alt="" width={13} height={13} />
              Master
            </span>
          </span>
          <Image
            src="/icons/chevron-down.svg"
            alt=""
            width={8}
            height={4}
            className="opacity-60"
          />
        </button>
      </div>
    </header>
  );
}
