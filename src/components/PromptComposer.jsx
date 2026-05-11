import { useRef, useEffect } from "react";

export default function PromptComposer({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask anything or describe what to create",
  toolbarExtras = null,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 240) + "px";
  }, [value]);

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) onSubmit();
    }
  }

  return (
    <div className="composer-wrap">
      <div className="composer-toolbar">
        <button className="kbd-btn">
          <img src="/icons/file-add.svg" alt="" />
          <span>Add files</span>
        </button>
        {toolbarExtras}
      </div>
      <div className="composer-card">
        <textarea
          ref={ref}
          className="composer-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
        />
        <div className="composer-footer">
          <button className="enhance-btn">
            <span>Enhance prompt</span>
            <img src="/icons/ai-magic.svg" alt="" />
          </button>
          <div className="composer-actions">
            <button className="mic-btn" aria-label="Voice input">
              <img src="/icons/mic-01.svg" alt="" />
            </button>
            <button
              className="send-btn"
              onClick={onSubmit}
              disabled={!value.trim()}
              aria-label="Send"
            >
              <img src="/icons/send.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
