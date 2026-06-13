import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/employees": "Employee Management",
  "/recruitment": "Recruitment",
  "/attendance": "Attendance",
  "/leave": "Leave Management",
  "/payroll": "Payroll",
  "/performance": "Performance",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = localStorage.getItem("hr_auth");
    if (!auth) navigate("/login");
  }, [navigate]);

  const title = Object.entries(pageTitles).find(([path]) => location.pathname.startsWith(path))?.[1] || "TEYZIX CORE";

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar pageTitle={title} />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
