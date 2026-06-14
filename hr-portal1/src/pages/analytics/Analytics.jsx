import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";
import { hiringTrends, performanceData, employees, departments } from "../../data/mockData";

const chartStyle = { fill: "var(--text-muted)", fontSize: 11 };
const COLORS = ["var(--accent)", "var(--purple)", "var(--green)", "var(--amber)", "var(--red)", "#06b6d4", "#ec4899"];

const growthData = [
  { month: "Jul 25", headcount: 85 },
  { month: "Aug 25", headcount: 89 },
  { month: "Sep 25", headcount: 93 },
  { month: "Oct 25", headcount: 96 },
  { month: "Nov 25", headcount: 99 },
  { month: "Dec 25", headcount: 102 },
  { month: "Jan 26", headcount: 104 },
  { month: "Feb 26", headcount: 107 },
  { month: "Mar 26", headcount: 109 },
  { month: "Apr 26", headcount: 110 },
  { month: "May 26", headcount: 111 },
  { month: "Jun 26", headcount: employees.length },
];

const attritionData = [
  { month: "Jan", rate: 2.1 }, { month: "Feb", rate: 1.8 }, { month: "Mar", rate: 2.4 },
  { month: "Apr", rate: 1.5 }, { month: "May", rate: 2.0 }, { month: "Jun", rate: 1.9 },
];

const deptDist = departments.map(d => ({
  name: d,
  value: employees.filter(e => e.department === d).length,
}));

export default function Analytics() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Analytics Center</h1>
            <p>Workforce intelligence and HR metrics — YTD 2026</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <select className="input" style={{ width: 140, height: 38 }}>
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>This quarter</option>
            </select>
            <button className="btn btn-secondary">📥 Export</button>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid-4 mb-5">
        {[
          { label: "Headcount Growth", value: "+41%", sub: "vs 12 months ago", icon: "📈", color: "var(--green)" },
          { label: "Avg Time to Hire", value: "18 days", sub: "-4 days vs Q1", icon: "⏱️", color: "var(--accent)" },
          { label: "Attrition Rate", value: "2.0%", sub: "monthly avg", icon: "📉", color: "var(--amber)" },
          { label: "Gender Diversity", value: "48/52", sub: "F/M ratio", icon: "⚖️", color: "var(--purple)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 24 }}>{s.icon}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--bg-hover)", padding: "2px 8px", borderRadius: 12 }}>{s.sub}</span>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: s.color }}>{s.value}</p>
            <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid-2 mb-5">
        {/* Headcount growth */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Headcount Growth</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={chartStyle} />
              <YAxis tick={chartStyle} domain={[80, 125]} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="headcount" stroke="var(--green)" fill="url(#hg)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring trends */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Hiring vs Applications</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={hiringTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={chartStyle} />
              <YAxis tick={chartStyle} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="applied" fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth={1} radius={[3, 3, 0, 0]} />
              <Bar dataKey="hired" fill="var(--accent)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid-2 mb-5">
        {/* Attrition */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Monthly Attrition Rate (%)</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={attritionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tick={chartStyle} />
              <YAxis tick={chartStyle} domain={[0, 4]} />
              <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}%`]} />
              <Line type="monotone" dataKey="rate" stroke="var(--red)" strokeWidth={2} dot={{ r: 4, fill: "var(--red)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Dept distribution */}
        <div className="card">
          <div className="section-header">
            <span className="section-title">Workforce by Department</span>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={deptDist} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                  {deptDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {deptDist.map((d, i) => (
                <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i % COLORS.length], display: "inline-block" }} />{d.name}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{d.value} <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({Math.round(d.value / employees.length * 100)}%)</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dept performance comparison */}
      <div className="card">
        <div className="section-header">
          <span className="section-title">Department Performance Comparison</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={performanceData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
            <XAxis dataKey="department" tick={chartStyle} />
            <YAxis tick={chartStyle} domain={[60, 100]} />
            <Tooltip contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} formatter={v => [`${v}%`]} />
            <Bar dataKey="avg" radius={[4, 4, 0, 0]}>
              {performanceData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
