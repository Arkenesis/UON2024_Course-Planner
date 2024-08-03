import React, { useState, useEffect } from "react";
import "./AdminNav.scss";
import databaseImg from "../../assets/databaseImg.png";
import imageIcon from "../../assets/imageIcon.png";
import profileImg2 from "../../assets/profileImg2.png";
import folderIcon from "../../assets/folderIcon.png";
import pageIcon from "../../assets/pageIcon.png";
import AdminAboutUs from "../../pages/Admin_Pages/AdminAboutUs/AdminAboutUs";
import AboutUs from "../../pages/AboutUs/AboutUs";
import AdminTerm from "../../pages/Admin_Pages/AdminTerm/AdminTerm";
import Login from "../../pages/login/Login";
import EditLoginPage from "../../pages/EditLoginPage/EditLoginPage";
import EditRegisterPage from "../../pages/EditRegisterPage/EditRegisterPage";
import HomePage from "../../pages/HomePage/HomePage";
import AdminPolicy from "../../pages/Admin_Pages/AdminPolicy/AdminPolicy";
import courseM from "../../assets/courseM.png";
import courseAssign from "../../assets/courseAssign.png";
import courseManagment from "../../assets/courseManagment.png";
import Page from "../../assets/Page.png";
import AdminSettings from "../../assets/AdminSettings.png";
import EditCourse from "../../pages/Admin_Pages/EditCourse/EditCourse"
import EditProgram from "../../pages/Admin_Pages/EditProgram/EditProgram";
import EditAccount from "../../pages/Admin_Pages/editstudent/EditStudent";
import EditNavBar from "../../pages/Admin_Pages/EditNavBar/EditNavBar";
import EditFooter from "../../pages/Admin_Pages/EditFooter/EditFooter";

const Images = [
  { id: 1, name: "Logo" },
  { id: 2, name: "Building Background" },
  { id: 3, name: "email" },
  { id: 4, name: "phone" },
];

export default function DatabaseLink(showPage) {
  const [page, setPage] = useState(null);

  function showPage() {
    switch (page) {
      case "CourseManagement":
        return <EditCourse/>;
      case "ProgramManagment":
        return <EditProgram />;
      case "AccountManagment":
        return <EditAccount />;
      case "adminAboutUs":
        return <AdminAboutUs />;
      case "About Us":
        return <AdminAboutUs />;
      case "Privacy":
        return <AdminPolicy />;
      case "Term":
        return <AdminTerm />;
      case "Log-in":
        return <EditLoginPage />;
      case "Register":
        return <EditRegisterPage />;
      case "Navigation bar":
        return <EditNavBar />;
      case "Footer":
        return <EditFooter/>;
      default:
        return null;
    }
  }

      // case "Home page":
      //   return <HomePage />;
      // case "Footer":
      //   return;
  const [isOpen, setIsOpen] = useState(false);

  const options = [ "About Us", "Privacy", "Term", "Log-in", "Register", "Navigation bar", "Footer"];

  const [images, setImages] = useState(Images);

  const [query, setQuery] = useState("");

  const filterCourses = images.filter((image) =>
    image.name.includes(query.toLowerCase())
  );

  const [showDropdown, setShowDropDown] = useState(false);

  return (
    <div className="databaseNav">
      <div className="dataBaseBtn">
        <button className="dbsBtn" onClick={() => setPage("CourseManagement")}>
          <div className="dbsLink">
            <img className="rightImg" src={courseAssign} />
            <div className="adminText">Course Management</div>
          </div>
        </button>

        <button className="dbsBtn" onClick={() => setPage("ProgramManagment")}>
          <div className="dbsLink">
            <img className="rightImg" src={courseManagment} />
            <div className="adminText">Program Management</div>
          </div>
        </button>

        <button className="dbsBtn" onClick={() => setPage("AccountManagment")}>
          <div className="dbsLink">
            <img className="rightImg" src={AdminSettings} />
            <div className="adminText">Account Management</div>
          </div>
        </button>

        <div className="dbsBtn" onClick={() => setIsOpen(!isOpen)}>
          <img className="rightImg" src={Page} />
          <div className="webpageM">
            <div className="adminText">Webpage Management</div>
          </div>
          {isOpen && (
            <div className="optionBox">
              {options.map((option) => (
                <button className="optionsBtn" key={option} onClick={() => setPage(option)}> {option} </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="displayPopup">
        {page && (
          <div className="showPagePop">
            {showPage()}
          </div>
        )}
      </div>
    </div>
  );
}
