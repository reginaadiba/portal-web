"use client";

import { useState } from "react";

export default function NewCategory() {
  const [name, setName] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();

    await fetch("http://localhost:3001/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    window.location.href = "/categories";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add Category</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
