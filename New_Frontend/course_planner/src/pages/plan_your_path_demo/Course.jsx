import React from "react";
import { useDrag } from "react-dnd";
import "./Course.css"

function Course({ id, name, level, units}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id, name, units, level },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  


  return (
    <div ref={drag} style={{ opacity: isDragging ? "50%" : "100%", height: "10em", width: "150px", background: "lightblue", margin: "10px"}}>

      <div>       Code: {id}</div>
    <h3>  Modules: {name} </h3>  
       
<div>
Level: {level} | Units: {units} 

</div>
    </div>



  );
}

export default Course;
