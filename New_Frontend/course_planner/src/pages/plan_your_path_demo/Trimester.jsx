import React, {forwardRef, useState, Component, useEffect} from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import Course from "./Course";
import "./CourseDropped.scss"
import searchBtn from '../../assets/searchBtn.png'
import "./Trimester.scss"
import CourseDropped from "./CourseDropped";

const Trimester = ({parent_index, item, index, addCourseToTrimester, removeCourse, courses, studentTrimester, setStudentTrimester, trimesterIndex, menuButton, handleChange}) => {

  // Enables the components to give item(drag) 
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    // Define the Drop Item details can be obtained when drop
    item: { id: item[0], parent_index: parent_index, index: index},
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
        removeCourse(item.id ,item.parent_index, item.index);
      }
    },
    
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      //Show hover of dragabble areas
      canDrop: monitor.canDrop()
    }),

    

  }));

  const [showDropdown, setShowDropDown] = useState(false);
  
  const isActive = isOver && canDrop;
   
  // search bar usestate
  const [query, setQuery] = useState('');

  //This function will check if the input that the user adds contains the same words found from the courses' names
  const filterCourses = courses.filter(prev =>
    (prev.Name && prev.Name.toLowerCase().includes(query.toLowerCase())) ||
    (prev.ID && prev.ID.toLowerCase().includes(query.toLowerCase()))
  );







  return (
    //Enabling a ref to receive multiple attribute done by creating a lamdba function
    <div key={index} ref={node => drop(node)}  style={{ opacity: isDragging? 0.8: 1, position: "relative", width: isActive ? "240px" : "220px", height: isActive ? "300px" : "285px", background: isActive ? "#FED766" : "", transition: 'ease 300ms' }} className="trimesterBox"  >
      {item 
        ? <div ref={node => drag(drop(node))}>
            <CourseDropped   key={item[0]}  id={item[0]} name={item[1]} units={item[2]} level={item[3]} grade={item[4]}  removeCourse={removeCourse}  parent_index={parent_index} index={index}  menuButton={menuButton} handleChange={handleChange}/> 
          </div> 
        : 
          <div style={{  height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                
            <button className="addCoursebtn" onClick={() => setShowDropDown(!showDropdown)}>
              <div className="sign"><img className="searchBtn" src={searchBtn} alt="" /></div>
              <div className="text"> Add Course</div>
            </button>

            {showDropdown && (
              <div className="searchBox">
                {/* This input takes the courses */}
                <input className="searchInput" type="text" placeholder="Search courses..." value={query} onChange={(e) => setQuery(e.target.value)}/>

                {filterCourses.map((course) => (
                  <div key={course.id} className="search-courses" onClick={() => {
                    addCourseToTrimester(course.ID, course.Name, course.Level, course.Units, course.Grade, parent_index, index);
                    setShowDropDown(false);}}>
                    {course.Name}
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
 