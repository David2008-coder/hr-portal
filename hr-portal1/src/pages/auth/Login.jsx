import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("aisha@teyzix.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate auth
    await new Promise(r => setTimeout(r, 900));
    if (email && password.length >= 6) {
      localStorage.setItem("hr_auth", JSON.stringify({ email, name: "Aisha Okafor" }));
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", width: 600, height: 600, background: "radial-gradient(circle, rgba(79,142,247,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />

      <div style={{ width: 420, padding: 40, animation: "fadeIn 0.4s ease" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, background: "var(--accent)", borderRadius: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: "#fff", marginBottom: 16, boxShadow: "0 0 40px var(--accent-glow)" }}>T</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--text-primary)" }}>TEYZIX CORE</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>Enterprise HR Management Platform</p>
        </div>

        <div className="card">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Sign in</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 28 }}>Welcome back. Enter your credentials to continue.</p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 16 }}>
              <label className="input-label">Email Address</label>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@teyzix.com" required />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label className="input-label" style={{ marginBottom: 0 }}>Password</label>
                <a href="#" style={{ color: "var(--accent)", fontSize: 12, textDecoration: "none" }}>Forgot password?</a>
              </div>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>

            {error && <p style={{ color: "var(--red)", fontSize: 13, marginBottom: 16, background: "var(--red-dim)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>{error}</p>}

            <button className="btn btn-primary btn-lg" type="submit" style={{ width: "100%", justifyContent: "center" }} disabled={loading}>
              {loading ? <span className="pulse">Signing in…</span> : "Sign in →"}
            </button>
          </form>

          <div style={{ marginTop: 24, padding: 14, background: "var(--bg-secondary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>Demo credentials</p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Email: <strong style={{ color: "var(--text-primary)" }}>aisha@teyzix.com</strong></p>
            <p style={{ fontSize: 12, color: "var(--text-secondary)" }}>Password: <strong style={{ color: "var(--text-primary)" }}>password123</strong></p>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 12, marginTop: 24 }}>
          © 2026 TEYZIX CORE · Enterprise HR Platform
        </p>
      </div>
    </div>
  );
}
