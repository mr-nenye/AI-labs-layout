import { useState, useEffect, useRef } from "react";
import {
  Play, Pause, SkipBack, SkipForward, Image as ImageIcon,
  VolumeX, Volume2, Subtitles, Maximize, ThumbsUp, ThumbsDown,
  Download, RotateCcw, Check, Mic,
} from "lucide-react";
import PromptComposer from "../components/PromptComposer";

const SCENES = [
  { id: "intro", name: "Intro", dur: "15s" },
  { id: "s1", name: "Scene 1", dur: "15s" },
  { id: "s2", name: "Scene 2", dur: "15s" },
  { id: "s3", name: "Scene 3", dur: "15s" },
];

const TABS = [
  { id: "scenes", label: "Scenes", icon: ImageIcon },
  { id: "voice", label: "Voice over", icon: Mic },
  { id: "accent", label: "Accent", icon: Volume2 },
];

export default function VideoResult({ initialPrompt, onReset }) {
  const [active, setActive] = useState("intro");
  const [tab, setTab] = useState("scenes");
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [followup, setFollowup] = useState("");
  const [muted, setMuted] = useState(false);
  const TOTAL = 120;
  const intervalRef = useRef(null);

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
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  function fmt(s) {
    const m = Math.floor(s / 60);
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  }

  return (
    <div className="video-result fade-in">
      <div className="video-side">
        <div className="video-tabs">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`video-tab ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        {tab === "scenes" && (
          <div className="scenes">
            {SCENES.map((s) => (
              <div
                key={s.id}
                className={`scene ${active === s.id ? "active" : ""}`}
                onClick={() => setActive(s.id)}
              >
                <div className="scene-thumb"><ImageIcon size={20} /></div>
                <div className="scene-meta">
                  <span className="scene-name">{s.name}</span>
                  <span className="scene-dur">{s.dur}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "voice" && (
          <div className="scenes">
            {["Aria", "Liam", "Sage", "Theo"].map((v) => (
              <div key={v} className="scene"><div className="scene-meta"><span className="scene-name">{v}</span><span className="scene-dur">Preview</span></div></div>
            ))}
          </div>
        )}

        {tab === "accent" && (
          <div className="scenes">
            {["US", "UK", "AU", "Neutral"].map((v) => (
              <div key={v} className="scene"><div className="scene-meta"><span className="scene-name">{v}</span><span className="scene-dur">Apply</span></div></div>
            ))}
          </div>
        )}

        <PromptComposer
          value={followup}
          onChange={setFollowup}
          onSubmit={() => setFollowup("")}
          placeholder="Ask anything or describe what to create"
        />
      </div>

      <div className="video-main">
        <div className="video-tag">{SCENES.find((s) => s.id === active)?.name}</div>
        <div className="video-stage">
          <ImageIcon size={32} />
          <div className="timecode">{fmt(time)} / {fmt(TOTAL)}</div>
        </div>

        <div className="video-controls">
          <div style={{ flex: 1 }}>
            <input
              type="range"
              min={0}
              max={TOTAL}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="video-controls">
          <div className="transport">
            <button className="transport-btn"><SkipBack size={16} /></button>
            <button className="transport-btn play" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
            </button>
            <button className="transport-btn"><SkipForward size={16} /></button>
          </div>
          <div className="transport">
            <button className="transport-btn" onClick={() => setMuted(!muted)}>
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <button className="transport-btn"><Subtitles size={16} /></button>
            <button className="transport-btn"><Maximize size={16} /></button>
          </div>
        </div>

        <div className="timeline">
          <div className="track video">
            <div className="track-clip">GenerateVideo_1.mov</div>
            <div className="track-clip">GenerateVideo_2.mov</div>
            <div className="track-clip">GenerateVideo_3.mov</div>
          </div>
          <div className="track audio">
            <div className="track-clip">♪ GenerateVideo_1.mp3</div>
            <div className="track-clip">♪ GenerateVideo_2.mp3</div>
            <div className="track-clip">♪ GenerateVideo_3.mp3</div>
          </div>
          <div className="track bg">
            <div className="track-clip">♪ Background.mp3</div>
          </div>
        </div>

        <div className="video-bottom">
          <div style={{ display: "flex", gap: 6 }}>
            <button className="tb-btn"><Download size={12} /> Download</button>
            <button className="icon-action"><ThumbsUp size={14} /></button>
            <button className="icon-action"><ThumbsDown size={14} /></button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="tb-btn" onClick={onReset}><RotateCcw size={12} /> Reset to default</button>
            <button className="tb-btn primary"><Check size={12} /> Apply updates</button>
          </div>
        </div>
      </div>
    </div>
  );
}
