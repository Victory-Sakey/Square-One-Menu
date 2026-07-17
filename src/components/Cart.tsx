"use client";

import React, { useState } from "react";
import { MenuItem } from "./Menu";

interface CartProps {
  cart: { item: MenuItem; quantity: number }[];
  updateQuantity: (id: string, delta: number) => void;
}

export default function Cart({ cart, updateQuantity }: CartProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  );

  return (
    <>
      {/* Floating Cart Button */}
      <button
        className="cart-toggle glass-panel"
        onClick={() => setIsOpen(true)}
      >
        <span className="cart-icon">🛒</span>
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </button>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar glass-panel ${isOpen ? "open" : ""}`}>
        <div className="cart-header flex-between">
          <h3>Your Order</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-msg">Your cart is empty.</p>
          ) : (
            cart.map((c) => (
              <div key={c.item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{c.item.name}</span>
                  <span className="item-price">
                    ${(c.item.price * c.quantity).toFixed(2)}
                  </span>
                </div>
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(c.item.id, -1)}>-</button>
                  <span>{c.quantity}</span>
                  <button onClick={() => updateQuantity(c.item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="flex-between" style={{ marginBottom: "1rem" }}>
            <span>Total:</span>
            <span className="total-price">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            disabled={cart.length === 0}
            onClick={() => alert("Checkout not implemented in demo")}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)}></div>
      )}

      <style jsx>{`
        .cart-toggle {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          z-index: 100;
          cursor: pointer;
          transition: transform var(--transition-fast);
        }
        .cart-toggle:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-glow);
        }
        .cart-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: var(--color-orange);
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          font-size: 0.8rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-sidebar {
          position: fixed;
          top: 0;
          right: -400px;
          width: 100%;
          max-width: 400px;
          height: 100vh;
          background: var(--bg-tertiary);
          z-index: 1000;
          transition: right var(--transition-normal);
          display: flex;
          flex-direction: column;
          border-radius: 0;
          border-left: 1px solid var(--border-color);
        }
        .cart-sidebar.open {
          right: 0;
        }

        .cart-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        .close-btn {
          background: none;
          color: var(--text-primary);
          font-size: 2rem;
          line-height: 1;
        }
        .close-btn:hover {
          color: var(--color-orange);
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }
        .empty-msg {
          color: var(--text-secondary);
          text-align: center;
          margin-top: 2rem;
        }
        .cart-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .item-info {
          display: flex;
          justify-content: space-between;
          font-weight: 600;
        }
        .item-price {
          color: var(--color-orange);
        }
        .qty-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          align-self: flex-start;
        }
        .qty-controls button {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qty-controls button:hover {
          border-color: var(--color-orange);
          color: var(--color-orange);
        }

        .cart-footer {
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
        }
        .total-price {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--color-orange);
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 900;
        }
      `}</style>
    </>
  );
}
