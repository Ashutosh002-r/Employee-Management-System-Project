import React, { useState, useEffect } from "react";

function EmployeeForm({ onAdd, onUpdate, editingEmployee, categories = [] }) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    role: "employee",
    category: "",
    salary: "",
    photo: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    } else {
      setEmployee({
        name: "",
        email: "",
        role: "employee",
        category: "",
        salary: "",
        photo: ""
      });
    }
    setErrors({});
  }, [editingEmployee]);

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: null }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployee((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const err = {};
    if (!employee.name.trim()) err.name = "Name is required";
    if (!employee.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(employee.email)) err.email = "Invalid email";
    if (!employee.category) err.category = "Please select a category";
    if (!employee.salary || isNaN(employee.salary) || employee.salary <= 0)
      err.salary = "Salary must be positive";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const emp = {
      ...employee,
      salary: Number(employee.salary),
      photo: employee.photo || ""
    };

    editingEmployee ? onUpdate(emp) : onAdd(emp);

    setEmployee({
      name: "",
      email: "",
      role: "employee",
      category: "",
      salary: "",
      photo: ""
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>
        {editingEmployee ? "Edit Employee" : "Add Employee"}
      </h2>

      {}
      <div style={styles.field}>
        <label style={styles.label}>Name</label>
        <input
          name="name"
          type="text"
          value={employee.name}
          onChange={handleChange}
          style={{
            ...styles.input,
            borderColor: errors.name ? "#e74c3c" : "#ccc"
          }}
          placeholder="Enter full name"
        />
        {errors.name && <small style={styles.error}>{errors.name}</small>}
      </div>

      {}
      <div style={styles.field}>
        <label style={styles.label}>Email</label>
        <input
          name="email"
          type="email"
          value={employee.email}
          onChange={handleChange}
          placeholder="Enter email"
          style={{
            ...styles.input,
            borderColor: errors.email ? "#e74c3c" : "#ccc"
          }}
        />
        {errors.email && <small style={styles.error}>{errors.email}</small>}
      </div>

      {}
      <div style={styles.field}>
        <label style={styles.label}>Role</label>
        <select
          name="role"
          value={employee.role}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {}
      <div style={styles.field}>
        <label style={styles.label}>Category</label>
        <select
          name="category"
          value={employee.category}
          onChange={handleChange}
          style={{
            ...styles.select,
            borderColor: errors.category ? "#e74c3c" : "#ccc"
          }}
        >
          <option value="">Select Category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <small style={styles.error}>{errors.category}</small>}
      </div>

      {}
      <div style={styles.field}>
        <label style={styles.label}>Salary (₹)</label>
        <input
          name="salary"
          type="number"
          value={employee.salary}
          onChange={handleChange}
          placeholder="Enter salary"
          style={{
            ...styles.input,
            borderColor: errors.salary ? "#e74c3c" : "#ccc"
          }}
        />
        {errors.salary && <small style={styles.error}>{errors.salary}</small>}
      </div>

      {}
      <div style={styles.field}>
        <label style={styles.label}>Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          style={styles.input}
        />
        {employee.photo && (
          <img
            src={employee.photo}
            alt="Preview"
            style={styles.photoPreview}
          />
        )}
      </div>

      <button type="submit" style={styles.button}>
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
    maxWidth: "360px",
    width: "100%"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#232946"
  },
  field: {
    marginBottom: "16px"
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "6px"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    fontSize: "14px"
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1.5px solid #ccc",
    fontSize: "14px"
  },
  photoPreview: {
    marginTop: "10px",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "1px solid #ccc"
  },
  error: {
    color: "#e74c3c",
    fontSize: "13px",
    marginTop: "4px"
  },
  button: {
    width: "100%",
    backgroundColor: "#232946",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer"
  }
};

export default EmployeeForm;