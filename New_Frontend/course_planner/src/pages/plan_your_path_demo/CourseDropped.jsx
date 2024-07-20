import React from "react";
import { useDrag } from "react-dnd";
import hamburgerMenu from "../../assets/hamburgerMenu.png"
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
        <div className="heading"> <h3>Core</h3></div> 
        <div  id="hamburgerImg" onClick={()=> menuButton(parent_index, index)} className="hamburgerImg">
          <img style={{height: "50px"}} className="hamburgerMenu" src={hamburgerMenu} alt="hamburgerImage" />
          <div id="courseDroppedOptions" className="courseDroppedOptions" >
            <ul className="subBox">
              <li>
                <button className="removeBtn" style={{padding: "0px", color: "black", backgroundColor: "transparent"}} onClick={() => removeCourse(parent_index, index)}>Remove</button>
              </li>
            </ul>
          </div>
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
