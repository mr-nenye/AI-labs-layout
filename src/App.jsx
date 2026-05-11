import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Landing from "./views/Landing";
import SimpleComposerView from "./views/SimpleComposerView";
import SlidesView from "./views/SlidesView";
import WebpageView from "./views/WebpageView";
import VideoView from "./views/VideoView";
import ArticleResult from "./views/ArticleResult";
import VideoResult from "./views/VideoResult";

function Loading() {
  return (
    <div className="main-inner fade-in">
      <div className="loading-state">
        <div className="spinner" />
        <div>Generating your content…</div>
      </div>
    </div>
  );
}

const PLACEHOLDERS = {
  article: "Ask anything or describe what to create",
  slides: "Turn your course into stunning slides",
  webpage: "Describe the website you want to build",
  video: "Turn your course into stunning slides",
  interactive: "Describe an interactive lesson",
};

export default function App() {
  const [view, setView] = useState("landing");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("freestyle");
  const [options, setOptions] = useState({ ratio: "16:9" });
  const [status, setStatus] = useState("idle");
  const [generatedFor, setGeneratedFor] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isLanding = view === "landing";
  const showSidebar = !isLanding && !sidebarCollapsed;

  function handleNav(id) {
    setView(id);
    setStatus("idle");
    setPrompt("");
  }

  function handleSubmit() {
    if (!prompt.trim()) return;
    setStatus("loading");
    setTimeout(() => {
      setGeneratedFor({ mode: view, prompt, style, options });
      setStatus("done");
    }, 1200);
  }

  function handleReset() {
    setStatus("idle");
    setPrompt("");
  }

  function renderMain() {
    if (isLanding) return <Landing onSelect={handleNav} />;
    if (status === "loading") return <Loading />;
    if (status === "done") {
      if (view === "video")
        return <VideoResult initialPrompt={generatedFor.prompt} onReset={handleReset} />;
      return <ArticleResult initialPrompt={generatedFor.prompt} onReset={handleReset} />;
    }

    const common = { prompt, setPrompt, onSubmit: handleSubmit };
    if (view === "slides")
      return <SlidesView {...common} style={style} setStyle={setStyle} />;
    if (view === "webpage") return <WebpageView {...common} />;
    if (view === "video")
      return <VideoView {...common} options={options} setOptions={setOptions} />;
    return <SimpleComposerView {...common} placeholder={PLACEHOLDERS[view]} />;
  }

  return (
    <div className="app">
      <Header
        canCollapse={!isLanding}
        onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
      />
      <div className={`app-body ${showSidebar ? "" : "no-sidebar"}`}>
        {showSidebar && <Sidebar active={view} onChange={handleNav} />}
        <main className="main">{renderMain()}</main>
      </div>
    </div>
  );
}
