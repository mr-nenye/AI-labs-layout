"use client";

import Image from "next/image";
import { NAV_ITEMS } from "@/lib/nav";
import type { ModeId } from "@/lib/types";

type Props = { onSelect: (id: ModeId) => void };

export function Landing({ onSelect }: Props) {
  return (
    <section className="min-h-full flex flex-col items-center justify-center gap-6 p-6 text-center animate-fade-in">
      <Image
        src="/illustrations/proceed-hero.svg"
        alt=""
        width={107}
        height={108}
        priority
      />
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[18px] font-medium text-ink-strong leading-6 tracking-[-0.006em]">
          How do you want to proceed
        </h1>
        <p className="text-sm text-ink-2 leading-6">
          Select lesson method you want to proceed with.
        </p>
      </div>
      <div className="flex gap-6 flex-wrap justify-center">
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className="bg-method rounded-md w-[180px] p-6 flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:outline-none"
          >
            <span
              className="bg-surface rounded-[10px] p-2 grid place-items-center"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <Image src={icon} alt="" width={18} height={18} />
            </span>
            <span className="text-sm font-medium text-ink leading-6">{label}</span>
          </button>
        ))}
      </div>
      <div>
        <p style={{ fontSize: "13px", color: "var(--color-ink-2)" }}>This is just a Figma x Claude code demo. This project is open source and available on GitHub. <a href="https://github.com/mr-nenye/AI-labs-layout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent-blue)", textDecoration: "underline" }}>
          <span><b>GitHub</b></span>
        </a></p>
        <p style={{ fontSize: "13px",  color: "var(--color-ink-2)"  }}> and the figma link is <a href="https://www.figma.com/design/WkMuDfnNsBlBjwKs3FdKT9/Case-studies?node-id=2-7&t=NcMX8uvFshoGa66a-1" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent-blue)", textDecoration: "underline" }}><b>here</b></a>.</p>
      </div>
    </section>
  );
}
