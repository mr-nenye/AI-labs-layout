import PromptComposer from "../components/PromptComposer";

const EXAMPLES = [
  { n: "#1", desc: "Create a clean SaaS landing page with hero, 3 features, testimonial, and CTA." },
  { n: "#2", desc: "Generate a minimal productivity app landing page with hero, benefits, and strong CTA." },
  { n: "#3", desc: "Create a modern tech startup landing page with hero, features, and how-it-works section." },
  { n: "#4", desc: "Generate a simple AI platform landing page with hero, features, and final CTA." },
];

export default function WebpageView({ prompt, setPrompt, onSubmit }) {
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
        toolbarExtras={
          <button className="toolbar-extra">
            <img src="/icons/paint-board.svg" alt="" />
            <span>Style</span>
            <img src="/icons/chevron-down.svg" alt="" style={{ width: 8, height: 4 }} />
          </button>
        }
      />

      <div className="examples">
        <div className="examples-divider"><span>Example prompts</span></div>
        <div className="example-grid">
          {EXAMPLES.map((ex) => (
            <button
              key={ex.n}
              className="example-card"
              onClick={() => setPrompt(ex.desc)}
            >
              <div className="example-card-title">Example {ex.n}</div>
              <div className="example-card-desc">{ex.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
