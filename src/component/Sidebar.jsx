import React from "react";
import { Users, ClipboardList, BarChart } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: Users,
    label: "Patients",
    path: "/",
  },
  {
    icon: ClipboardList,
    label: "Staff",
    path: "/staff",
  },
  {
    icon: BarChart,
    label: "Analysis",
    path: "/analytics",
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="fixed h-screen" style={{ backgroundColor: "#2B3D52", width: "150px", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Sidebar Header */}
      <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", fontWeight: "500" }}>LOGO</span>
      </div>

      {/* Sidebar Content */}
      <div style={{ padding: "8px", flex: 1, paddingTop: "70px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          {menuItems.map((item) => (
            <div key={item.label} style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => handleNavigation(item.path)}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  backgroundColor: location.pathname === item.path ? "#10B981" : "transparent",
                  color: location.pathname === item.path ? "white" : "rgba(255, 255, 255, 0.6)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseOver={(e) =>
                  location.pathname !== item.path &&
                  (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
                }
                onMouseOut={(e) =>
                  location.pathname !== item.path && 
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <item.icon style={{ width: "20px", height: "20px" }} />
                <span style={{ fontSize: "10px", fontWeight: "500" }}>{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div style={{ padding: "8px", marginTop: "auto", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ccc",
            overflow: "hidden",
          }}
        >
          <img src="/images/sidebar.png?height=48&width=48" alt="Avatar" style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>
  );
}