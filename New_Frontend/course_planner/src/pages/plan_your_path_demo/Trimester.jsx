import React, {forwardRef, useState} from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Course from "./Course";

import "./Trimester.scss"
import CourseDropped from "./CourseDropped";

const Trimester = ({parent_index, item, index, addCourseToTrimester, removeCourse, studentTrimester, setStudentTrimester}) => {

  // Enables the components to give item(drag) 
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    // Define the Drop Item details can be obtained when drop
    item: { id:item, name:item, parent_index: parent_index, index: index,},
    // Used to alert user
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));




  // Enables the components to receive item
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "course",

  //  hover(item) {
   
  //    if (item.index !== index || item.parent_index !== parent_index) {

  //     removeCourse(item.parent_index, item.index);
  //     addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
      
  //     item.index = index;
  //     item.parent_index = parent_index;
  //   }

  //  },
  //  collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
   


    drop: (item) => { 
      if (item.index !== index || item.parent_index !== parent_index) {

        removeCourse(item.parent_index, item.index);
        addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
     
      }


      
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),



  }));



  
   const isActive = isOver && canDrop

   //const card = <div style={{backgroundColor: "orange"}}> <p>{item[0]}</p> <h3>{item[1]} </h3> <div><p>{item[2]}</p></div></div>;


  return (
    //Enabling a ref to receive multiple attribute done by creating a lamdba function
    //<div ref={(el)=> {drop(el); drag(el);}} key={index} style={{ height: "240px", width: "400px"}} className="trimesterBox">
     
    <div ref={node => drag(drop(node))} key={index} style={{ opacity: isDragging? 0.5: 1, height: "240px",display: "flex", alignItems: "center", width: "300px", background: isActive ? "#FED766" : "" }} className="trimesterBox"  >
    
       {item && <CourseDropped  id={item[0]} name={item[1]} units={item[2]} level={item[3]} /> }   
     
  
    </div>
  );
};

export default Trimester;
 