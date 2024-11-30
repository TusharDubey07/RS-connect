import React from "react";
import { Users, ClipboardList, BarChart, LogOut } from "lucide-react"; // Add LogOut import
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: Users,
    label: "Patients",
    path: "/",
    matchPaths: ["/", "/patient-details"]
  },
  {
    icon: ClipboardList,
    label: "Staff",
    path: "/staff",
    matchPaths: ["/staff", "/staff-details"]
  },
  {
    icon: BarChart,
    label: "Analysis",
    path: "/analytics",
    matchPaths: ["/analytics"]
  },
];

export function Sidebar({ setIsAuthenticated }) { // Add setIsAuthenticated prop
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/auth');
  };

  const isActive = (item) => {
    return item.matchPaths.includes(location.pathname);
  };

  return (
    <div className="fixed h-screen" style={{ backgroundColor: "#2B3D52", width: "150px", height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Sidebar Header */}
      <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "14px", fontWeight: "500" }}>LOGO</span>
      </div>

      {/* Sidebar Content */}
      <div style={{ padding: "8px", flex: 1, paddingTop: "90px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
          {menuItems.map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => handleNavigation(item.path)}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isActive(item) ? "#10B981" : "transparent",
                  color: isActive(item) ? "white" : "rgba(255, 255, 255, 0.6)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s, color 0.2s",
                }}
                onMouseOver={(e) =>
                  !isActive(item) &&
                  (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)")
                }
                onMouseOut={(e) =>
                  !isActive(item) && 
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <item.icon style={{ width: "20px", height: "20px" }} />
              </button>
              <span style={{ 
                fontSize: "12px", 
                fontWeight: "500",
                color: isActive(item) ? "white" : "rgba(255, 255, 255, 0.6)",
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Footer */}
      <div style={{ padding: "8px", marginBottom: "16px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
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

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            color: "rgba(255, 255, 255, 0.8)",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <LogOut size={16} />
          <span style={{ fontSize: "12px" }}>Logout</span>
        </button>
      </div>
    </div>
  );
}