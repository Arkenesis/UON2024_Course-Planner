// src/components/ProfileDropdown.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUserCircle, faSignOutAlt, } from "@fortawesome/free-solid-svg-icons";
import "./ProfileDropdown.css";
import axios from "axios";
import EditProfileModal from "./editprofilemodal/EditProfileModal";
import { instance } from "../App";

const ProfileDropdown = ({ userinfo }) => {

  const [profileVisibility, setProfileVisibility] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/users/logout");
      localStorage.removeItem("user");
      window.location.reload();
    } catch (ex) {
      console.log(ex.response?.data);
    }
  };

  const toggleProfile = () => {
    setProfileVisibility(prev => !prev);
  }

  return (
    <div className="profile-dropdown">
      <div className="profile-info">
        <FontAwesomeIcon icon={faUserCircle} className="profile-pic" />
        <div className="profile-text">
          <span className="profile-name">
            {userinfo?.firestore_data.username}
          </span>
          <span className="profile-role">{userinfo?.firestore_data.roles}</span>
        </div>
      </div>
      <div className="profile-option" onClick={toggleProfile}>
        <FontAwesomeIcon icon={faCog} className="profile-option-icon" />
        <span>Profile Settings</span>
      </div>

      {profileVisibility && <EditProfileModal onClose={toggleProfile} userInfo={userinfo}/>}

      <div className="profile-option" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="profile-option-icon" />
        <span>Sign Out</span>
      </div>
    </div>
  );
};

export default ProfileDropdown;
