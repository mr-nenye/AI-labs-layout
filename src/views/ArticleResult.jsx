import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Type, Image as ImageIcon,
  ThumbsUp, ThumbsDown, Download, RotateCcw, Check,
} from "lucide-react";
import PromptComposer from "../components/PromptComposer";

export default function ArticleResult({ initialPrompt, onReset }) {
  const [revisions, setRevisions] = useState([
    { role: "user", text: initialPrompt },
    {
      role: "assistant",
      text:
        "The team identified that users drop off when asked for permissions before understanding the app's value. Marcus mocked up a flow that delays the notification prompt until after the first task, and testing showed completion rates improved from 34% to 67%.",
    },
  ]);
  const [followup, setFollowup] = useState("");

  function handleFollowup() {
    setRevisions((r) => [
      ...r,
      { role: "user", text: followup },
      {
        role: "assistant",
        text: "Updated the section above to reflect your feedback. You can restore the previous version any time from the bubble below.",
      },
    ]);
    setFollowup("");
  }

  return (
    <div className="result fade-in">
      <div className="result-side">
        <div className="revisions">
          {revisions.map((r, i) => (
            <div key={i} className={`revision-bubble ${r.role === "user" ? "user" : ""}`}>
              {r.text}
              {r.role === "assistant" && i > 1 && (
                <button className="restore">↺ Restore this version</button>
              )}
            </div>
          ))}
        </div>
        <PromptComposer
          value={followup}
          onChange={setFollowup}
          onSubmit={handleFollowup}
          placeholder="Ask anything or describe what to create"
        />
      </div>

      <div className="result-main">
        <div className="result-toolbar">
          <div className="result-toolbar-left">
            <button className="tb-btn"><ChevronLeft size={14} /></button>
            <button className="tb-btn"><ChevronRight size={14} /></button>
            <span style={{ fontSize: 12, color: "var(--ink-3)" }}>Header  ·  16px</span>
            <button className="tb-btn"><Type size={14} /></button>
          </div>
          <div className="result-toolbar-left">
            <button className="tb-btn" onClick={onReset}>
              <RotateCcw size={12} /> Reset to default
            </button>
            <button className="tb-btn primary">
              <Check size={12} /> Apply updates
            </button>
          </div>
        </div>

        <div className="result-doc">
          <h2>Lorem ipsum dolor sit amet lecture Note:</h2>
          <p>
            Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            <span className="hl-magenta"> magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</span>
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="doc-figure">
            <button className="tb-btn" style={{ position: "absolute", top: 12, left: 12 }}>
              <ImageIcon size={12} /> Change
            </button>
            <button className="tb-btn" style={{ position: "absolute", top: 12, left: 96 }}>
              <Type size={12} /> Edit
            </button>
          </div>
          <p>
            Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor. Proin libero feugiat tristique accumsan
            maecenas potenti ultricies. Sit amet consectetur adipiscing elit quisque faucibus ex. Diam enim a tempor
            dapibus vitae fringilla lacus. Aptent taciti sociosqu ad litora torquent per conubia. Eros lobortis nulla
            molestie mattis scelerisque maximus eget.
          </p>
          <p>
            Aliquam nisl sodales consequat magna ante condimentum neque. Porta elementum a enim euismod quam justo
            lectus. Fames primis vulputate viverra etiam sagittis vehicula praesent dictumst. Curabitur facilisi cubilia
            curae hac habitasse platea dictumst. Id cursus mi pretium tellus duis convallis tempus. Nisl malesuada
            lacinia integer nunc posuere ut hendrerit.
          </p>
        </div>

        <div className="result-bottom-bar">
          <button className="tb-btn"><Download size={12} /> Download</button>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="icon-action" aria-label="Like"><ThumbsUp size={14} /></button>
            <button className="icon-action" aria-label="Dislike"><ThumbsDown size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
