// src/components/ProfileDropdown.js
import React from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      <div className="profile-info">
        <img src="profilepic.png" alt="Profile" className="profile-pic" />
        <div>
          <p>Full Name: Miley Cyrus</p>
          <p>Role: Student</p>
        </div>
      </div>
      <div className="dropdown-options">
        <a href="#profile-settings">Profile Settings</a>
        <a href="#sign-out">Sign Out</a>
      </div>
    </div>
  );
};

export default ProfileDropdown;
