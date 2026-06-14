import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { employees, attendanceData, hiringTrends, leaveRequests, notifications } from "../data/mockData";

const StatCard = ({ icon, label, value, change, changeDir, color }) => (
  <div className="card stat-card fade-in">
    <div className="stat-icon" style={{ background: color + "20", fontSize: 22 }}>{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    <div className={`stat-change ${changeDir}`}>
      <span>{changeDir === "up" ? "↑" : "↓"}</span>
      <span>{change}</span>
    </div>
  </div>
);

const chartStyle = { fill: "var(--text-muted)", fontSize: 11 };

export default function Dashboard() {
  const active = employees.filter(e => e.status === "Active").length;
  const onLeave = employees.filter(e => e.status === "On Leave").length;
  const pending = leaveRequests.filter(r => r.status === "Pending").length;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Good morning, Aisha 👋</h1>
        <p>Here's what's happening at TEYZIX CORE today — Thursday, June 12, 2026</p>
      </div>

      {/* Stat grid */}
      <div className="grid-4 mb-5">
        <StatCard icon="👥" label="Total Employees" value={employees.length} change="2 this month" changeDir="up" color="var(--accent)" />
        <StatCard icon="✅" label="Active Today" value={active} change="vs yesterday" changeDir="up" color="var(--green)" />
        <StatCard icon="🏖️" label="On Leave" value={onLeave} change="pending approvals" changeDir="down" color="var(--amber)" />
        <StatCard icon="🎯" label="Open Positions" value={4} change="3 candidates shortlisted" changeDir="up" color="var(--purple)" />
      </div>

      {/* Charts row */}
      <div className="grid-2-1 mb-5">
        {/* Attendance trend */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Attendance — Last 10 Days</span>
            <span className="badge badge-green">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={attendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={chartStyle} tickFormatter={d => d.slice(5)} />
              <YAxis tick={chartStyle} domain={[80, 115]} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="present" stroke="var(--accent)" fill="url(#g1)" strokeWidth={2} dot={false} />
              <Area type="monotone" dataKey="absent" stroke="var(--red)" fill="none" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring trends */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Monthly Hires</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hiringTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={chartStyle} />
              <YAxis tick={chartStyle} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="hired" fill="var(--accent)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid-2">
        {/* Pending leave */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Pending Leave Requests</span>
            <span className="badge badge-amber">{pending} pending</span>
          </div>
          {leaveRequests.filter(r => r.status === "Pending").map(req => (
            <div key={req.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border-light)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="avatar avatar-sm">{req.avatar}</div>
                <div>
                  <p style={{ fontWeight: 500, fontSize: 13 }}>{req.employee}</p>
                  <p className="text-xs">{req.type} · {req.days} day{req.days > 1 ? "s" : ""}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-sm" style={{ background: "var(--green-dim)", color: "var(--green)", border: "1px solid rgba(34,197,94,0.2)" }}>✓ Approve</button>
                <button className="btn btn-sm btn-danger">✕ Reject</button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Recent Activity</span>
          </div>
          {notifications.map(n => (
            <div key={n.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid var(--border-light)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.read ? "var(--border)" : "var(--accent)", marginTop: 5, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, color: n.read ? "var(--text-secondary)" : "var(--text-primary)" }}>{n.message}</p>
                <p className="text-xs">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
