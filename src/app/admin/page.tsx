"use client";

import React, { useState } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (res.ok) {
        setMessage("Menu item added successfully!");
        setFormData({ name: "", price: "", description: "", image: "" });
      } else {
        setMessage("Failed to add item.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 24px" }}>
      <div className="admin-card glass-panel animate-fade-in" style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
        <h1 style={{ marginBottom: "2rem", color: "var(--color-orange)", textAlign: "center" }}>
          Square One Admin
        </h1>
        
        {message && (
          <div style={{ padding: "1rem", marginBottom: "1.5rem", borderRadius: "8px", background: "rgba(255,255,255,0.1)", textAlign: "center" }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Item Name</label>
            <input
              type="text"
              name="name"
              required
              className="input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Spicy Chicken Sandwich"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Price ($)</label>
            <input
              type="number"
              name="price"
              required
              step="0.01"
              className="input"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 14.99"
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Description</label>
            <textarea
              name="description"
              required
              className="input"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Delicious ingredients..."
              style={{ resize: "vertical" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Image URL</label>
            <input
              type="url"
              name="image"
              required
              className="input"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: "1rem" }}>
            {loading ? "Adding..." : "Add to Menu"}
          </button>
        </form>
        
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href="/" style={{ textDecoration: "underline", color: "var(--text-secondary)" }}>
            ← Back to Customer Menu
          </a>
        </div>
      </div>
    </div>
  );
}
