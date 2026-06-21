import React from 'react';

const Navigation = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'landing', label: 'Home', icon: 'home-outline' },
    { id: 'menu', label: 'Menu', icon: 'restaurant-outline' },
    { id: 'orders', label: 'Orders', icon: 'receipt-outline' },
    { id: 'bill', label: 'Wait Bill', icon: 'card-outline' }
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <header className="mobile-top-header">
        <div className="logo-container" onClick={() => onNavigate('home')}>
          <ion-icon name="restaurant-outline" style={{ fontSize: '1.8rem', color: 'var(--primary)' }}></ion-icon>
          <span className="website-name">DineZen</span>
        </div>
        <div 
          className={`admin-icon-btn ${activePage === 'admin' ? 'active' : ''}`} 
          onClick={() => onNavigate('admin')}
          title="Admin Panel"
        >
          <ion-icon name="settings-outline" style={{ fontSize: '1.5rem' }}></ion-icon>
        </div>
      </header>

      {/* Main Responsive Navigation Shell */}
      <aside className="navigation-aside glass">
        {/* Desktop Sidebar Top Logo */}
        <div className="sidebar-logo-container" onClick={() => onNavigate('home')}>
          <ion-icon name="restaurant-outline" className="sidebar-logo-icon"></ion-icon>
          <span className="sidebar-website-name">DineZen</span>
        </div>

        {/* Sidebar Middle Nav Links (which becomes Bottom Nav Links on Mobile) */}
        <nav className="nav-links-container">
          {navItems.map((item) => {
            const isActive = activePage === item.id || (item.id === 'landing' && activePage === 'home');
            return (
              <div
                key={item.id}
                className={`nav-item-link ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <ion-icon name={item.icon}></ion-icon>
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>

        {/* Desktop Sidebar Bottom Admin Button */}
        <div className="sidebar-footer">
          <div 
            className={`sidebar-admin-link ${activePage === 'admin' ? 'active' : ''}`}
            onClick={() => onNavigate('admin')}
            title="Admin Panel"
          >
            <ion-icon name="settings-outline"></ion-icon>
            <span>Settings</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;
