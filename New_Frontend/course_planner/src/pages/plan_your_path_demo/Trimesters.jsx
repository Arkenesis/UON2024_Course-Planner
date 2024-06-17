import React from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Trimester from "./Trimester";
import Course from "./Course";
import "./Trimesters.css"

const Trimesters = ({ id, name, level, units, grade, year, term, course, addCourseToTrimester, removeCourse, handleDrop, studentTrimester, setStudentTrimester}) => {

  return (
    <div className="trimestersBox">
      <div className="trimesterName">{year} Trimester {term}</div>
      {course.map((i, index) => 
        <div key={index}  >
          <Trimester item={i} name={name} level={level} units={units} grade={grade} parent_index={id} index={index} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse} studentTrimester={studentTrimester}  setStudentTrimester={setStudentTrimester}/>
          
           
        </div>
      )}
    </div>
  );
};

export default Trimesters;
