import React, {forwardRef, useState} from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Course from "./Course";

const Trimester = ({ parent_index, item, name, index, addCourseToTrimester, removeCourse}) => {

  // Enables the components to give item(drag) 
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    // Define the Drop Item details can be obtained when drop
    item: { id:item, parent_index: parent_index, index: index },
    // Used to alert user
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));




  // Enables the components to receive item
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "course",
    drop: (item) => { 
      addCourseToTrimester(item.id, item.name, item.level, item.units, parent_index, index);
      removeCourse(item.parent_index, item.index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));



  
   const isActive = isOver && canDrop


  return (
    //Enabling a ref to receive multiple attribute done by creating a lamdba function
    <div ref={(el)=> {drop(el); drag(el);}} key={index} style={{ height: "240px", width: "40px"}}>
      <div style={{backgroundColor: isActive? "green" : "lightblue", height:"240px", width:"200px"}}>
      {item ? `Id: ${item} ` : ``}
   
  
      </div>
      <button style={{ position: "relative", bottom: "30px",padding: "0px", color: "black", backgroundColor: "transparent"}} onClick={() => removeCourse(parent_index, index)}>Remove</button>
    </div>
  );
};

export default Trimester;
 