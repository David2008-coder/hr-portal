import { useState } from "react";
import { employees, departments } from "../../data/mockData";

const statusBadge = (s) => {
  const map = { Active: "badge-green", "On Leave": "badge-amber", Inactive: "badge-red" };
  return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
};

function EmployeeModal({ emp, onClose }) {
  if (!emp) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
        <div className="modal-header">
          <span className="modal-title">Employee Profile</span>
          <button onClick={onClose} className="btn btn-ghost btn-icon">✕</button>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 24 }}>
          <div className="avatar avatar-xl" style={{ fontSize: 26 }}>{emp.avatar}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>{emp.name}</h2>
            <p style={{ color: "var(--text-secondary)", marginTop: 4 }}>{emp.role} · {emp.department}</p>
            <div style={{ marginTop: 12 }}>{statusBadge(emp.status)}</div>
          </div>
        </div>
        <div className="divider" />
        <div className="grid-2" style={{ gap: 12 }}>
          {[
            { label: "Email", value: emp.email, icon: "📧" },
            { label: "Phone", value: emp.phone, icon: "📱" },
            { label: "Location", value: emp.location, icon: "📍" },
            { label: "Manager", value: emp.manager, icon: "👤" },
            { label: "Join Date", value: emp.joinDate, icon: "📅" },
            { label: "Salary", value: `$${emp.salary.toLocaleString()}/yr`, icon: "💰" },
          ].map(f => (
            <div key={f.label} style={{ padding: "12px 16px", background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
              <p className="text-xs">{f.label}</p>
              <p style={{ color: "var(--text-primary)", fontWeight: 500, fontSize: 13, marginTop: 4, display: "flex", gap: 6, alignItems: "center" }}><span>{f.icon}</span>{f.value}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <p className="text-xs" style={{ marginBottom: 8 }}>Performance Score</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="progress-bar" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${emp.performance}%`, background: emp.performance >= 90 ? "var(--green)" : emp.performance >= 75 ? "var(--accent)" : "var(--amber)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)", fontSize: 16 }}>{emp.performance}%</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Edit Profile</button>
          <button className="btn btn-secondary">Send Message</button>
          <button className="btn btn-danger">Deactivate</button>
        </div>
      </div>
    </div>
  );
}

export default function Employees() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [view, setView] = useState("table");
  const [selected, setSelected] = useState(null);

  const filtered = employees.filter(e =>
    (dept === "All" || e.department === dept) &&
    (status === "All" || e.status === status) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.role.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Employee Directory</h1>
            <p>{employees.length} employees across {departments.length} departments</p>
          </div>
          <button className="btn btn-primary">+ Add Employee</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-5" style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 220 }}>
            <span className="search-icon">🔍</span>
            <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, role, or email…" style={{ height: 38 }} />
          </div>
          <select className="input" style={{ width: 160, height: 38 }} value={dept} onChange={e => setDept(e.target.value)}>
            <option value="All">All Departments</option>
            {departments.map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="input" style={{ width: 140, height: 38 }} value={status} onChange={e => setStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
          <div className="tabs">
            <button className={`tab ${view === "table" ? "active" : ""}`} onClick={() => setView("table")}>≡ Table</button>
            <button className={`tab ${view === "grid" ? "active" : ""}`} onClick={() => setView("grid")}>⊞ Grid</button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {view === "table" && (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(emp => (
                  <tr key={emp.id} style={{ cursor: "pointer" }} onClick={() => setSelected(emp)}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="avatar avatar-sm">{emp.avatar}</div>
                        <div>
                          <p style={{ fontWeight: 500 }}>{emp.name}</p>
                          <p className="text-xs">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{emp.department}</td>
                    <td>{emp.role}</td>
                    <td>{statusBadge(emp.status)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${emp.performance}%`, background: emp.performance >= 90 ? "var(--green)" : "var(--accent)" }} />
                        </div>
                        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{emp.performance}%</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 500 }}>${emp.salary.toLocaleString()}</td>
                    <td onClick={e => e.stopPropagation()}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-sm btn-secondary" onClick={() => setSelected(emp)}>View</button>
                        <button className="btn btn-sm btn-ghost">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>No employees match your filters.</div>}
        </div>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid-3">
          {filtered.map(emp => (
            <div key={emp.id} className="card" style={{ cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; }}
              onClick={() => setSelected(emp)}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div className="avatar avatar-md">{emp.avatar}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{emp.name}</p>
                  <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 2 }}>{emp.role}</p>
                  <div style={{ marginTop: 8 }}>{statusBadge(emp.status)}</div>
                </div>
              </div>
              <div className="divider" style={{ margin: "14px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)" }}>
                <span>📍 {emp.location}</span>
                <span>📊 {emp.performance}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <EmployeeModal emp={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
