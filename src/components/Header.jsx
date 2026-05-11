export default function Header({ canCollapse, onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="brand">
          <img className="brand-mark" src="/icons/logomark.svg" alt="" />
          <img className="brand-type" src="/icons/logotype.svg" alt="Logoipsum" />
        </div>
        <button
          className="brand-divider"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
          disabled={!canCollapse}
          style={{ opacity: canCollapse ? 1 : 0.4, cursor: canCollapse ? "pointer" : "default" }}
        >
          <img src="/icons/sidebar-toggle.svg" alt="" />
        </button>
      </div>
      <div className="header-right">
        <span className="plan-badge">
          <img src="/icons/flash.svg" alt="" />
          <span>
            <strong>6</strong>
            <span className="total">/30 days</span>
          </span>
        </span>
        <button className="icon-btn" aria-label="Notifications">
          <img src="/icons/notification.svg" alt="" />
        </button>
        <button className="user">
          <span className="avatar">
            <img src="/avatar/james.png" alt="James Vendi" />
          </span>
          <span className="user-meta">
            <div className="user-name">James Vendi</div>
            <div className="user-tier">
              <img src="/icons/verified.svg" alt="" />
              <span>Master</span>
            </div>
          </span>
          <img className="chev" src="/icons/chevron-down.svg" alt="" />
        </button>
      </div>
    </header>
  );
}
