import React from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Trimester from "./Trimester";

const Trimesters = ({ id, year, term, course, addCourseToTrimester, removeCourse}) => {

  return (
    <div>
      <p>{year} Trimester {term}</p>
      {course.map((i, index) => 
        <div key={index}  style={{ border: "1px solid black", marginBottom: "10px"}} >
          <Trimester item={i} parent_index={id} index={index} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}/>
        </div>
      )}
    </div>
  );
};

export default Trimesters;
