import React from "react";
import { useDrag } from "react-dnd";
import "./Course.css"

function CourseDropped({ id, name, level, units, grade}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id, name, units, level, grade },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  


  return (
    <div ref={drag} className="course"  style={{ opacity: isDragging ? "50%" : "100%", background: "#FFEFD7", height: "10em",
      width: "400px", margin: "10px", background: "#FFEFD7"}}>

<div className="courseHeader">
      <div> <h3>{id}</h3>  </div>
      <div className="subDetails">
Level: {level} | Units: {units} 

</div>

</div>
    <h3>  Modules: {name} </h3>  
       

    </div>



  );
}

export default CourseDropped;
