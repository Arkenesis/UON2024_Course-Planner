// src/components/NavigationBar.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ProfileDropdown from './ProfileDropdown.jsx';
import { Link, NavLink } from "react-router-dom";
import './NavigationBar.css';
import { UserContext } from '../pages/login/LoginContext.jsx';
import axios from 'axios';
import uonLogo from '../assets/uonLogo.jpg';
import { instance } from '../App.jsx';

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

  const { user } = useContext(UserContext);

  const [nav, setNav] = useState({
    backgroundColor: "00508B",
    logo: uonLogo,
    items: [],
  });

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    try{
      const { data } = await instance.get("/pages/navigation");
      const { backgroundColor, logo, items } = data.message;
      setNav({backgroundColor, logo, items});
    }
    catch(error){
      setErr(error.response);
    }
  }

  return (
    <div className="navbar" style={{backgroundColor: nav.backgroundColor}}>
      {!user 
      ?
      <Link to="/login" onClick={scrollToTop}>
        <img src={nav.logo} alt="UON Logo" className="logo" />
      </Link>
      :
      <Link to="/home" onClick={scrollToTop}>
        <img src={nav.logo} alt="UON Logo" className="logo" />
      </Link>
      }
      
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        {user && <li><Link to="/plan-your-path">Plan Your Path</Link></li>}
        {user && <li><Link to="/track-progress">Track Progress</Link></li>}
        <li><Link to="/contact">Contact</Link></li>
        {nav.items && nav.items.map((i, idx) => (
          i.visibility === true &&
          <li key={idx}><Link to={`/${i.id}`}>{i.title}</Link></li>
        ))}
        {/* <li><Link to="/about-us">About</Link></li> */}
      </ul>

      {/* <div className="search-box">
        <FontAwesomeIcon icon={faSearch} className="search-icon"/>  
        <input type="text" placeholder="Search" className="search-bar" style={{border: "none"}} />
      </div> */}

      {user 
      ? (<div className="profile-section" ref={menuRef}>
          {dropdownOpen && <ProfileDropdown userinfo={user}/>}
          <FontAwesomeIcon icon={faUserCircle} className="profile-icon" onClick={toggleDropdown} />
         </div>)
      : <Link to="/login"><FontAwesomeIcon icon={faUserCircle} className="profile-icon"/></Link>
      }

  </div>
  );
};

export default NavigationBar;
