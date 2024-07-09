// src/components/ProfileDropdown.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      <div className="profile-info">
        <FontAwesomeIcon icon={faUserCircle} className="profile-pic" />
        <div className="profile-text">
          <span className="profile-name">Miley Cyrus</span>
          <span className="profile-role">Student</span>
        </div>
      </div>
      <div className="profile-option">
        <FontAwesomeIcon icon={faCog} className="profile-option-icon" />
        <span>Profile Settings</span>
      </div>
      <div className="profile-option">
        <FontAwesomeIcon icon={faSignOutAlt} className="profile-option-icon" />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default ProfileDropdown;
