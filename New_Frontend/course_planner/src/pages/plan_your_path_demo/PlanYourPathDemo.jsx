import React, { useState, useEffect } from "react";
import Trimesters from "./Trimesters";
import Course from "./Course";
import { DndProvider, useDrop } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import "./PlanYourPathDemo.css"

// const Courses = [{
//   "ECON1001": {Level: 1, Units: 10, Name: "Microeconomics for business decision"}, 
//   "SENG1110": {Level: 1, Units: 10, Name: "Object Oriented Programming"}, 
//   "COMP3350": {Level: 3, Units: 10, Name: "Advanced Database"}, 
//   "EBUS3050": {Level: 3, Units: 10, Name: "The Digital Economy"}, 
//   "SENG1120": {Level: 1, Units: 10, Name: "Data Structure"}, 
//   "INFT3100": {Level: 3, Units: 10, Name: "Project Management"}, 
//   "SENG1050": {Level: 1, Units: 10, Name: "Web Technologies"}, 
//   "SENG2130": {Level: 2, Units: 10, Name: "System Analysis and Design"}, 
//   "COMP3851A":{Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A"}, 
//   "INFT2051": {Level: 2, Units: 10, Name: "Mobile Application Programming"}, 
//   "SENG2260": {Level: 2, Units: 10, Name: "Human-Computer Interaction"}, 
//   "INFT2060": {Level: 2, Units: 10, Name: "Applied Artificial Intelligence"}
// }];

const Courses = [
  {ID:'ECON1001', Level: 1, Units: 10, Name: "Microeconomics for business decision", TYPE: "ECON"}, 
  {ID:'SENG1110', Level: 1, Units: 10, Name: "Object Oriented Programming", TYPE: "SENG"}, 
  {ID:'COMP3350', Level: 3, Units: 10, Name: "Advanced Database", TYPE: "COMP"}, 
  {ID:'EBUS3050', Level: 3, Units: 10, Name: "The Digital Economy", TYPE: "EBUS"}, 
  {ID:'SENG1120', Level: 1, Units: 10, Name: "Data Structure", TYPE: "SENG"}, 
  {ID:'INFT3100', Level: 3, Units: 10, Name: "Project Management", TYPE: "INFT"}, 
  {ID:'SENG1050', Level: 1, Units: 10, Name: "Web Technologies", TYPE: "SENG"}, 
  {ID:'SENG2130', Level: 2, Units: 10, Name: "System Analysis and Design", TYPE: "SENG"}, 
  {ID:'COMP3851A', Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A", TYPE: "COMP"}, 
  {ID:'INFT2051', Level: 2, Units: 10, Name: "Mobile Application Programming", TYPE: "INFT"}, 
  {ID:'SENG2260', Level: 2, Units: 10, Name: "Human-Computer Interaction", TYPE: "SENG"}, 
  {ID:'INFT2060', Level: 2, Units: 10, Name: "Applied Artificial Intelligence", TYPE: "INFT"}
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


  
  const addCourseToTrimester = (courseId, name, level, units, parent_index, index) => {
    if(courseId != ''){
      let selectedCourse   = coursesObject[courseId];
      let updatedTrimester = [...studentTrimester];
    //  This prevents undefined name from adding on to the column
      if(name != 'no name'){
        updatedTrimester[parent_index].course[index] = `ID: ${courseId} Name: ${name}  Units: ${units} ID: ${level}`;
        setStudentTrimester(() => updatedTrimester);
      }
      else{
        updatedTrimester[parent_index].course[index] = `${courseId}`;
        setStudentTrimester(() => updatedTrimester);
      }
     
    }
    if(key < 2)
      setKey((k) => k + 1);
    else
      setKey((k) => k - 1);
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


  function addTrimester() {
    const newTrimester = {
      year: 2023,
      term: 4,
      course: ["", "", "", ""]
    };
    let updatedTrimester = [...studentTrimester, newTrimester];
    setStudentTrimester(updatedTrimester);
  }
  
  function removeTrimester(){
    let updatedTrimester = [...studentTrimester];


    if(updatedTrimester.length > 4){
      updatedTrimester.pop();
      setStudentTrimester(updatedTrimester);
    }
  }



  



  return (

    <DndProvider backend={HTML5Backend}>
    <div key={key} className="planYourPathPage">
      {/* This div holds the objects of the courses */}
      {/* <div className="Available Courses" style={{ display: "flex", flexDirection: ""}}>
        {courses.map((code) => (
          <Course key={code} id={code.ID} name={code.Name} level={code.Level} units={code.Units}/>
        ))}
      </div> */}


    


{/* This div holds the objects of the trimesters */}
      {/* <div className="Trimesters">
        
        {studentTrimester.map((trimesters, index) => (
          {courses.map((code) => (
          <Trimesters key={index} id={index} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}/>
        
        ))}
        
        ))} */}

    <div>
      <div className="trimestersDetails">
        {studentTrimester.map((trimesters, index) => (

            <Trimesters 
            key={index} id={index} name={courses.name} units={courses.units} level={courses.level} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}
          />
          )
        )}

 
      </div>
      <span>      <button onClick={() => addTrimester()}>Add more trimester</button>
      <button onClick={() => removeTrimester()}>Delete trimester</button></span>
      </div>



      <div className="trimesterLibrary">
        
        <div>
        <hr />
  
          <h3>Econ </h3>
          {courses.map((course) => (
              
              // Diing Yang, this is called inline condtional rendering to show each category. Here to learn more about if if you don't know https://www.geeksforgeeks.org/what-are-inline-conditional-expressions-in-reactjs/
            course.TYPE === "ECON" && <Course key={course} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
  
            
          )
          
        )
          }
  
          </div>
          <div>
          <hr />
  
          <h3>Ebus</h3>
          {courses.map((course) => (
              
              // Diing Yang, this is called inline condtional rendering to show each category. Here to learn more about if if you don't know https://www.geeksforgeeks.org/what-are-inline-conditional-expressions-in-reactjs/
            course.TYPE === "EBUS" && <Course key={course} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
  
            
          )
          
        )
          }
  
          </div>
          <div>
          <hr />
  
          <h3>INFT</h3>
          {courses.map((course) => (
              
              // Diing Yang, this is called inline condtional rendering to show each category. Here to learn more about if if you don't know https://www.geeksforgeeks.org/what-are-inline-conditional-expressions-in-reactjs/
            course.TYPE === "INFT" && <Course key={course} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
  
            
          )
          
        )
          }
  
          </div>
          <div>
          <hr />
  
          <h3>SENG</h3>
          
          {courses.map((course) => (
              
              // Diing Yang, this is called inline condtional rendering to show each category. Here to learn more about if if you don't know https://www.geeksforgeeks.org/what-are-inline-conditional-expressions-in-reactjs/
            course.TYPE === "SENG" && <Course key={course} id={course.ID} name={course.Name} level={course.Level} units={course.Units}/>
  
            
          )
          
        )
          }
  
          </div>
  
          
        </div>

    </div>
    </DndProvider>
  );
}

export default DragDrop;
