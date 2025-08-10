import React, { useState } from "react";

function CategoryManager({ categories, setCategories }) {
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = () => {
    const trimmed = newCategory.trim();
    if (trimmed === "") return;
    if (categories.includes(trimmed)) return;

    setCategories(prev => [...prev, trimmed]);
    setNewCategory("");
  };

  const handleRemove = (name) => {
    const updated = categories.filter(cat => cat !== name);
    setCategories(updated);
  };

  return (
    <div style={{ marginTop: "20px", maxWidth: "400px" }}>
      <h2>Manage Categories</h2>
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter category (e.g., HR)"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <button onClick={handleAdd} style={addBtn}>Add</button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat} style={listItem}>
            <span>{cat}</span>
            <button onClick={() => handleRemove(cat)} style={deleteBtn}>
              🗑
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const addBtn = {
  background: "#232946",
  color: "#fff",
  padding: "8px 14px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const deleteBtn = {
  background: "transparent",
  color: "#e74c3c",
  border: "none",
  fontSize: "16px",
  cursor: "pointer"
};

const listItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid #eee"
};

export default CategoryManager;