import React, { useState, useEffect, Component } from "react";
import Trimesters from "./Trimesters";
import Course from "./Course";
import { DndProvider, useDrop } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import "./PlanYourPathDemo.scss"
import shareImg from "../../assets/shareImg.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Courses = [
  {ID:'ECON1001', Level: 1, Units: 10, Name: "Microeconomics for business decision", GRADE: "HD", TYPE: "ECON"}, 
  {ID:'SENG1110', Level: 1, Units: 10, Name: "Object Oriented Programming", GRADE: "HD", TYPE: "SENG"}, 
  {ID:'COMP3350', Level: 3, Units: 10, Name: "Advanced Database", GRADE: "HD", TYPE: "COMP"}, 
  {ID:'EBUS3050', Level: 3, Units: 10, Name: "The Digital Economy", GRADE: "HD", TYPE: "EBUS"}, 
  {ID:'SENG1120', Level: 1, Units: 10, Name: "Data Structure", GRADE: "HD", TYPE: "SENG"}, 
  {ID:'INFT3100', Level: 3, Units: 10, Name: "Project Management", GRADE: "HD", TYPE: "INFT"}, 
  {ID:'SENG1050', Level: 1, Units: 10, Name: "Web Technologies", GRADE: "HD", TYPE: "SENG"}, 
  {ID:'SENG2130', Level: 2, Units: 10, Name: "System Analysis and Design", GRADE: "HD", TYPE: "SENG"}, 
  {ID:'COMP3851A', Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A", GRADE: "HD", TYPE: "COMP"}, 
  {ID:'INFT2051', Level: 2, Units: 10, Name: "Mobile Application Programming", GRADE: "HD", TYPE: "INFT"}, 
  {ID:'SENG2260', Level: 2, Units: 10, Name: "Human-Computer Interaction", GRADE: "HD", TYPE: "SENG"}, 
  {ID:'INFT2060', Level: 2, Units: 10, Name: "Applied Artificial Intelligence", GRADE: "HD", TYPE: "INFT"},
];



function DragDrop() {
  const [courses, setCourses] = useState(Courses);
  let coursesObject = Courses[0];
  let courseEntries = Object.entries(coursesObject);

  // Force render the sub components
  // Without key, the actual dragged item won't get update, lead to weird display bug 
  const [key, setKey] = useState(0);

  const [studentTrimester, setStudentTrimester] = useState([
    
    {
      trimesterId: 1,
      year: 2023,
      term: 1,
      course: ["", "", "", ""]
    },
    {
      trimesterId: 2,
      year: 2023,
      term: 2,
      course: ["", "", "", ""]
    },
    {
      trimesterId: 3,
      year: 2023,
      term: 3,
      course: ["", "", "", ""]
    },
    {
      trimesterId: 4,
      year: 2023,
      term: 4,
      course: ["", "", "", ""]
    },
  ]);


  
  const addCourseToTrimester = (courseId, name, level, units, grade, parent_index, index) => {
 
    if(courseId != ''){
      let selectedCourse   = coursesObject[courseId];
      let updatedTrimester = [...studentTrimester];
      updatedTrimester[parent_index].course[index] = [courseId, name, units, level, grade];
      setStudentTrimester(() => updatedTrimester);
      toast("Hello world");  
      window.alert("sf");
   
    if(key < 2)
      setKey((k) => k + 1);
    else
      setKey((k) => k - 1);
}

  };  


  const removeCourse = (parent_index, index) => {
    if(parent_index !== undefined && index !== undefined){
      let updatedTrimester = [...studentTrimester];
      updatedTrimester[parent_index].course[index] = "";
      setStudentTrimester(updatedTrimester);

    }
    // Force render the sub components
    // Used to solve the weird display bug
    if(key < 2)
      setKey((k) => k + 1);
    else
      setKey((k) => k - 1);
  };


  const menuButton = (parent_index, index) =>{
    var courseOptions = document.getElementById('courseOptions');
    if (courseOptions.style.display === 'none') {
      courseOptions.style.display = 'block'
    } else{
      courseOptions.style.display = 'none';
    }
    if(key < 2)
      setKey((k) => k + 1);
    else
      setKey((k) => k - 1);
  }
  
  //Tracks count of the trimester number
  const [count, setCount] = useState(5);


  function addTrimester() {

    setCount((prevCount) => prevCount + 1);

    const newTrimester = {
      year: 2023,
      term: count,
      course: ["", "", "", ""]
    };
    let updatedTrimester = [...studentTrimester, newTrimester];
    setStudentTrimester(updatedTrimester);
  }

  function removeTrimester(){
    let updatedTrimester = [...studentTrimester];
    if(updatedTrimester.length > 4){
      setCount((prevCount) => prevCount - 1);
  
      updatedTrimester.pop();
      setStudentTrimester(updatedTrimester);
    }
  }

  return (

    <div className="planYourPath">
      <div className="topData">
        <h1 className="title">Plan Your Path</h1>

        <div className="shareBlk">
        <p className="share">Share </p>
        <img className="shareImg" src={shareImg} alt="share icon" />


        </div>
      </div> 

      <div key={key} className="planYourPathPage">

    

        <div className="trimestersDetails">
          {studentTrimester.map((trimesters, index) => (
              <Trimesters 
                key={index} id={index} name={courses.name} units={courses.units} level={courses.level} grade={courses.grade} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}
                courses={courses} studentTrimester={studentTrimester}  setStudentTrimester={setStudentTrimester} trimesterIndex={index} menuButton={menuButton}
              />
            )
          )}
        
       
         
        </div>
        
        <div>
          <div className="trimesterLibrary">
          <div className="titleList">
             <h2>List of All Courses</h2>
            </div>
            <div>
          
              <h3 className="courseTitleLi">Econ </h3>
              <div className="coursesPerType">
              {courses.map((course) => (
                course.TYPE === "ECON" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
              ))}
              </div>
           
            </div>

            <div>
              <hr />
              <h3 className="courseTitleLi">Ebus</h3>
              <div className="coursesPerType">
              {courses.map((course) => (
                course.TYPE === "EBUS" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
              ))}
              </div>
            </div>

            <div>
              <hr />
              <h3 className="courseTitleLi">INFT</h3>
              <div className="coursesPerType">
              {courses.map((course) => (
                course.TYPE === "INFT" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
              ))}
              </div>
            </div>

            <div>
              <hr />
              <div className="coursesPerType">
              <h3 className="courseTitleLi">SENG</h3>
              {courses.map((course) => (
                course.TYPE === "SENG" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
                ))}
                </div>
            </div>
        
          </div>   

         
       
        </div>
        
      </div>
      <div className="triesterMod">
      <div>
      <button onClick={() => addTrimester()}>Add more trimester</button>
      </div>
      <div>

      <button onClick={() => removeTrimester()}>Delete trimester</button>
      </div>
          
            </div> 
    </div>
  );
}

export default DragDrop;
