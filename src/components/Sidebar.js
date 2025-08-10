import React from "react";

function Sidebar({ onLogout, activePage, setActivePage, userRole }) {
  // Sidebar items based on user's role
  const menuItems =
    userRole === "manager"
      ? [
          { label: "Dashboard", icon: "📊" },
          { label: "Manage Employees", icon: "👥" },
          { label: "Manage Categories", icon: "📁" },
          { label: "Complaint / Feedback", icon: "💬" }
        ]
      : [
          { label: "Dashboard", icon: "📊" },
          { label: "My Profile", icon: "🙋‍♂" },
          { label: "Complaint / Feedback", icon: "💬" }
        ];

  return (
    <div style={{ display: "flex" }}>
      {/* Left Icon Bar (Small) */}
      <div style={styles.smallMenu}>
        {menuItems.map((item) => (
          <div
            key={item.label}
            title={item.label}
            onClick={() => setActivePage(item.label)}
            style={{
              ...styles.smallMenuItem,
              backgroundColor: activePage === item.label ? "#eebbc3" : "transparent",
              color: activePage === item.label ? "#232946" : "#fff"
            }}
          >
            {item.icon}
          </div>
        ))}

        {/* 🚪 Logout Icon */}
        <div
          title="Logout"
          onClick={onLogout}
          style={{
            ...styles.smallMenuItem,
            marginTop: "auto",
            color: "#eebbc3",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🚪
        </div>
      </div>

      {/* Right Sidebar with Labels */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>EmployeeMS</div>

        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => setActivePage(item.label)}
            style={{
              ...styles.menuItem,
              backgroundColor: activePage === item.label ? "#eebbc3" : "transparent",
              color: activePage === item.label ? "#232946" : "#fff"
            }}
          >
            {item.icon}
            <span style={{ marginLeft: "8px" }}>{item.label}</span>
          </div>
        ))}

        {/* 🚪 Logout Button */}
        <div
          onClick={onLogout}
          style={{
            ...styles.menuItem,
            marginTop: "auto",
            color: "#eebbc3",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          🚪 Logout
        </div>
      </div>
    </div>
  );
}

const styles = {
  smallMenu: {
    width: "60px",
    background: "#1b1f3a",
    color: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "20px",
    position: "fixed",
    top: 0,
    left: 0
  },
  smallMenuItem: {
    cursor: "pointer",
    fontSize: "1.4em",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "6px",
    textAlign: "center",
    width: "100%",
    transition: "background 0.2s ease"
  },
  sidebar: {
    width: "160px",
    background: "#232946",
    color: "#fff",
    minHeight: "100vh",
    paddingTop: "20px",
    position: "fixed",
    top: 0,
    left: "60px",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.4em",
    textAlign: "center",
    marginBottom: "30px"
  },
  menuItem: {
    padding: "12px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background 0.2s ease"
  }
};

export default Sidebar;