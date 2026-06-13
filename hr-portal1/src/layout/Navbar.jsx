import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notifications } from "../data/mockData";

export default function Navbar({ pageTitle }) {
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [notifList, setNotifList] = useState(notifications);
  const navigate = useNavigate();

  const unread = notifList.filter(n => !n.read).length;

  const markAllRead = () => setNotifList(prev => prev.map(n => ({ ...n, read: true })));

  const handleLogout = () => {
    localStorage.removeItem("hr_auth");
    navigate("/login");
  };

  const typeColors = { leave: "var(--amber)", hire: "var(--green)", review: "var(--accent)", payroll: "var(--purple)", attendance: "var(--red)" };

  return (
    <header style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "relative", zIndex: 100 }}>
      {/* Left: title + search */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)" }}>{pageTitle}</h2>
        <div className="search-bar" style={{ width: 280 }}>
          <span className="search-icon" style={{ fontSize: 14 }}>🔍</span>
          <input className="input" placeholder="Search employees, jobs, reports…" style={{ height: 36, fontSize: 13 }} />
        </div>
      </div>

      {/* Right: actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button className="btn btn-ghost btn-icon" onClick={() => { setShowNotif(!showNotif); setShowUser(false); }} style={{ position: "relative" }}>
            🔔
            {unread > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, background: "var(--red)", borderRadius: "50%", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{unread}</span>}
          </button>
          {showNotif && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 340, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", zIndex: 200 }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>Notifications</span>
                <button onClick={markAllRead} className="btn btn-ghost" style={{ fontSize: 11, padding: "4px 8px" }}>Mark all read</button>
              </div>
              {notifList.map(n => (
                <div key={n.id} style={{ padding: "12px 18px", borderBottom: "1px solid var(--border-light)", display: "flex", gap: 12, alignItems: "flex-start", background: n.read ? "transparent" : "var(--accent-dim)", cursor: "pointer" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColors[n.type], flexShrink: 0, marginTop: 5 }} />
                  <div>
                    <p style={{ fontSize: 13, color: "var(--text-primary)" }}>{n.message}</p>
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User menu */}
        <div style={{ position: "relative" }}>
          <button onClick={() => { setShowUser(!showUser); setShowNotif(false); }} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--bg-hover)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "6px 12px", cursor: "pointer" }}>
            <div className="avatar avatar-sm">AO</div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Aisha Okafor</p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>HR Manager</p>
            </div>
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>▼</span>
          </button>
          {showUser && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 180, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", zIndex: 200 }}>
              {[
                { label: "My Profile", icon: "👤" },
                { label: "Settings", icon: "⚙️" },
                { label: "Help", icon: "❓" },
              ].map(item => (
                <div key={item.label} style={{ padding: "10px 16px", display: "flex", gap: 10, alignItems: "center", cursor: "pointer", fontSize: 13, color: "var(--text-secondary)" }} onMouseEnter={e => e.currentTarget.style.background = "var(--bg-hover)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <span>{item.icon}</span>{item.label}
                </div>
              ))}
              <div style={{ borderTop: "1px solid var(--border)", margin: "4px 0" }} />
              <div onClick={handleLogout} style={{ padding: "10px 16px", display: "flex", gap: 10, alignItems: "center", cursor: "pointer", fontSize: 13, color: "var(--red)" }} onMouseEnter={e => e.currentTarget.style.background = "var(--red-dim)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <span>🚪</span>Sign out
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay close */}
      {(showNotif || showUser) && <div style={{ position: "fixed", inset: 0, zIndex: 99 }} onClick={() => { setShowNotif(false); setShowUser(false); }} />}
    </header>
  );
}
