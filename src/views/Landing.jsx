import { NAV_ITEMS } from "../components/Sidebar";

export default function Landing({ onSelect }) {
  return (
    <div className="landing fade-in">
      <img className="landing-art" src="/illustrations/proceed-hero.svg" alt="" />
      <h2>How do you want to proceed</h2>
      <p>Select lesson method you want to proceed with.</p>
      <div className="method-grid">
        {NAV_ITEMS.map(({ id, label, icon }) => (
          <button key={id} className="method-card" onClick={() => onSelect(id)}>
            <span className="method-card-icon">
              <img src={icon} alt="" />
            </span>
            <span className="method-card-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
