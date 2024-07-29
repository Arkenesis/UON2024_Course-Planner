import React from "react";
import { useDrag } from "react-dnd";
import "./Course.scss"

function Course({ id, name, level, units, grade}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id, name, units, level, grade },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  
  


  return (
    <div ref={drag} className="course"  style={{ opacity: isDragging ? "50%" : "100%", background: "#FFEFD7", height: "auto",
      width: "300px", margin: "10px"}}>

      <div className="courseHeader">
        <div> 
          <h3>{id}</h3>
        </div>
        <div className="subDetails">
          Level: {level} | Units: {units}
        </div>
      </div>
      <div className="contentBox">
      <h3 className="content">Modules: {name}</h3>  
      <p className="taken">taken</p>
      </div>
    </div>
  );
}

export default Course;
