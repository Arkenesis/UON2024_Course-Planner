import React from "react";
import { useDrag } from "react-dnd";

function Course({ id, name, level, units }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div ref={drag} style={{ opacity: isDragging ? "50%" : "100%", height: "10em", width: "150px"}}>
      Code {id} | Modules {name} | Level: {level} | Units: {units}  
    </div>
  );
}

export default Course;
