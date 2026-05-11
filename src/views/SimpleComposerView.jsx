import PromptComposer from "../components/PromptComposer";

export default function SimpleComposerView({ prompt, setPrompt, onSubmit, placeholder }) {
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
        placeholder={placeholder}
      />
    </div>
  );
}
