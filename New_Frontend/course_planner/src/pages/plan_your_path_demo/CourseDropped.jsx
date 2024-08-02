import React from "react";
import { useDrag } from "react-dnd";
import hamburgerMenu from "../../assets/hamburgerMenu.png"
import cross from "../../assets/cross.png"
import "./CourseDropped.scss"

function CourseDropped({ id, name, units, level, grade, removeCourse, parent_index, index, menuButton}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id, name, units, level, grade, parent_index, index },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  return (
    <div ref={drag} id="courseDropped" className="courseDropped"  style={{ opacity: isDragging ? "50%" : "100%", background: "#FFEFD7", height: "16em",
      width: "260px", margin: "10px", backgroundColor: "#FFEFD7"}}>

      <div className="courseDroppedHeader">
        <div className="heading">
          <h3>Core</h3>
        </div>
        <div className="removeDiv">
          <button className="removeBtn" style={{padding: "0px", color: "black", backgroundColor: "transparent", border: "none", float: "left"}} onClick={(e) => removeCourse(e, parent_index, index)}>
            <img style={{height: "50px"}} className="hamburgerMenu" src={cross} alt="cross" />
          </button>
        </div>
      </div>

      <div className="subDetails">
        <span> <h3>  Modules: {name} </h3>  Level: {level} | Units: {units} </span>
        <p>Grade: {grade}</p>
      </div>
    </div>
  );
}

export default CourseDropped;
