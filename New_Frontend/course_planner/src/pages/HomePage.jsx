import React, { useContext, useEffect, useState } from "react";
import courseCompleted from "../../assets/courseCompleted.png";
import myInfo from "../../assets/myInfo.png";

import "./HomePage.scss";
import NavigationBar from "../components/NavigationBar";
import { UserContext } from "./login/LoginContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const currentDate = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getCurrentCourses();
  }, []);

  // To put a comma in the date:
  const formattedDate = currentDate.replace(/ (\d{2})/, " $1");

  const { user } = useContext(UserContext);

  const [currentCourses, setCurrentCourses] = useState([]);

  const getCurrentCourses = () => {
    let courses = user.courses;
    if (courses) {
      const currentYear = new Date().getFullYear();
      let currentCourses = [];

      for(let i = 0; i< courses.length; i++){
        const { term, course: courseDetails, year } = courses[i];
        let currentTrimester = getCurrentTrimester();
        if (currentTrimester === term && currentYear === year){
          currentCourses.push(...courseDetails.filter((detail) => detail[0]));
        }
      }
      setCurrentCourses(currentCourses);
    }
  }

  const getAmountCompletedCourse = () => {
    let courses = user.courses;
    if (courses) {
      let completed = 0;
      let total = 0;
      let currentTrimester = getCurrentTrimester();
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      let currentCourses = [];
      for(let i = 0; i< courses.length; i++){
        const { term, year, course: courseDetails } = courses[i];
        for(let j = 0; j<courseDetails.length; j++){
          if (currentYear >= year && term < currentTrimester){
            if(courseDetails[j]){
              completed++;
            }
          }
          if(courseDetails[j]){
            total++;
          }
        }

      }
      return { completed, total };
    }
    return { completed: 0, total: 0 };
  }

  const getCurrentTrimester = () => {
    let currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 1 && currentMonth <= 4){
      return 1;
    }
    if (currentMonth >= 5 && currentMonth <= 8){
      return 2;
    }
    if (currentMonth >= 9){
      return 3;
    }
  }

  const { completed, total } = getAmountCompletedCourse();
  const progress_bar = total > 0 ? (completed / total) * 100 : 0;

  return (
    <>
      <div className="course-activity">
        {user?.firestore_data.program == undefined && ( <div className="alert-notification"> Kindly setup Program information in Profile Settings! </div> )}
        {user?.firestore_data.start_date == undefined && ( <div className="alert-notification"> Kindly setup Start Date information in Profile Settings! </div> )}
        {user?.firestore_data.end_date == undefined && ( <div className="alert-notification"> Kindly setup End Date information in Profile Settings! </div> )}
        {user?.firestore_data.campus == undefined && ( <div className="alert-notification"> Kindly setup Campus information in Profile Settings! </div> )}
        {user?.firestore_data.level == undefined && ( <div className="alert-notification"> Kindly setup Level information in Profile Settings! </div> )}
        {total === 0 && ( <div className="alert-notification"> You are not taking any courses, please proceed to Plan Your Path to start your journey! </div> )}
        <h1 style={{ opacity: "0.47" }}>Course Activity</h1>
        <p className="current-date" style={{ color: "#1577BD" }}>
          <b>{formattedDate}</b>
        </p>
        <div className="course-info">
          <div className="course-completed">
            <div className="cardd">
              <div className="left">
                <img
                  src={courseCompleted}
                  alt="course completed icon"
                  width="80"
                  style={{ float: "left" }}
                />
              </div>
              <div className="right">
                <h2>Course Completed</h2>
                <p style={{ marginBottom: "-10px" }}>
                  <b>Enrolled</b>
                </p>
                <p style={{ marginBottom: "-10px", fontSize: "smaller" }}>
                  {user?.firestore_data.program}
                </p>
                <p style={{ fontSize: "smaller" }}>
                  {user?.firestore_data.start_date
                    ? `${user?.firestore_data.start_date} till ${user?.firestore_data.end_date}`
                    : ``}
                </p>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress_bar}%` }}></div>
              </div>
              <p style={{ marginLeft: "10px", fontSize: "smaller" }}>{completed}/{total}</p>
            </div>
            <Link to="../track-progress" className="DetailButton">Detail</Link>
          </div>
        </div>

        <div className="course-info">
          <div className="my-info">
            <div className="cardd">
              <div className="left">
                <img
                  src={myInfo}
                  alt="myInfo icon"
                  width="80"
                  style={{ float: "left" }}
                />
              </div>
              <div className="right">
                <h2>My Info</h2>
                <p style={{ marginBottom: "-10px" }}>
                  <b>{user?.firestore_data.username}</b>
                </p>
                <p style={{ fontSize: "smaller" }}>
                  <b>{user?.firestore_data.email}</b>
                </p>
                <p style={{ marginBottom: "-5px", fontSize: "smaller" }}>
                  Campus: {user?.firestore_data.campus}
                </p>
                <p style={{ fontSize: "smaller" }}>
                  Level of Study: {user?.firestore_data.level}
                </p>
              </div>
            </div>
            {/* <button className="DetailButton" >Edit</button> */}
          </div>

          <div className="current-courses">
            <h2 className="course-title">Trimester {getCurrentTrimester()} Singapore {new Date().getFullYear()}</h2>
            <ul>
              {Array.isArray(currentCourses) && currentCourses.map((i, idx) => (
              <li className="course-item" key={idx}>
                <span className="course-code">{i[0]}</span>
                <span className="course-name">
                  {i[1]}
                </span>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
