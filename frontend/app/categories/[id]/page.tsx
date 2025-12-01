"use client";

import { useEffect, useState } from "react";

export default function EditCategory({ params }: any) {
  const { id } = params;
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/categories/${id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [id]);

  const update = async (e: any) => {
    e.preventDefault();

    await fetch(`http://localhost:3001/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    window.location.href = "/categories";
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Category</h1>

      <form onSubmit={update}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
