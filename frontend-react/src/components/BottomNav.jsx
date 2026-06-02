import React from 'react';

const BottomNav = ({ active, onNavigate }) => (
  <nav className="bottom-nav glass">
    <div
      className={`nav-item ${active === "home" ? "active" : ""}`}
      onClick={() => onNavigate("landing")}
    >
      <ion-icon name="home-outline"></ion-icon>
      <span>Home</span>
    </div>
    <div
      className={`nav-item ${active === "menu" ? "active" : ""}`}
      onClick={() => onNavigate("menu")}
    >
      <ion-icon name="restaurant-outline"></ion-icon>
      <span>Menu</span>
    </div>
    <div
      className={`nav-item ${active === "orders" ? "active" : ""}`}
      onClick={() => onNavigate("orders")}
    >
      <ion-icon name="receipt-outline"></ion-icon>
      <span>Orders</span>
    </div>
    <div
      className={`nav-item ${active === "bill" ? "active" : ""}`}
      onClick={() => onNavigate("bill")}
    >
      <ion-icon name="card-outline"></ion-icon>
      <span>Wait Bill</span>
    </div>
  </nav>
);

export default BottomNav;
