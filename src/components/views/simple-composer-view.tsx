"use client";

import { PromptComposer } from "@/components/composer/prompt-composer";
import { Greeting } from "./greeting";

type Props = {
  prompt: string;
  setPrompt: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
};

export function SimpleComposerView({ prompt, setPrompt, onSubmit, placeholder }: Props) {
  return (
    <section className="min-h-full flex flex-col items-center justify-center gap-6 p-6 animate-fade-in">
      <Greeting />
      <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={onSubmit}
        placeholder={placeholder}
      />
    </section>
  );
}
