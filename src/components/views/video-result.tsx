"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Image as ImageIcon,
  VolumeX,
  Volume2,
  Subtitles,
  Maximize,
  ThumbsUp,
  ThumbsDown,
  Download,
  RotateCcw,
  Check,
  Mic,
} from "lucide-react";
import { PromptComposer } from "@/components/composer/prompt-composer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Props = { initialPrompt: string; onReset: () => void };

const SCENES = [
  { id: "intro", name: "Intro", dur: "15s" },
  { id: "s1", name: "Scene 1", dur: "15s" },
  { id: "s2", name: "Scene 2", dur: "15s" },
  { id: "s3", name: "Scene 3", dur: "15s" },
];

const TOTAL = 120;

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const ss = (s % 60).toString().padStart(2, "0");
  return `${m}:${ss}`;
}

export function VideoResult({ onReset }: Props) {
  const [active, setActive] = useState("intro");
  const [tab, setTab] = useState("scenes");
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [followup, setFollowup] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (t >= TOTAL) {
            setPlaying(false);
            return TOTAL;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  return (
    <div className="grid grid-cols-[320px_1fr] h-full animate-fade-in max-md:grid-cols-1">
      <aside className="border-r border-line bg-surface flex flex-col min-h-0 max-md:hidden">
        <Tabs value={tab} onValueChange={setTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="rounded-none border-b border-line bg-transparent justify-start h-auto p-0 px-4 gap-0">
            <TabsTrigger value="scenes" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-ink rounded-none px-3 py-3.5 text-[13px] gap-1.5">
              <ImageIcon className="size-3.5" /> Scenes
            </TabsTrigger>
            <TabsTrigger value="voice" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-ink rounded-none px-3 py-3.5 text-[13px] gap-1.5">
              <Mic className="size-3.5" /> Voice over
            </TabsTrigger>
            <TabsTrigger value="accent" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-ink rounded-none px-3 py-3.5 text-[13px] gap-1.5">
              <Volume2 className="size-3.5" /> Accent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scenes" className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 mt-0">
            {SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={cn(
                  "rounded-lg p-2.5 cursor-pointer text-left transition-colors border",
                  active === s.id
                    ? "border-accent-blue bg-[#eef1ff]"
                    : "border-transparent bg-canvas hover:bg-surface hover:border-line"
                )}
              >
                <div className="h-20 rounded-md bg-input-wrap grid place-items-center text-ink-mute mb-2">
                  <ImageIcon className="size-5" />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{s.name}</span>
                  <span className="text-ink-mute">{s.dur}</span>
                </div>
              </button>
            ))}
          </TabsContent>

          <TabsContent value="voice" className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 mt-0">
            {["Aria", "Liam", "Sage", "Theo"].map((v) => (
              <button
                key={v}
                type="button"
                className="rounded-lg p-2.5 text-left bg-canvas hover:bg-surface hover:border-line border border-transparent"
              >
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{v}</span>
                  <span className="text-ink-mute">Preview</span>
                </div>
              </button>
            ))}
          </TabsContent>

          <TabsContent value="accent" className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 mt-0">
            {["US", "UK", "AU", "Neutral"].map((v) => (
              <button
                key={v}
                type="button"
                className="rounded-lg p-2.5 text-left bg-canvas hover:bg-surface hover:border-line border border-transparent"
              >
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{v}</span>
                  <span className="text-ink-mute">Apply</span>
                </div>
              </button>
            ))}
          </TabsContent>
        </Tabs>

        <PromptComposer
          value={followup}
          onChange={setFollowup}
          onSubmit={() => setFollowup("")}
          placeholder="Ask anything or describe what to create"
          className="w-full rounded-none"
        />
      </aside>

      <div className="flex flex-col px-8 py-6 overflow-y-auto">
        <span className="inline-flex self-start px-3 py-1.5 rounded-md bg-canvas text-xs text-ink-2 mb-4">
          {SCENES.find((s) => s.id === active)?.name}
        </span>
        <div className="bg-canvas rounded-xl aspect-video grid place-items-center text-ink-mute mb-3 relative">
          <ImageIcon className="size-8" />
          <span className="absolute right-3 bottom-3 bg-white/90 px-2.5 py-1 rounded-md text-xs text-ink-2">
            {fmt(time)} / {fmt(TOTAL)}
          </span>
        </div>

        <Slider
          value={[time]}
          max={TOTAL}
          step={1}
          onValueChange={(v) => setTime(Array.isArray(v) ? v[0] : v)}
          className="my-2"
        />

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Skip back">
              <SkipBack className="size-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => setPlaying(!playing)}
              className="bg-ink hover:bg-ink-2 rounded-full size-9"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" fill="currentColor" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Skip forward">
              <SkipForward className="size-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute" : "Mute"}>
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Subtitles">
              <Subtitles className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Fullscreen">
              <Maximize className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="h-8 flex gap-0.5">
            <div className="flex-1 px-2.5 flex items-center text-[11px] truncate rounded bg-[#2a2a2a] text-white">GenerateVideo_1.mov</div>
            <div className="flex-1 px-2.5 flex items-center text-[11px] truncate rounded bg-[#d6d6d6] text-ink-2">GenerateVideo_2.mov</div>
            <div className="flex-1 px-2.5 flex items-center text-[11px] truncate rounded bg-[#d6d6d6] text-ink-2">GenerateVideo_3.mov</div>
          </div>
          <div className="h-8 flex gap-0.5">
            <div className="flex-1 px-2.5 flex items-center text-[11px] truncate rounded bg-[#4ed884] text-[#0a3d1f]">♪ GenerateVideo_1.mp3</div>
            <div className="flex-1 px-2.5 flex items-center text-[11px] truncate rounded bg-[#4ed884]/50 text-[#0a3d1f]">♪ GenerateVideo_2.mp3</div>
            <div className="flex-1 px-2.5 flex items-center text-[11px] truncate rounded bg-[#4ed884]/50 text-[#0a3d1f]">♪ GenerateVideo_3.mp3</div>
          </div>
          <div className="h-8">
            <div className="w-full h-full px-2.5 flex items-center text-[11px] rounded bg-[#2cc068] text-white">♪ Background.mp3</div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm">
              <Download className="size-3" /> Download
            </Button>
            <Button variant="ghost" size="icon"><ThumbsUp className="size-3.5" /></Button>
            <Button variant="ghost" size="icon"><ThumbsDown className="size-3.5" /></Button>
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
      </div>
    </div>
  );
}
