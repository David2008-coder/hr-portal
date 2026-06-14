import { useState } from "react";
import { leaveRequests } from "../../data/mockData";

const statusBadge = (s) => {
  const map = { Approved: "badge-green", Pending: "badge-amber", Rejected: "badge-red" };
  return <span className={`badge ${map[s]}`}>{s}</span>;
};

const leaveTypes = ["Annual Leave", "Sick Leave", "Personal Leave", "Maternity Leave", "Paternity Leave", "Unpaid Leave"];

export default function Leave() {
  const [requests, setRequests] = useState(leaveRequests);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const stats = {
    pending: requests.filter(r => r.status === "Pending").length,
    approved: requests.filter(r => r.status === "Approved").length,
    rejected: requests.filter(r => r.status === "Rejected").length,
    totalDays: requests.filter(r => r.status === "Approved").reduce((s, r) => s + r.days, 0),
  };

  const filtered = filter === "All" ? requests : requests.filter(r => r.status === filter);

  const updateStatus = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Leave Management</h1>
            <p>Track, approve, and manage employee time-off requests</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Leave Request</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-5">
        {[
          { label: "Pending Review", value: stats.pending, color: "var(--amber)", icon: "⏳" },
          { label: "Approved", value: stats.approved, color: "var(--green)", icon: "✅" },
          { label: "Rejected", value: stats.rejected, color: "var(--red)", icon: "❌" },
          { label: "Total Days Off", value: stats.totalDays, color: "var(--accent)", icon: "📅" },
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

      {/* Leave balance summary */}
      <div className="card mb-5">
        <div className="section-header">
          <span className="section-title">Leave Balance Summary — Current User</span>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {[
            { type: "Annual Leave", used: 8, total: 20, color: "var(--accent)" },
            { type: "Sick Leave", used: 2, total: 10, color: "var(--red)" },
            { type: "Personal Leave", used: 1, total: 5, color: "var(--purple)" },
            { type: "Maternity/Paternity", used: 0, total: 90, color: "var(--green)" },
          ].map(lb => (
            <div key={lb.type} style={{ flex: "1 1 200px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{lb.type}</span>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{lb.used}/{lb.total} days</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(lb.used / lb.total) * 100}%`, background: lb.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requests table */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="section-title">Leave Requests</span>
          <div className="tabs">
            {["All", "Pending", "Approved", "Rejected"].map(f => (
              <button key={f} className={`tab ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(req => (
                <tr key={req.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar avatar-sm">{req.avatar}</div>
                      <span style={{ fontWeight: 500 }}>{req.employee}</span>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-secondary)" }}>{req.type}</td>
                  <td>{req.from}</td>
                  <td>{req.to}</td>
                  <td style={{ fontWeight: 600 }}>{req.days}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{req.reason}</td>
                  <td>{statusBadge(req.status)}</td>
                  <td>
                    {req.status === "Pending" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-sm" style={{ background: "var(--green-dim)", color: "var(--green)" }} onClick={() => updateStatus(req.id, "Approved")}>✓ Approve</button>
                        <button className="btn btn-sm btn-danger" onClick={() => updateStatus(req.id, "Rejected")}>✕ Reject</button>
                      </div>
                    ) : (
                      <button className="btn btn-sm btn-ghost">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">New Leave Request</span>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-icon">✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ gridColumn: "1/-1" }}>
                <label className="input-label">Leave Type</label>
                <select className="input">{leaveTypes.map(t => <option key={t}>{t}</option>)}</select>
              </div>
              <div>
                <label className="input-label">Start Date</label>
                <input className="input" type="date" defaultValue="2026-06-20" />
              </div>
              <div>
                <label className="input-label">End Date</label>
                <input className="input" type="date" defaultValue="2026-06-22" />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <label className="input-label">Reason</label>
                <textarea className="input" rows={3} placeholder="Briefly describe the reason for your leave request…" style={{ resize: "vertical" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Submit Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
