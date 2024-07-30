import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Trimester from "./Trimester";
import Course from "./Course";
import "./Trimesters.css"


         
const Trimesters = ({ id, name, level, units, grade, year, term, course, addCourseToTrimester, removeCourse, courses, studentTrimester, setStudentTrimester, trimesterIndex, menuButton, deleteTrimesterPos}) => {

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "course",
    // drop: (item) => {
    //   // addCourseToTrimester(dropItem.id, parent_index, index);
    //   addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
    //   removeCourse(dropItem.parent_index, dropItem.index);
    // },
    drop: (item) => {
      //The conditional statement prevents you from dragging empty trimester boxes with no data
      if(item.id !== undefined && item.name !== undefined) {
        addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
        removeCourse(item.parent_index, item.index, item.id);
      }
    },
    
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop()
    }),

    

  }));


   
  const deleteTrimester = () => {
    deleteTrimesterPos(trimesterIndex); 
  }


  return (
    <div className="trimestersBox" ref={node => (drop(node))} >
      <div className="trimesterName">{year} Trimester {term} </div>
     <div className="coursePerTri">
     {course.map((i, index) => 
        <div key={index}  className="trimester">
          <Trimester item={i} name={name} level={level} units={units} grade={grade} parent_index={id} index={index} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse} courses={courses} studentTrimester={studentTrimester}  setStudentTrimester={setStudentTrimester} trimesterIndex={trimesterIndex}
           menuButton={menuButton}
          />
          
           
        </div>
      )}
     </div>
    
    </div>
  );
};

export default Trimesters;
