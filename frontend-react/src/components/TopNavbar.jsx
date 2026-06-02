import React from 'react';

const TopNavbar = ({ onNavigate }) => {
  return (
    <div className="top-navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', width: '100%' }}>
      <div className="logo-container" onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <ion-icon name="restaurant-outline" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}></ion-icon>
        <span className="website-name">DineZen</span>
      </div>
      <div className="admin-icon" onClick={() => onNavigate && onNavigate('admin')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Admin Panel">
        <ion-icon name="settings-outline" style={{ fontSize: '1.5rem', color: 'var(--textSecondary)' }}></ion-icon>
      </div>
    </div>
  );
};

export default TopNavbar;
