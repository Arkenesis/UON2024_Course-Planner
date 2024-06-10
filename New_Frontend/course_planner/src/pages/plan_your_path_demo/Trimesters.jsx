import React from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Trimester from "./Trimester";
import Course from "./Course";

const Trimesters = ({ id, name, level, units, year, term, course, addCourseToTrimester, removeCourse, handleDrop}) => {

  return (
    <div>
      <p>{year} Trimester {term}</p>
      {course.map((i, index) => 
        <div key={index}  style={{ marginBottom: "10px", width: "240px"}} >
          <Trimester item={i} name={name} level={level} units={units} parent_index={id} index={index} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}/>
          
           
        </div>
      )}
    </div>
  );
};

export default Trimesters;
