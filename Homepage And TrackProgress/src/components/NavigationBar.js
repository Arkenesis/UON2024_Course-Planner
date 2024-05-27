// src/components/NavigationBar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ProfileDropdown from './ProfileDropdown.js';
import './NavigationBar.css';

const NavigationBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="navbar">
      <img src="uonlogo.png" alt="Company Logo" className="logo" />

      <div className="navbar-left">
        <a href="#home" >Home</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
      
      <div className="navbar-right">
        <input type="text" placeholder="Search" className="search-bar" />
        <FontAwesomeIcon icon={faSearch} className="search-icon" style={{cursor:"pointer"}} />
        <div className="profile-section" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
          {dropdownOpen && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
