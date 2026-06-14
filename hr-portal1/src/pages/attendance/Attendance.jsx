import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { attendanceData, employees } from "../../data/mockData";

const chartStyle = { fill: "var(--text-muted)", fontSize: 11 };

const todayStats = attendanceData[attendanceData.length - 1];

export default function Attendance() {
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Simulated per-day status
  const getStatus = (day) => {
    if (day > 12) return "future";
    if ([6, 7, 13].includes(day)) return "weekend";
    if ([3, 8].includes(day)) return "low";
    return "good";
  };

  const statusColor = { good: "var(--green)", low: "var(--amber)", weekend: "var(--border)", future: "transparent" };
  const statusLabel = { good: "High attendance", low: "Low attendance", weekend: "Weekend", future: "Upcoming" };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Attendance Management</h1>
            <p>Track and monitor employee attendance — June 2026</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary">📥 Export Report</button>
            <button className="btn btn-primary">+ Mark Attendance</button>
          </div>
        </div>
      </div>

      {/* Today stats */}
      <div className="grid-4 mb-5">
        {[
          { label: "Present Today", value: todayStats.present, icon: "✅", color: "var(--green)" },
          { label: "Absent Today", value: todayStats.absent, icon: "❌", color: "var(--red)" },
          { label: "Late Arrivals", value: todayStats.late, icon: "⏰", color: "var(--amber)" },
          { label: "On Leave", value: todayStats.leave, icon: "🏖️", color: "var(--accent)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 20 }}>
            <div style={{ width: 48, height: 48, background: s.color + "20", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.icon}</div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: 12 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2-1 mb-5">
        {/* Chart */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Weekly Attendance Breakdown</span>
            <div style={{ display: "flex", gap: 12, fontSize: 11, color: "var(--text-muted)" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: "var(--green)", borderRadius: 2, display: "inline-block" }} />Present</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: "var(--red)", borderRadius: 2, display: "inline-block" }} />Absent</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 10, height: 10, background: "var(--amber)", borderRadius: 2, display: "inline-block" }} />Late</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={attendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="date" tick={chartStyle} tickFormatter={d => d.slice(5)} />
              <YAxis tick={chartStyle} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="present" fill="var(--green)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="absent" fill="var(--red)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="late" fill="var(--amber)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Calendar */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">June 2026</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: 11, color: "var(--text-muted)", fontWeight: 600, marginBottom: 4 }}>{d}</div>
            ))}
            {calendarDays.map(day => {
              const st = getStatus(day);
              return (
                <div key={day} title={statusLabel[st]} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 12, fontWeight: day === 12 ? 700 : 400, background: st === "future" ? "transparent" : st === "weekend" ? "var(--border-light)" : st === "good" ? "var(--green-dim)" : "var(--amber-dim)", color: day === 12 ? "var(--accent)" : st === "good" ? "var(--green)" : st === "low" ? "var(--amber)" : "var(--text-muted)", border: day === 12 ? "2px solid var(--accent)" : "none", cursor: st !== "future" ? "pointer" : "default" }}>
                  {day}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[["var(--green)", "Good attendance"], ["var(--amber)", "Low attendance"], ["var(--border)", "Weekend"]].map(([color, label]) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 3, background: color, display: "inline-block" }} />{label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Employee attendance table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-title">Employee Attendance — Today</span>
            <input className="input" placeholder="Search employees…" style={{ width: 220, height: 34 }} />
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.slice(0, 8).map((emp, i) => {
                const statuses = ["Present", "Present", "Late", "Present", "Absent", "Present", "On Leave", "Present"];
                const checkIns = ["08:52", "09:01", "09:38", "08:45", "--", "08:59", "--", "09:03"];
                const hours = ["8h 12m", "8h 03m", "7h 26m", "8h 22m", "--", "8h 07m", "--", "8h 01m"];
                const st = statuses[i];
                const stMap = { Present: "badge-green", Late: "badge-amber", Absent: "badge-red", "On Leave": "badge-blue" };
                return (
                  <tr key={emp.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar avatar-sm">{emp.avatar}</div>
                        <p style={{ fontWeight: 500 }}>{emp.name}</p>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{emp.department}</td>
                    <td style={{ fontFamily: "monospace", color: st === "Absent" ? "var(--text-muted)" : "var(--text-primary)" }}>{checkIns[i]}</td>
                    <td style={{ fontFamily: "monospace", color: "var(--text-muted)" }}>--</td>
                    <td style={{ color: "var(--text-secondary)" }}>{hours[i]}</td>
                    <td><span className={`badge ${stMap[st]}`}>{st}</span></td>
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
