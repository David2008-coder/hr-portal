import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({ email: true, leave: true, payroll: false, performance: true, recruitment: true });
  const [theme, setTheme] = useState("dark");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account, preferences, and system configuration</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
        {/* Sidebar nav */}
        <div className="card" style={{ padding: "12px 8px", height: "fit-content" }}>
          {[
            { label: "Profile", icon: "👤" },
            { label: "Notifications", icon: "🔔" },
            { label: "Appearance", icon: "🎨" },
            { label: "Security", icon: "🔒" },
            { label: "Integrations", icon: "🔗" },
            { label: "Company", icon: "🏢" },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: i === 0 ? "var(--accent-dim)" : "transparent", color: i === 0 ? "var(--accent)" : "var(--text-secondary)", fontSize: 13, fontWeight: i === 0 ? 600 : 400 }}>
              <span>{item.icon}</span>{item.label}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Profile section */}
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Profile Information</h3>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 24 }}>
              <div className="avatar avatar-xl" style={{ fontSize: 28, flexShrink: 0 }}>AO</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 500, marginBottom: 4 }}>Aisha Okafor</p>
                <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>HR Manager · TEYZIX CORE</p>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: 10 }}>Change Photo</button>
              </div>
            </div>
            <div className="grid-2" style={{ gap: 16 }}>
              {[
                { label: "First Name", val: "Aisha" },
                { label: "Last Name", val: "Okafor" },
                { label: "Email", val: "a.okafor@teyzix.com" },
                { label: "Phone", val: "+1 555-0107" },
                { label: "Department", val: "HR" },
                { label: "Location", val: "Atlanta, GA" },
              ].map(f => (
                <div key={f.label}>
                  <label className="input-label">{f.label}</label>
                  <input className="input" defaultValue={f.val} />
                </div>
              ))}
              <div style={{ gridColumn: "1/-1" }}>
                <label className="input-label">Bio</label>
                <textarea className="input" rows={3} defaultValue="HR Manager with 6+ years of experience in talent management, employee relations, and organisational development." style={{ resize: "vertical" }} />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Notification Preferences</h3>
            {[
              { key: "email", label: "Email Notifications", desc: "Receive important updates via email" },
              { key: "leave", label: "Leave Requests", desc: "Get notified when employees submit leave requests" },
              { key: "payroll", label: "Payroll Alerts", desc: "Notifications about payroll processing" },
              { key: "performance", label: "Performance Reviews", desc: "Reminders for upcoming review deadlines" },
              { key: "recruitment", label: "Recruitment Updates", desc: "Candidate applications and status changes" },
            ].map(n => (
              <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid var(--border-light)" }}>
                <div>
                  <p style={{ fontWeight: 500, fontSize: 14 }}>{n.label}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 2 }}>{n.desc}</p>
                </div>
                <button onClick={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} style={{ width: 44, height: 24, borderRadius: 12, background: notifs[n.key] ? "var(--accent)" : "var(--border)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                  <span style={{ position: "absolute", top: 2, left: notifs[n.key] ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", display: "block" }} />
                </button>
              </div>
            ))}
          </div>

          {/* Appearance */}
          <div className="card">
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Appearance</h3>
            <div style={{ display: "flex", gap: 12 }}>
              {["dark", "light", "system"].map(t => (
                <div key={t} onClick={() => setTheme(t)} style={{ flex: 1, padding: 16, border: `2px solid ${theme === t ? "var(--accent)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", cursor: "pointer", textAlign: "center", background: theme === t ? "var(--accent-dim)" : "transparent", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{t === "dark" ? "🌙" : t === "light" ? "☀️" : "💻"}</div>
                  <p style={{ fontSize: 13, fontWeight: theme === t ? 600 : 400, color: theme === t ? "var(--accent)" : "var(--text-secondary)", textTransform: "capitalize" }}>{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Save button */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button className="btn btn-secondary">Reset to Defaults</button>
            <button className="btn btn-primary btn-lg" onClick={handleSave}>
              {saved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
