import { useState, useRef, useEffect } from "react";
import PromptComposer from "../components/PromptComposer";

const CHIPS = [
  { id: "ratio", label: "16:9", icon: "/icons/rectangular.svg", options: ["9:16", "16:9", "1:1", "4:5"] },
  { id: "duration", label: "Duration", icon: "/icons/clock.svg", options: ["30s", "1 min", "2 min", "5 min"] },
  { id: "style", label: "Style", icon: "/icons/paint-board.svg", options: ["Cinematic", "Whiteboard", "Animated", "Documentary"] },
  { id: "voice", label: "Voice", icon: "/icons/mic-02.svg", options: ["Aria", "Liam", "Sage", "Theo"] },
  { id: "accent", label: "Accent", icon: "/icons/volume-high.svg", options: ["US", "UK", "AU", "Neutral"] },
];

function Chip({ chip, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const display = value || chip.label;

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className={`chip ${value ? "has-value" : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <img src={chip.icon} alt="" />
        <span>{display}</span>
      </button>
      {open && (
        <div className="chip-menu">
          {chip.options.map((opt) => (
            <button
              key={opt}
              className={`chip-menu-item ${value === opt ? "selected" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <span>{opt}</span>
              {value === opt && <span aria-hidden>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VideoView({ prompt, setPrompt, options, setOptions, onSubmit }) {
  return (
    <div className="main-inner fade-in">
      <div className="greeting">
        <h1>Good morning, James.</h1>
        <p>How can I help you today?</p>
      </div>

      <div className="chip-row">
        {CHIPS.map((c) => (
          <Chip
            key={c.id}
            chip={c}
            value={options[c.id]}
            onChange={(v) => setOptions({ ...options, [c.id]: v })}
          />
        ))}
      </div>

      <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={onSubmit}
        placeholder="Turn your course into stunning slides"
      />
    </div>
  );
}
