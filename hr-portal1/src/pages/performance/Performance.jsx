import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { employees, performanceData } from "../../data/mockData";

const chartStyle = { fill: "var(--text-muted)", fontSize: 11 };

const kpiData = [
  { subject: "Productivity", score: 88 },
  { subject: "Quality", score: 92 },
  { subject: "Collaboration", score: 85 },
  { subject: "Innovation", score: 78 },
  { subject: "Leadership", score: 91 },
  { subject: "Punctuality", score: 95 },
];

export default function Performance() {
  const topPerformers = [...employees].sort((a, b) => b.performance - a.performance).slice(0, 5);

  const getRating = (score) => {
    if (score >= 95) return { label: "Outstanding", color: "var(--green)" };
    if (score >= 85) return { label: "Exceeds", color: "var(--accent)" };
    if (score >= 75) return { label: "Meets", color: "var(--amber)" };
    return { label: "Needs Work", color: "var(--red)" };
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Performance Management</h1>
            <p>Q2 2026 performance cycle · {employees.length} employees tracked</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary">📥 Export Reviews</button>
            <button className="btn btn-primary">+ Start Review</button>
          </div>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid-4 mb-5">
        {[
          { label: "Avg Performance", value: `${Math.round(employees.reduce((s, e) => s + e.performance, 0) / employees.length)}%`, icon: "📈", color: "var(--accent)" },
          { label: "Outstanding", value: employees.filter(e => e.performance >= 95).length, icon: "⭐", color: "var(--green)" },
          { label: "Reviews Due", value: 4, icon: "📋", color: "var(--amber)" },
          { label: "Goals Met", value: "78%", icon: "🎯", color: "var(--purple)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 20 }}>
            <div style={{ width: 48, height: 48, background: s.color + "20", borderRadius: 12, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: 12 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-5">
        {/* Department radar */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">KPI Radar — Company Average</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={kpiData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} />
              <Radar name="Score" dataKey="score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dept comparison bar */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Department Avg Scores</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={performanceData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 0 }}>
              <XAxis type="number" domain={[60, 100]} tick={chartStyle} />
              <YAxis type="category" dataKey="department" tick={chartStyle} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="avg" fill="var(--accent)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top performers */}
      <div className="card mb-5">
        <div className="section-header">
          <span className="section-title">Top Performers — Q2 2026</span>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {topPerformers.map((emp, i) => {
            const rating = getRating(emp.performance);
            return (
              <div key={emp.id} style={{ flex: "1 1 160px", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 16, textAlign: "center", position: "relative" }}>
                {i === 0 && <div style={{ position: "absolute", top: -8, right: 8, fontSize: 20 }}>👑</div>}
                <div className="avatar avatar-md" style={{ margin: "0 auto 10px" }}>{emp.avatar}</div>
                <p style={{ fontWeight: 600, fontSize: 13 }}>{emp.name}</p>
                <p style={{ color: "var(--text-secondary)", fontSize: 11, marginTop: 2 }}>{emp.role}</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: rating.color, margin: "10px 0 4px" }}>{emp.performance}%</p>
                <span style={{ fontSize: 11, color: rating.color, background: rating.color + "20", padding: "2px 8px", borderRadius: 12 }}>{rating.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full employee performance table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <span className="section-title">All Employee Reviews</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Department</th>
                <th>Score</th>
                <th>Rating</th>
                <th>Trend</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...employees].sort((a, b) => b.performance - a.performance).map((emp, i) => {
                const rating = getRating(emp.performance);
                const trend = emp.performance > 85 ? "↑" : emp.performance > 75 ? "→" : "↓";
                const trendColor = trend === "↑" ? "var(--green)" : trend === "→" ? "var(--amber)" : "var(--red)";
                return (
                  <tr key={emp.id}>
                    <td style={{ color: "var(--text-muted)", fontWeight: 600 }}>#{i + 1}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar avatar-sm">{emp.avatar}</div>
                        <div>
                          <p style={{ fontWeight: 500 }}>{emp.name}</p>
                          <p className="text-xs">{emp.role}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{emp.department}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="progress-bar" style={{ width: 100 }}>
                          <div className="progress-fill" style={{ width: `${emp.performance}%`, background: rating.color }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 13 }}>{emp.performance}%</span>
                      </div>
                    </td>
                    <td><span style={{ color: rating.color, fontSize: 12, fontWeight: 600 }}>{rating.label}</span></td>
                    <td style={{ color: trendColor, fontWeight: 700, fontSize: 16 }}>{trend}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-sm btn-secondary">Review</button>
                        <button className="btn btn-sm btn-ghost">Goals</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
