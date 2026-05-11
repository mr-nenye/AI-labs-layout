import PromptComposer from "../components/PromptComposer";

const STYLES = [
  { id: "freestyle", label: "Freestyle" },
  { id: "summarised", label: "Summarised" },
  { id: "academic", label: "Academic" },
  { id: "minimal", label: "Minimal" },
];

function StyleThumb({ id }) {
  if (id === "freestyle") {
    return (
      <div className="thumb thumb-freestyle">
        <span className="thumb-glow" />
        <span className="panel" />
        <span className="panel" style={{ opacity: 0.7 }} />
        <span className="panel" style={{ opacity: 0.5 }} />
        <span className="panel" style={{ opacity: 0.15 }} />
      </div>
    );
  }
  if (id === "summarised") {
    return (
      <div className="thumb thumb-summarised">
        <span className="thumb-glow" />
        <span className="mini-bar" style={{ width: 94, opacity: 0.1 }} />
        <span className="mini-bar" style={{ width: 126, opacity: 0.3 }} />
        <div className="thumb-doc">
          <span className="dots-row" />
          <span className="line" style={{ width: 76 }} />
          <span className="line" style={{ width: 117 }} />
          <span className="line" style={{ width: 68 }} />
          <span className="line" style={{ width: 96 }} />
          <span className="line" style={{ width: 96 }} />
        </div>
      </div>
    );
  }
  if (id === "academic") {
    return (
      <div className="thumb thumb-academic">
        <span className="thumb-glow" />
        <div className="thumb-window-academic">
          <span className="dots-row" />
          <span className="line dark" style={{ width: 40 }} />
          <span className="line" style={{ width: "100%" }} />
          <span className="line" style={{ width: "100%" }} />
          <span className="line" style={{ width: 77 }} />
        </div>
      </div>
    );
  }
  return (
    <div className="thumb thumb-minimal">
      <span className="thumb-glow" />
      <span className="thumb-window-back back-1" />
      <span className="thumb-window-back back-2" />
      <div className="thumb-doc-min">
        <div className="doc-min-row">
          <span className="avatar-dot" />
          <span className="line" style={{ width: 32 }} />
        </div>
        <span className="line" style={{ width: "100%" }} />
        <span className="line" style={{ width: "100%" }} />
        <span className="line" style={{ width: 61 }} />
      </div>
    </div>
  );
}

export default function SlidesView({ prompt, setPrompt, style, setStyle, onSubmit }) {
  return (
    <div className="main-inner fade-in">
      <div className="greeting">
        <h1>Good morning, James.</h1>
        <p>How can I help you today?</p>
      </div>

      <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={onSubmit}
        placeholder="Turn your course into stunning slides"
      />

      <div className="style-picker">
        <div className="style-divider"><span>Select style</span></div>
        <div className="style-grid">
          {STYLES.map((s) => (
            <button
              key={s.id}
              className={`style-card ${style === s.id ? "selected" : ""}`}
              onClick={() => setStyle(s.id)}
            >
              <StyleThumb id={s.id} />
              <span className="style-card-label">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
