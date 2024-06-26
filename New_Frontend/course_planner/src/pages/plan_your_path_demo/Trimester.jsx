import React, {forwardRef, useState} from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Course from "./Course";
import "./CourseDropped.css"

import "./Trimester.scss"
import CourseDropped from "./CourseDropped";

const Trimester = ({parent_index, item, index, addCourseToTrimester, removeCourse, courses, studentTrimester, setStudentTrimester, trimesterIndex, menuButton}) => {

  // Enables the components to give item(drag) 
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    // Define the Drop Item details can be obtained when drop
    item: { id: item[0], parent_index: parent_index, index: index,},
    // Used to alert user
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Enables the components to receive item
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "course",
    // drop: (item) => {
    //   // addCourseToTrimester(dropItem.id, parent_index, index);
    //   addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
    //   removeCourse(dropItem.parent_index, dropItem.index);
    // },
    drop: (item) => {
      //The conditional statement prevents you from dragging empty trimester boxes with no data
      if(item.id !== undefined && item.name !== undefined) {
        addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
        removeCourse(item.parent_index, item.index);
      }
    },
    
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop()
    }),

    

  }));

  const [showDropdown, setShowDropDown] = useState(false);
  
   const isActive = isOver && canDrop
   
// For search bar is below

const [query, setQuery] = useState('');

//This function will check if the input that the user adds contains the same words found from the courses' names
const filterCourses = courses.filter(course =>
  course.Name.toLowerCase().includes(query.toLowerCase()) ||
  course.ID.toLowerCase().includes(query.toLowerCase())


);

  return (
    //Enabling a ref to receive multiple attribute done by creating a lamdba function
    //<div ref={(el)=> {drop(el); drag(el);}} key={index} style={{ height: "240px", width: "400px"}} className="trimesterBox">
     
    <div ref={node => drag(drop(node))} key={index} style={{ opacity: isDragging? 0.5: 1, height: "240px",display: "flex", alignItems: "center", width: "300px", background: isActive ? "#FED766" : "" }} className="trimesterBox"  >
    {item ? <div><CourseDropped key={item[0]}  id={item[0]} name={item[1]} units={item[2]} level={item[3]}  removeCourse={removeCourse}  parent_index={parent_index} index={index}  menuButton={menuButton}/> 
    </div> : 

    <div ref={node => drag(drop(node))} style={{  height: '100%',
      display: 'flex',          
      alignItems: 'center',
      justifyContent: 'center'}}>
          
      <button className="addCoursebtn" onClick={() => setShowDropDown(!showDropdown)}>Add Course</button>
      {showDropdown && (
        <div style={{ position: 'relative', height: '200px', overflowY: 'auto', top: '80px', zIndex: 1, background: '#ffe5e3', margin:'70px 0 0 -200px', color: 'black'}}>
          {/* This input takes the courses */}
          <input className="searchInput"
                type="text"
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}/>

          {filterCourses.map((course) => (
            <div key={course.id} style={{margin: '10% 10px', cursor: 'pointer', width: '300px' }} onClick={() => {
              addCourseToTrimester(course.ID, course.Name, course.Level, course.Units, item.Grade, parent_index, index);
              setShowDropDown(false);}}>
              <div  className="courseName"> {course.Name} </div>
            </div>
          ))}
        </div>
      )}
    </div>
    }
    </div>
  );
};

export default Trimester;
 