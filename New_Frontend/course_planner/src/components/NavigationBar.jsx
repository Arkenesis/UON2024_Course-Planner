// src/components/NavigationBar.js
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ProfileDropdown from './ProfileDropdown.jsx';
import { Link, NavLink } from "react-router-dom";
import './NavigationBar.css';

const NavigationBar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return() => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="navbar">
      <Link to="/" onClick={scrollToTop}>
        <img src="uonlogo.png" alt="UON Logo" className="logo" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about-us">About</Link></li>
        <li><Link to="/plan-your-path">Plan Your Path</Link></li>
      </ul>

      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} className="search-icon"/>  
        <input type="text" placeholder="Search" className="search-bar" style={{border: "none"}} />
      </div>

      <div className="profile-section" ref={menuRef}>
        {dropdownOpen && <ProfileDropdown />}
        <FontAwesomeIcon icon={faUserCircle} className="profile-icon" onClick={toggleDropdown} />
      </div>
  </div>
  );
};

export default NavigationBar;
