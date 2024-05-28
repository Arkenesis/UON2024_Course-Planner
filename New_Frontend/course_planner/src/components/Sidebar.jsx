// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="hamburger" onClick={toggleSidebar}>
        ☰
      </div>
      <a href="#track-progress">Track progress</a>
      <a href="#plan-path">Plan Your Path</a>
    </div>
  );
};

export default Sidebar;
