import React from "react";
import { useDrag } from "react-dnd";

function Course({ id, name, level, units }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id: id , name: name , level: level, units: units},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div ref={drag} style={{ opacity: isDragging ? "50%" : "100%", height: "10em", width: "150px", background: "lightblue", margin: "10px"}}>
      Code: {id} | Modules: {name} | Level: {level} | Units: {units}  
    </div>
  );
}

export default Course;
