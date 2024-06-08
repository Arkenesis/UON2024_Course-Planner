import React, {forwardRef} from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";

const Trimester = ({ parent_index, item, index, addCourseToTrimester, removeCourse}) => {

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
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "course",
    drop: (dropItem) => {
      addCourseToTrimester(dropItem.id, parent_index, index);
      removeCourse(dropItem.parent_index, dropItem.index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    //Enabling a ref to receive multiple attribute done by creating a lamdba function
    <div ref={(el)=> {drop(el); drag(el);}} key={index} style={{ height: "240px", width: "40px"}}>
      <div style={{backgroundColor: "lightblue", height:"200px", width:"100px"}}>
      {item}

      </div>
      <button style={{padding: "0px", color: "black", backgroundColor: "transparent"}} onClick={() => removeCourse(parent_index, index)}>Remove</button>
    </div>
  );
};

export default Trimester;
 