import React, { useState, useEffect, Component, useRef, useContext } from "react";
import Trimesters from "./Trimesters";
import Course from "./Course";
import { DndProvider, useDrop } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import "./PlanYourPathDemo.scss"
import shareImg from "../../assets/shareImg.png"
import toast from 'react-hot-toast';
import xLogo from "../../assets/xLogo.png"
import facebookLogo from "../../assets/facebookLogo.png"
import { UserContext } from "../login/LoginContext";
import axios from 'axios';

// The data for the courses
const Courses = [
  {ID:'ECON1001', Level: 1, Units: 10, Name: "Microeconomics for business decision", GRADE: "D", TYPE: "ECON", ADDED: false}, 
  {ID:'SENG1110', Level: 1, Units: 10, Name: "Object Oriented Programming", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'COMP3350', Level: 3, Units: 10, Name: "Advanced Database", GRADE: "HD", TYPE: "COMP",  ADDED: false}, 
  {ID:'EBUS3050', Level: 3, Units: 10, Name: "The Digital Economy", GRADE: "HD", TYPE: "EBUS",  ADDED: false}, 
  {ID:'SENG1120', Level: 1, Units: 10, Name: "Data Structure", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'INFT3100', Level: 3, Units: 10, Name: "Project Management", GRADE: "HD", TYPE: "INFT",  ADDED: false}, 
  {ID:'SENG1050', Level: 1, Units: 10, Name: "Web Technologies", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'SENG2130', Level: 2, Units: 10, Name: "System Analysis and Design", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'COMP3851A', Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A", GRADE: "HD", TYPE: "COMP",  ADDED: false}, 
  {ID:'INFT2051', Level: 2, Units: 10, Name: "Mobile Application Programming", GRADE: "HD", TYPE: "INFT",  ADDED: false}, 
  {ID:'SENG2260', Level: 2, Units: 10, Name: "Human-Computer Interaction", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'INFT2060', Level: 2, Units: 10, Name: "Applied Artificial Intelligence", GRADE: "HD", TYPE: "INFT",  ADDED: false},
];

function DragDrop() {
  const [courses, setCourses] = useState(Courses);
  
  const studentDefault = [
    { trimesterId: 1, year: 2023, term: 1, course: ["", "" , "" , ""] },
    { trimesterId: 2, year: 2023, term: 2, course: ["", "", "", ""] },
    { trimesterId: 3, year: 2023, term: 3, course:  ["", "", "", ""] },
    { trimesterId: 4, year: 2023, term: 4, course:  ["", "", "", ""] },
  ];
  
  const { user } = useContext(UserContext);
  
  const [profile, setProfile] = useState({ courses: studentDefault });

  const [studentTrimester, setStudentTrimester] = useState(studentDefault);

  useEffect(() => {
    let processed = JSON.parse(user?.firestore_data.courses);
    setProfile({ courses: processed || studentDefault});
    setStudentTrimester(processed || studentDefault);
  },[])

  useEffect(() => {
    setProfile({ courses: studentTrimester });
  }, [studentTrimester]);

  // useEffect(() => {
  //   handleSave();
  // }, [profile.courses]);

  const handleSave = async () => {
    try{
        const { data } = await axios.post("http://localhost:8080/pages/profile-courses", {content: profile});
        alert('Saving course data success!');
    }
    catch(ex){
        console.log(ex.response?.data.message);
    }
  };
  
  const addCourseToTrimester = (courseId, name, level, units, grade, parent_index, index) => {

    const currentTrimester = studentTrimester[parent_index];

    let duplicateFound = false;
    const checkEmpty = 0;

    //Checks if the row has the duplicate
    for (let i = 0; i < currentTrimester.course.length; i++) {

      if (currentTrimester.course[i] && currentTrimester.course[i][0] === courseId) {
        window.alert(courseId + " already exists in trimester " + currentTrimester.trimesterId);
        duplicateFound = true;
        break;
      }
      if(currentTrimester.course[i] === "" || currentTrimester.course[i] === '' ){
        checkEmpty + 1;
      }
    }

    if (courseId !== '' && duplicateFound == false) {
      if (courseId !== '' && duplicateFound == false && currentTrimester.course.length <= 4) {

        for(let i = 0; i < currentTrimester.course.length; i++){

        if(currentTrimester.course[i] === ""){
          let updatedTrimester = [...studentTrimester];
          updatedTrimester[parent_index].course[i] = [courseId, name, units, level, grade, true];

          setCourses(prevCourses => 
            prevCourses.map(course =>
              course.ID.toLowerCase() ===  courseId.toLowerCase() ? {...course, ADDED: true} : course
            )
          )
          setStudentTrimester(() => updatedTrimester);
      
          break;
        }
        // If the row is full, the module will be swapped on the location you added in
        else if(currentTrimester.course[3] !== ""){

          let updatedTrimester = [...studentTrimester];
          updatedTrimester[parent_index].course[index] = [courseId, name, units, level, grade, true];
          
          setStudentTrimester(() => updatedTrimester);
          window.alert("found " + courses[i].ID);

          setCourses(prevCourses => 
            prevCourses.map(course =>
              course.ID ===  courseId ? {...course, ADDED: false} : course
            )
          )
          break;
          }
      }
    }
    }
  };  


  const removeCourse = (courseId, parent_index, index) => {

    const currentTrimester = studentTrimester[parent_index];

    if(parent_index !== undefined && index !== undefined){
      let deletedCourse = studentTrimester[parent_index].course[index];

      let updatedTrimester = [...studentTrimester];
      updatedTrimester[parent_index].course[index] = "";
      setStudentTrimester(updatedTrimester);
      
      // Check if the course id to change the status of the course
      const tempDel = [...courses];

      for(let i = 0; i<tempDel.length; i++){
        if(tempDel[i].ID === deletedCourse[0]){
          tempDel[i].ADDED = false;
        }
      }      
      setCourses(prev => tempDel);

      // Loop that row to organize the row
      const tempArray = [];

      for(let i = 0; i < currentTrimester.course.length; i++){
          if(currentTrimester.course[i] !== ""){
            let updatedTrimester = [...studentTrimester];
            tempArray.push(updatedTrimester[parent_index].course[i]);
            updatedTrimester[parent_index].course[i] = "";
            setStudentTrimester(updatedTrimester);
          }
      }

      for(let j = 0; j < currentTrimester.course.length && j < tempArray.length; j++){
          if(currentTrimester.course[j] === ""){
            let updatedTrimester = [...studentTrimester];
            updatedTrimester[parent_index].course[j] = tempArray[j];
            setStudentTrimester(() => updatedTrimester);
          }
        }
      }
  };


  const [showDropdown, setShowDropDown] = useState(false);
  
  const menuButton = (parent_index, index) =>{
    var courseOptions = document.getElementById('courseOptions');
    if (courseOptions.style.display === 'none') {
      courseOptions.style.display = 'block';
    } else{
      courseOptions.style.display = 'none';
    }
  }
  
  //Tracks count of the trimester number
  const [count, setCount] = useState(5);

  const triScroll = useRef();

  const notify = () => {windows.alert("Here h")};

  function addTrimester() {

    setCount((prevCount) => prevCount + 1);

    const newTrimester = { year: 2023, term: count, course: ["","", "", ""] };

    toast.success('Here is your toast.');

    let updatedTrimester = [...studentTrimester, newTrimester];
    setStudentTrimester(updatedTrimester);
    triScroll.current.scrollTop = triScroll.current.scrollHeight;

    for(i = 0; i <= studentTrimester.length; i++){
      updateTerm = studentTrimester[i].term;
      updateTerm = i+1;
      setStudentTrimester(updateTerm);
    }

  }

  const [showTrimesterDrop, setShowTrimesterDrop] = useState(false);

  function removeTrimester(trimesterBox){
    if(studentTrimester.length > 4){
      setCount((prevCount) => prevCount - 1);

      const newTrimesters = studentTrimester.filter((student) => student !== trimesterBox);
      // This updates the trimester
      setStudentTrimester(newTrimesters);
      window.alert("Deleted done");

      for(let i = 0; i <= studentTrimester.length; i++){
        updateTerm = studentTrimester[i].term;
        updateTerm = i+1;
        setStudentTrimester(updateTerm);
      }
    }
    else{
      window.alert("You can't delete more courses");
    }
  }
  
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  const groupCoursesByType = (courses) => {
    return courses.reduce((acc, course) => {
      if (!acc[course.TYPE]) {
        acc[course.TYPE] = [];
      }
      acc[course.TYPE].push(course);
      return acc;
    }, {});
  };




  return (

    <div className="planYourPath">
      <div className="topData">
        <h1 className="title">Plan Your Path</h1>

        <div className="shareBlk"  onClick={() => setShowDropDown(!showDropdown)}>
        <p className="share">Share </p>
        <img className="shareImg" src={shareImg} alt="share icon" />
        {showDropdown && (
          <div className="shareOptions">
            <div>
              <img className="" src={facebookLogo} alt="FacebookBtn" />
              <a href="https://www.facebook.com/">FaceBook</a>
            </div>

            <div>
              <img className="" src={xLogo} alt="Xbtn" />
              <a href="https://x.com/i/flow/login">X</a>
            </div>
            
          </div>
          )}
        </div>
      </div> 

      <div className="planYourPathPage">

        <div className="trimestersDetails" ref={triScroll} >
          {Array.isArray(studentTrimester) && studentTrimester.map((trimesters, index) => 
             <div key={index}>
                <Trimesters 
                  key={index} id={index} name={courses.name} units={courses.units} level={courses.level} grade={courses.grade} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}
                  courses={courses} studentTrimester={studentTrimester}  setStudentTrimester={setStudentTrimester} trimesterIndex={index} menuButton={menuButton} deleteTrimesterPos={removeTrimester} removeTrimester={removeTrimester} trimesters={trimesters}/>
             </div>
          )}

        
       
         
        </div>
        
        <div>
          <div className="trimesterLibrary" >
            <div className="titleList">
              <h2>List of All Courses</h2>
            </div>
            {courses && 
              Object.entries(groupCoursesByType(courses)).map(([type, courseList], idx) => (
                <div key={idx}>
                  <h3 className="courseTitleLi">{type}</h3>
                  <div className="coursesPerType">
                    {courseList.map((course) => (
                      <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        
      </div>
      <div className="triesterMod">
        <button onClick={() => addTrimester()}>+ Add more trimester</button>
      </div> 
      <div className="triesterMod">
        <button onClick={() => handleSave()}>+ Save</button>
      </div> 
    </div>
  );
}

export default DragDrop;
