import React, {forwardRef, useState, Component, useEffect} from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Course from "./Course";
import "./CourseDropped.scss"
import searchBtn from '../../assets/searchBtn.png'
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
 
    drop: (item) => {
      //The conditional statement prevents you from dragging empty trimester boxes with no data
      if(item.id !== undefined && item.name !== undefined) {
        addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
        removeCourse(item.parent_index, item.index);
      }
    },
    
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      //Show hover of dragabble areas
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
    <div key={index} ref={node => drop(node)}  style={{ opacity: isDragging? 0.8: 1, position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: isActive ? "280px" : "240px", height: isActive ? "280px" : "240px", background: isActive ? "#FED766" : "", transition: 'ease 300ms' }} className="trimesterBox"  >
    {item ? <div ref={node => drag(drop(node))}><CourseDropped   key={item[0]}  id={item[0]} name={item[1]} units={item[2]} level={item[3]} grade={item[4]}  removeCourse={removeCourse}  parent_index={parent_index} index={index}  menuButton={menuButton}/> 
    </div> : 

    <div style={{  height: '100%',
      display: 'flex',          
      alignItems: 'center',
      justifyContent: 'center'}}>
          
      <button className="addCoursebtn" onClick={() => setShowDropDown(!showDropdown)}>
        
      <div class="sign"><img className="searchBtn" src={searchBtn} alt="" /></div>
      
        <div className="text"> Add Course</div>
        
        </button>
      {showDropdown && (
        <div className="searchBox" style={{position: 'absolute', height: '200px', overflowY: 'scroll', top: '140px', zIndex: 1, background: '#FED766', margin:'0 0 0 0', color: 'black'}}>
          {/* This input takes the courses */}
          <input className="searchInput"
                type="text"
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}/>

          {filterCourses.map((course) => (
            <div key={course.id} style={{display: 'flex', alignContent: 'center', margin: '5% 10px', cursor: 'pointer', width: '200px' }} onClick={() => {
              addCourseToTrimester(course.ID, course.Name, course.Level, course.Units, course.Grade, parent_index, index);
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
 