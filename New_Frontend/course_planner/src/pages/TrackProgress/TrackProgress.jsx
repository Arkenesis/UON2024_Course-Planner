import React, { useContext, useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import './TrackProgress.scss';
import { UserContext } from '../login/LoginContext';

const TrackProgress = () => {
    const [currentCourses, setCurrentCourses] = useState([]);
    const [completedCourses, setCompletedCourses] = useState([]);
    const { user } = useContext(UserContext);

    const getAbbrName = (name) => {
      const raw = name.split(' ');
      if(raw.length >= 2){
        const first_letter  = raw[0].charAt(0).toUpperCase(); 
        const second_letter = raw[1].charAt(0).toUpperCase();
        return first_letter + second_letter;
      }
      else{
        return name.charAt(0).toUpperCase();
      }
    }

    const getAmountCompletedCourse = () => {
      let courses = user.courses;
      if (courses) {
        let completed = 0;
        let total = 0;
        let currentTrimester = getCurrentTrimester();
        const currentYear = new Date().getFullYear();
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
    const remaining = total > 0 ? total-completed : 0;

    const getCurrentCourses = () => {
      let courses = user.courses;
      if (courses) {
        const currentYear = new Date().getFullYear();
        let result = [];
  
        for(let i = 0; i< courses.length; i++){
          const { term, course: courseDetails, year } = courses[i];
          let currentTrimester = getCurrentTrimester();
          if (currentTrimester === term && currentYear === year){
            result.push(...courseDetails.filter((detail) => detail[0]));
          }
        }
        setCurrentCourses(result);
      }
    }
    
    const [units, setUnits] = useState(0);

    const getCurrentCoursesUnits = () => {
      let courses = user.courses;
      if (courses) {
        let sum = 0;
        const currentYear = new Date().getFullYear();
        let currentTrimester = getCurrentTrimester();
        for(let i = 0; i< courses.length; i++){
          const { term, course: courseDetails, year } = courses[i];
          if (currentTrimester === term && currentYear === year){
            for(let j = 0; j<courseDetails.length; j++){
              if(courseDetails[j][2]){
                sum = sum + courseDetails[j][2];
              }
            }
          }
        }
        setUnits(sum);
      }
    }

  const getCompletedCourses = () => {
    let courses = user.courses;
    if (courses) {
      // getMonth() returns 0-based month
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      let result = [];

      for(let i = 0; i< courses.length; i++){
        const { term, course: courseDetails, year } = courses[i];
        let temp = courses[i];
        if (currentMonth >= 1 && currentMonth <= 4 && term === 1 && currentYear >= year){
          result.push(...courseDetails.filter((detail) => detail[0]));
        }
        else if (currentMonth >= 5 && currentMonth <= 8 && term === 1 && currentYear >= year){
          result.push(...courseDetails.filter((detail) => detail[0]));
        }
        else if (currentMonth > 8 && (term === 1 || term === 2 ) && currentYear >= year){
          result.push(...courseDetails.filter((detail) => detail[0]));
        }
      }
      setCompletedCourses(result);
    }
  }

  useEffect(() => {
    getCurrentCourses();
    getCurrentCoursesUnits();
    getCompletedCourses();
  }, []);

    return (
      <div className="main-content">
          <div>
            <h1 style={{opacity:"0.47"}}>Track Progress</h1>
            <div className="user-info">
              <div className="avatar">{user && getAbbrName(user?.firestore_data.username)}</div>
              <div className="details">
                <h2 style={{marginBottom:"5px"}}>{user?.firestore_data.gender === 'male' && '(Mr.)'}{user?.firestore_data.gender === 'male' && '(Mrs.)'} {user?.firestore_data.username}</h2>
                <p>{user?.firestore_data.studentid} <a href="mailto:kennedy.tan@uon.edu.au">{user?.firestore_data.email}</a></p>
                <p>{user?.firestore_data.level ? `${user?.firestore_data.level} -` : ''} {user?.firestore_data.program}</p>
                <p><span role="img" aria-label="location">📍</span> Start Year: Trimester {getCurrentTrimester()} {user?.firestore_data.campus ? `(${user?.firestore_data.campus})` : ''} {user?.firestore_data.date}</p>
              </div>
            </div>
          </div>

          <h3>Courses</h3>
          <div className="courseStatus">
          <div className="smallBar" style={{borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}></div>
          <div className="smallBar"></div>
          <div className="smallBar"></div>
          <div className="smallBar"  style={{backgroundColor:"#FED766"}}></div>
          <div className="smallBar" style={{backgroundColor:"#E9E9E9", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}></div>
          </div>
          <div className="courseStatus">
          <div className="statusItem">{completed} Finished</div>
          <div className="statusItem" style={{backgroundColor:"rgba(254,215,102,0.3)", color:"#FFBE00"}}>{total} Registered</div>
          <div className="statusItem" style={{backgroundColor:"rgba(233,233,233,0.3)", color:"#9A9A9A"}}>{remaining} Left</div>
          <div className="statusItem" style={{backgroundColor:"white"}}></div>
          </div>

          <div className="courses">
          <h3 className="currentTrimester">{user?.firestore_data.program}</h3>
          <p className="trimesterInfo">(Current) Trimester {getCurrentTrimester()} Singapore 2024</p>
          
          <div className="courseStatus">
            <p style={{color:"#888080"}}>{units} Units</p>
            {Array.isArray(currentCourses) && currentCourses.map((i, idx) => (
              <div className="courseItem" key={idx}>{i[0]}</div>
            ))}
          </div>

          </div>
    
          </div>
    );
  };
  
  export default TrackProgress;
  
