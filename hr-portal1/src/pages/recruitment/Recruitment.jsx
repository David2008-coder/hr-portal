import { useState } from "react";
import { jobListings, candidates } from "../../data/mockData";

const stages = ["Applied", "Screening", "Interview", "Assessment", "Selected"];

const stageBadge = (s) => {
  const map = { Applied: "badge-gray", Screening: "badge-blue", Interview: "badge-amber", Assessment: "badge-purple", Selected: "badge-green" };
  return <span className={`badge ${map[s]}`}>{s}</span>;
};

export default function Recruitment() {
  const [tab, setTab] = useState("pipeline");
  const [selectedJob, setSelectedJob] = useState("all");

  const filteredCandidates = selectedJob === "all" ? candidates : candidates.filter(c => c.role === selectedJob);

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Recruitment</h1>
            <p>{jobListings.filter(j => j.status === "Active").length} active positions · {candidates.length} candidates in pipeline</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-secondary">Export</button>
            <button className="btn btn-primary">+ Post Job</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4 mb-5">
        {[
          { label: "Open Positions", value: jobListings.filter(j => j.status === "Active").length, icon: "📋", color: "var(--accent)" },
          { label: "Total Applicants", value: candidates.length, icon: "👤", color: "var(--purple)" },
          { label: "In Interview", value: candidates.filter(c => c.stage === "Interview").length, icon: "🎙️", color: "var(--amber)" },
          { label: "Selected", value: candidates.filter(c => c.stage === "Selected").length, icon: "✅", color: "var(--green)" },
        ].map(s => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: 20 }}>
            <div style={{ width: 48, height: 48, background: s.color + "20", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700 }}>{s.value}</p>
              <p style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 2 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
        <div className="tabs">
          <button className={`tab ${tab === "pipeline" ? "active" : ""}`} onClick={() => setTab("pipeline")}>🔀 Pipeline</button>
          <button className={`tab ${tab === "jobs" ? "active" : ""}`} onClick={() => setTab("jobs")}>📋 Job Listings</button>
          <button className={`tab ${tab === "candidates" ? "active" : ""}`} onClick={() => setTab("candidates")}>👥 Candidates</button>
        </div>
        {tab === "pipeline" && (
          <select className="input" style={{ width: 200, height: 38 }} value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
            <option value="all">All Positions</option>
            {[...new Set(candidates.map(c => c.role))].map(r => <option key={r}>{r}</option>)}
          </select>
        )}
      </div>

      {/* Pipeline Kanban */}
      {tab === "pipeline" && (
        <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }}>
          {stages.map(stage => {
            const stageCandidates = filteredCandidates.filter(c => c.stage === stage);
            return (
              <div key={stage} className="pipeline-col" style={{ minWidth: 220 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "0 4px" }}>
                  {stageBadge(stage)}
                  <span style={{ background: "var(--bg-hover)", padding: "2px 8px", borderRadius: 12, fontSize: 11, color: "var(--text-muted)" }}>{stageCandidates.length}</span>
                </div>
                {stageCandidates.map(c => (
                  <div key={c.id} className="pipeline-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div className="avatar avatar-sm">{c.avatar}</div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</p>
                        <p style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.role}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.appliedDate}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: c.score >= 90 ? "var(--green)" : c.score >= 80 ? "var(--accent)" : "var(--amber)" }}>⭐ {c.score}</span>
                    </div>
                    <div className="progress-bar" style={{ marginTop: 8 }}>
                      <div className="progress-fill" style={{ width: `${c.score}%`, background: "var(--accent)" }} />
                    </div>
                  </div>
                ))}
                {stageCandidates.length === 0 && (
                  <div style={{ padding: "24px 16px", textAlign: "center", border: "2px dashed var(--border)", borderRadius: "var(--radius-sm)", color: "var(--text-muted)", fontSize: 12 }}>No candidates</div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Job Listings */}
      {tab === "jobs" && (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Salary</th>
                  <th>Applicants</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobListings.map(job => (
                  <tr key={job.id}>
                    <td>
                      <p style={{ fontWeight: 500 }}>{job.title}</p>
                      <p className="text-xs">Posted {job.posted}</p>
                    </td>
                    <td style={{ color: "var(--text-secondary)" }}>{job.department}</td>
                    <td>{job.location}</td>
                    <td><span className="badge badge-blue">{job.type}</span></td>
                    <td style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>{job.salary}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: "var(--accent)" }}>{job.applicants}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: 12 }}> applicants</span>
                    </td>
                    <td><span className={`badge ${job.status === "Active" ? "badge-green" : "badge-gray"}`}>{job.status}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-sm btn-secondary">View</button>
                        <button className="btn btn-sm btn-ghost">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Candidates table */}
      {tab === "candidates" && (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Applied For</th>
                  <th>Stage</th>
                  <th>Score</th>
                  <th>Applied</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div className="avatar avatar-sm">{c.avatar}</div>
                        <div>
                          <p style={{ fontWeight: 500 }}>{c.name}</p>
                          <p className="text-xs">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{c.role}</td>
                    <td>{stageBadge(c.stage)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="progress-bar" style={{ width: 70 }}>
                          <div className="progress-fill" style={{ width: `${c.score}%`, background: c.score >= 90 ? "var(--green)" : "var(--accent)" }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 600 }}>{c.score}</span>
                      </div>
                    </td>
                    <td style={{ color: "var(--text-secondary)", fontSize: 13 }}>{c.appliedDate}</td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="btn btn-sm btn-secondary">Profile</button>
                        <button className="btn btn-sm" style={{ background: "var(--green-dim)", color: "var(--green)" }}>Advance</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
