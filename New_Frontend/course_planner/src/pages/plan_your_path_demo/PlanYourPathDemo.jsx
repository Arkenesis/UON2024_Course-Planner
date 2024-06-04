import React, { useState, useEffect } from "react";
import Trimesters from "./Trimesters";
import Course from "./Course";
import { useDrop } from "react-dnd";

const Courses = [{
  "ECON1001": {Level: 1, Units: 10, Name: "Microeconomics for business decision"}, 
  "SENG1110": {Level: 1, Units: 10, Name: "Object Oriented Programming"}, 
  "COMP3350": {Level: 3, Units: 10, Name: "Advanced Database"}, 
  "EBUS3050": {Level: 3, Units: 10, Name: "The Digital Economy"}, 
  "SENG1120": {Level: 1, Units: 10, Name: "Data Structure"}, 
  "INFT3100": {Level: 3, Units: 10, Name: "Project Management"}, 
  "SENG1050": {Level: 1, Units: 10, Name: "Web Technologies"}, 
  "SENG2130": {Level: 2, Units: 10, Name: "System Analysis and Design"}, 
  "COMP3851A":{Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A"}, 
  "INFT2051": {Level: 2, Units: 10, Name: "Mobile Application Programming"}, 
  "SENG2260": {Level: 2, Units: 10, Name: "Human-Computer Interaction"}, 
  "INFT2060": {Level: 2, Units: 10, Name: "Applied Artificial Intelligence"}
}];

function DragDrop() {
  let coursesObject = Courses[0];
  let courseEntries = Object.entries(coursesObject);

  // Force render the sub components
  // Without key, the actual dragged item won't get update, lead to weird display bug 
  const [key, setKey] = useState(0);

  const [studentTrimester, setStudentTrimester] = useState([
    {
      year: 2023,
      term: 1,
      course: ["ECON1001", "SENG1110", "", ""]
    },
    {
      year: 2023,
      term: 2,
      course: ["COMP3350", "EBUS3050", "SENG1120", ""]
    },
    {
      year: 2023,
      term: 3,
      course: ["INFT3100", "SENG1050", "SENG2130", ""]
    },
    {
      year: 2023,
      term: 4,
      course: ["COMP3851A", "INFT2051", "SENG2260", "INFT2060"]
    },
  ]);

  const addCourseToTrimester = (courseId, parent_index, index) => {
    if(courseId != ''){
      let selectedCourse   = coursesObject[courseId];
      let updatedTrimester = [...studentTrimester];
      updatedTrimester[parent_index].course[index] = courseId;
      setStudentTrimester(() => updatedTrimester);
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
  

  return (
    <div key={key}>
      <div className="Available Courses" style={{ display: "flex" }}>
        {courseEntries.map(([code, details]) => (
          <Course key={code} id={code} name={details.Name} level={details.Level} units={details.Units}/>
        ))}
      </div>
      <div className="Trimesters">
        {studentTrimester.map((trimesters, index) => (
          <Trimesters key={index} id={index} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}/>
        ))}
      </div>
      <button onClick={() => addTrimester()}>Add more trimester</button>
    </div>
  );
}

export default DragDrop;
