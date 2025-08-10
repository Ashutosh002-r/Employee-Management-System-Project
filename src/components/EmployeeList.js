import React from "react";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee List</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Photo</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Salary (₹)</th>
            {onEdit && <th style={styles.th}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={onEdit ? 7 : 6} style={styles.empty}>
                No employees to display
              </td>
            </tr>
          ) : (
            employees.map((emp, index) => (
              <tr
                key={emp.email || index}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td style={styles.td}>
                  {emp.photo ? (
                    <img
                      src={emp.photo}
                      alt={'Profile of ${emp.name}'}
                      style={styles.photoThumb}
                    />
                  ) : (
                    <div style={styles.noPhoto}>N/A</div>
                  )}
                </td>
                <td style={styles.td}>{emp.name}</td>
                <td style={styles.td}>{emp.email}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      background: emp.role === "manager" ? "#3366cc" : "#2ecc71"
                    }}
                  >
                    {emp.role}
                  </span>
                </td>
                <td style={styles.td}>{emp.category || "--"}</td>
                <td style={styles.td}>₹{emp.salary}</td>
                {onEdit && (
                  <td style={styles.td}>
                    <button onClick={() => onEdit(emp)} style={styles.editBtn}>✏</button>
                    <button onClick={() => onDelete(emp.email)} style={styles.deleteBtn}>🗑</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { width: "100%", overflowX: "auto" },
  heading: { marginBottom: "16px", fontSize: "20px", color: "#232946" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    borderRadius: "8px",
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)"
  },
  th: {
    backgroundColor: "#232946",
    color: "#fff",
    padding: "12px 18px",
    textAlign: "left",
    fontWeight: "600"
  },
  td: {
    padding: "12px 18px",
    fontSize: "15px"
  },
  rowEven: { backgroundColor: "#f9faff" },
  rowOdd: { backgroundColor: "#ffffff" },
  badge: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "13px",
    textTransform: "capitalize"
  },
  photoThumb: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #ccc"
  },
  noPhoto: { fontStyle: "italic", color: "#999" },
  editBtn: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    marginRight: "6px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  empty: {
    textAlign: "center",
    fontStyle: "italic",
    padding: "20px",
    color: "#888"
  }
};

export default EmployeeList;