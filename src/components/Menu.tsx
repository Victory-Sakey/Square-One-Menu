"use client";

import React, { useEffect, useState } from "react";
import Cart from "./Cart";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.item.id === id ? { ...c, quantity: c.quantity + delta } : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  return (
    <div className="menu-container">
      <div className="menu-header flex-between">
        <h2 className="animate-fade-in" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Our Menu</h2>
      </div>

      {loading ? (
        <div className="flex-center" style={{ height: "40vh" }}>
          <div className="spinner">Loading deliciousness...</div>
        </div>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <div key={item.id} className="card glass-panel animate-fade-in">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="card-content">
                <div className="flex-between" style={{ marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{item.name}</h3>
                  <span className="price">${item.price.toFixed(2)}</span>
                </div>
                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                  {item.description}
                </p>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Cart cart={cart} updateQuantity={updateQuantity} />

      <style jsx>{`
        .menu-container {
          position: relative;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-normal);
        }
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(255, 106, 0, 0.2);
        }
        .card-image {
          height: 200px;
          background-size: cover;
          background-position: center;
        }
        .card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .price {
          color: var(--color-orange);
          font-weight: 700;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
