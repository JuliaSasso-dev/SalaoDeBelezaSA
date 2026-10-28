import React from 'react';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const menuItems = [
    { label: 'Início', href: '#home' },
    { label: 'Serviços & Preços', href: '#servicos' },
  ];

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose} 
      />
      <aside className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">Lumière.</span>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="sidebar-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-footer">
          © {new Date().getFullYear()} Salão Belle&Co.
        </div>
      </aside>
    </>
  );
}