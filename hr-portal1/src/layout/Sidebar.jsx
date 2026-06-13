import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const nav = [
  { label: "Dashboard", path: "/dashboard", icon: "⊞" },
  { label: "Employees", path: "/employees", icon: "👥" },
  { label: "Recruitment", path: "/recruitment", icon: "🎯" },
  { label: "Attendance", path: "/attendance", icon: "📅" },
  { label: "Leave", path: "/leave", icon: "🏖️" },
  { label: "Payroll", path: "/payroll", icon: "💰" },
  { label: "Performance", path: "/performance", icon: "📈" },
  { label: "Analytics", path: "/analytics", icon: "📊" },
  { label: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside style={{
      width: collapsed ? 64 : 220,
      background: "var(--bg-secondary)",
      borderRight: "1px solid var(--border)",
      display: "flex", flexDirection: "column",
      transition: "width 0.25s ease",
      flexShrink: 0, overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 12px" : "20px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, background: "var(--accent)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0 }}>T</div>
        {!collapsed && <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", whiteSpace: "nowrap" }}>TEYZIX CORE</span>}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {nav.map(({ label, path, icon }) => {
          const active = location.pathname.startsWith(path);
          return (
            <NavLink key={path} to={path} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: collapsed ? "10px 14px" : "10px 14px",
                borderRadius: "var(--radius-sm)", marginBottom: 2,
                background: active ? "var(--accent-dim)" : "transparent",
                color: active ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
                cursor: "pointer",
                fontSize: 13,
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--bg-hover)"; e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; }}}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                {!collapsed && <span style={{ whiteSpace: "nowrap" }}>{label}</span>}
                {!collapsed && active && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "var(--accent)" }} />}
              </div>
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)" }}>
        <button onClick={() => setCollapsed(!collapsed)} className="btn btn-ghost" style={{ width: "100%", justifyContent: collapsed ? "center" : "flex-start", fontSize: 13 }}>
          <span style={{ fontSize: 16 }}>{collapsed ? "→" : "←"}</span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
