export const NAV_ITEMS = [
  { id: "article", label: "Article", icon: "/icons/article.svg" },
  { id: "slides", label: "Slides", icon: "/icons/slides.svg" },
  { id: "webpage", label: "Webpage", icon: "/icons/webpage.svg" },
  { id: "video", label: "Video", icon: "/icons/video.svg" },
  { id: "interactive", label: "Interactive lesson", icon: "/icons/interactive.svg" },
];

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      {NAV_ITEMS.map(({ id, label, icon }) => (
        <button
          key={id}
          className={`nav-item ${active === id ? "active" : ""}`}
          onClick={() => onChange(id)}
        >
          <span className="nav-icon-box">
            <img src={icon} alt="" />
          </span>
          <span className="nav-label">{label}</span>
        </button>
      ))}
    </aside>
  );
}
