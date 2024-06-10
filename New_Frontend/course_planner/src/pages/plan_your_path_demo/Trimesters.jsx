import React from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Trimester from "./Trimester";

const Trimesters = ({ id, year, term, course, addCourseToTrimester, removeCourse, removeTrimester}) => {

  return (
    <div>
      <p>{year} Trimester {term}</p>
      {course.map((i, index) => 
        <div key={index}  style={{ border: "1px solid black", marginBottom: "10px"}} >
          <Trimester item={i} parent_index={id} index={index} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}/>
        </div>
      )}
      <button style={{display: "inline", padding: "0px", color: "black", backgroundColor: "transparent"}} onClick={() => removeTrimester(id)}>Remove Trimester</button>
    </div>
  );
};

export default Trimesters;
