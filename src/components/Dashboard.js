import React from "react";

function Dashboard({ employees }) {
  const totalEmployees = employees.length;

  const totalManagers = employees.filter(
    (emp) => emp.role && emp.role.toLowerCase() === "manager"
  ).length;

  const totalSalary = employees.reduce(
    (sum, emp) => sum + (Number(emp.salary) || 0),
    0
  );

  return (
    <div style={styles.container}>
      <div style={styles.cardRow}>
        <div style={styles.card}>
          <div style={styles.title}>Total Employees</div>
          <div style={styles.value}>{totalEmployees}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.title}>Total Managers</div>
          <div style={styles.value}>{totalManagers}</div>
        </div>
        <div style={styles.card}>
          <div style={styles.title}>Total Salary</div>
          <div style={styles.value}>₹{totalSalary}</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column"
  },
  cardRow: {
    display: "flex",
    gap: "24px",
    flexWrap: "wrap"
  },
  card: {
    flex: "1 1 250px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#555",
    marginBottom: "8px"
  },
  value: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#232946"
  }
};

export default Dashboard;