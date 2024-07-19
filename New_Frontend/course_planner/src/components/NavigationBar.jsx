// src/components/NavigationBar.js
import React, { useState, useRef, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ProfileDropdown from './ProfileDropdown.jsx';
import { Link, NavLink } from "react-router-dom";
import './NavigationBar.css';
import { UserContext } from '../pages/login/LoginContext.jsx';
import axios from 'axios';

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

  // useEffect(() => {
  //   let handler = (e)=>{
  //     if(!menuRef.current.contains(e.target)){
  //       setDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handler);

  //   return() => {
  //     document.removeEventListener("mousedown", handler);
  //   }
  // });

  const { user } = useContext(UserContext);

  const [programs, setPrograms] = useState(null);

  useEffect(() => {
      getAvailableProgram();
  }, [])

  const getAvailableProgram = async () => {
    if(!user){
      return;
    }
    try{
        const { data } = await axios.get("http://localhost:8080/pages/programs");
        setPrograms(data.message);
    }
    catch(error){
        console.log(error.response?.data);
    }
  };

  return (
    <div className="navbar">
      {!user 
      ?
      <Link to="/login" onClick={scrollToTop}>
        <img src="uonlogo.png" alt="UON Logo" className="logo" />
      </Link>
      :
      <Link to="/home" onClick={scrollToTop}>
        <img src="uonlogo.png" alt="UON Logo" className="logo" />
      </Link>
      }
      
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        {user && <li><Link to="/plan-your-path">Plan Your Path</Link></li>}
        {user && <li><Link to="/track-progress">Track Progress</Link></li>}
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about-us">About</Link></li>
      </ul>

      <div className="search-box">
        <FontAwesomeIcon icon={faSearch} className="search-icon"/>  
        <input type="text" placeholder="Search" className="search-bar" style={{border: "none"}} />
      </div>

      {user 
      ? (<div className="profile-section" ref={menuRef}>
          {dropdownOpen && <ProfileDropdown userinfo={user} programs={programs}/>}
          <FontAwesomeIcon icon={faUserCircle} className="profile-icon" onClick={toggleDropdown} />
         </div>)
      : <Link to="/login"><FontAwesomeIcon icon={faUserCircle} className="profile-icon"/></Link>
      }

  </div>
  );
};

export default NavigationBar;
