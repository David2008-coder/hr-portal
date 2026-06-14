import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { payrollData, employees, departments } from "../../data/mockData";

const chartStyle = { fill: "var(--text-muted)", fontSize: 11 };
const COLORS = ["var(--accent)", "var(--purple)", "var(--green)", "var(--amber)", "var(--red)", "#06b6d4", "#ec4899"];

const deptPayroll = departments.map(d => ({
  dept: d,
  total: employees.filter(e => e.department === d).reduce((s, e) => s + e.salary, 0),
  count: employees.filter(e => e.department === d).length,
}));

export default function Payroll() {
  const currentMonth = payrollData[payrollData.length - 1];
  const lastMonth = payrollData[payrollData.length - 2];
  const growth = (((currentMonth.total - lastMonth.total) / lastMonth.total) * 100).toFixed(1);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Payroll Dashboard</h1>
            <p>Salary analytics and cost monitoring — June 2026</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary">📥 Download Report</button>
            <button className="btn btn-primary">Run Payroll</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-5">
        {[
          { label: "Total Payroll (June)", value: `$${(currentMonth.total / 1000).toFixed(0)}k`, sub: `+${growth}% vs May`, color: "var(--accent)", icon: "💵" },
          { label: "Avg Salary", value: `$${Math.round(employees.reduce((s, e) => s + e.salary, 0) / employees.length / 1000)}k`, sub: "per employee/year", color: "var(--green)", icon: "📊" },
          { label: "Highest Dept Cost", value: "Engineering", sub: `$${(deptPayroll.find(d => d.dept === "Engineering").total / 1000).toFixed(0)}k/yr`, color: "var(--purple)", icon: "🏢" },
          { label: "Payroll Status", value: "Processed", sub: "June 12, 2026", color: "var(--green)", icon: "✅" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--bg-hover)", padding: "2px 8px", borderRadius: 12 }}>{s.sub}</span>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid-2-1 mb-5">
        {/* Payroll trend */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Payroll Trend — 2026</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={payrollData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={chartStyle} />
              <YAxis tick={chartStyle} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={v => [`$${(v / 1000).toFixed(0)}k`]} />
              <Area type="monotone" dataKey="total" stroke="var(--accent)" fill="url(#pg)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dept cost pie */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">By Department</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={deptPayroll} dataKey="total" nameKey="dept" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
                {deptPayroll.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={v => `$${(v / 1000).toFixed(0)}k`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {deptPayroll.map((d, i) => (
              <span key={d.dept} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-secondary)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i % COLORS.length], display: "inline-block" }} />{d.dept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Employee salary table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="section-title">Salary Breakdown</span>
          <select className="input" style={{ width: 160, height: 34 }}>
            <option>All Departments</option>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Annual Salary</th>
                <th>Monthly</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar avatar-sm">{emp.avatar}</div>
                      <span style={{ fontWeight: 500 }}>{emp.name}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{emp.department}</td>
                  <td style={{ color: "var(--text-secondary)" }}>{emp.role}</td>
                  <td style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}>${emp.salary.toLocaleString()}</td>
                  <td style={{ color: "var(--text-secondary)" }}>${Math.round(emp.salary / 12).toLocaleString()}</td>
                  <td><span className={`badge ${emp.status === "Active" ? "badge-green" : emp.status === "On Leave" ? "badge-amber" : "badge-gray"}`}>{emp.status === "Inactive" ? "Suspended" : "Active"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
