import React, { useState, useEffect, useContext } from "react";
import "./AdminNav.scss";
import databaseImg from "../../assets/databaseImg.png";
import DatabaseLink from "./DatabaseLink";
import AdminAssets from "./AdminAssets";
import profilePic from "../../assets/profilePic.png";
import picture from "../../assets/picture.png";
import profSettings from "../../assets/profSettings.png";
import signOut from "../../assets/signOut.png";
import { UserContext } from "../../pages/login/LoginContext";
import axios from "axios";

export const AdminNav = (page) => {

  const [showProfile, setShowProfile] = useState(false);

  const [leftNav, setLeftNav] = useState(null);

  function showNav() {
    switch (leftNav) {
      case "databaseLink":
        return <DatabaseLink />;

      case "adminAssets":
        return <AdminAssets />;

      default:
        return <AdminAssets />;
    }
  }

  const { user } = useContext(UserContext);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/logout");
      localStorage.removeItem("user");
      window.location.reload();
    } catch (ex) {
      console.log(ex.response?.data);
    }
  };

  return (
    <div className="adminHomePage">
      <div className="adminNav">
        <div className="leftNav">
          <div className="mainAdminNav">
            <img
              className="leftImgProfile"
              src={profilePic}
              alt="Database img"
              onClick={() => setShowProfile(!showProfile)}
            />
          </div>
          {showProfile && (
            <div className="profilePage">

              <div className="profileData">
                <img src={profilePic} alt="profile picture" />
                <div className="userName">{user?.firestore_data.username}</div>
              </div>

              {/* <div className="profileSettings">
                <img src={profSettings} alt="profile settings" /> Profile Settings
              </div> */}

              <div className="signOut" onClick={(e) => handleLogout(e)}>
                <img src={signOut} alt="sign out" />
                <div className="signOut-desc">Sign Out</div>
              </div>
              
            </div>
          )}
          <div
            className="mainAdminNav"
            onClick={() => setLeftNav("databaseLink")}>
            <img className="leftImg" src={databaseImg} alt="Database img" />
          </div>

          <div
            className="mainAdminNav"
            onClick={() => setLeftNav("adminAssets")}>
            <img className="leftImg" src={picture} alt="Database img" />
          </div>
        </div>
        <div className="rightNav">
          <div>
            {leftNav && <>{showNav()}</>}
          </div>
        </div>
      </div>
    </div>
  );
};
