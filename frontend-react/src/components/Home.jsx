import React from 'react';

const Home = ({ onOrderNow }) => (
  <div className="home-container">
    <div className="glass home-card">
      <div className="home-content">
        <ion-icon name="restaurant-outline" className="home-icon"></ion-icon>
        <h1 className="home-logo">DineZen</h1>
        <p className="home-subtitle">
          Experience the future of fine dining. Digital convenience meets gourmet excellence.
        </p>
        <button className="order-now-btn" onClick={onOrderNow}>
          ORDER NOW
        </button>
      </div>
    </div>
  </div>
);

export default Home;
