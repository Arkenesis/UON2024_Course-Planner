import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import CourseDropped from "./CourseDropped";
import "./Trimester.scss";
import searchButton from "../../assets/searchbutton.png";

const Trimester = ({ parent_index, item, index, addCourseToTrimester, removeCourse, courses, menuButton }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id: item[0], parent_index, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "course",
    drop: (item) => {
      if (item.id !== undefined && item.name !== undefined) {
        addCourseToTrimester(item.id, item.name, item.level, item.units, item.grade, parent_index, index);
        removeCourse(item.parent_index, item.index);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [showDropdown, setShowDropDown] = useState(false);
  const [query, setQuery] = useState('');

  const filterCourses = courses.filter(course =>
    course.Name.toLowerCase().includes(query.toLowerCase()) ||
    course.ID.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={node => drag(drop(node))} key={index} className="trimesterBox" style={{ opacity: isDragging ? 0.8 : 1, position: "relative" }}>
      {item ? (
        <div>
          <CourseDropped key={item[0]} id={item[0]} name={item[1]} units={item[2]} level={item[3]} removeCourse={removeCourse} parent_index={parent_index} index={index} menuButton={menuButton} />
        </div>
      ) : (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button className="addCoursebtn" onClick={() => setShowDropDown(!showDropdown)}>
            <span className="buttonImage"></span>
          </button>
          {showDropdown && (
            <div className="searchBox" style={{ position: 'absolute', height: '200px', overflowY: 'scroll', top: '140px', zIndex: 1, background: '#FED766', color: 'black' }}>
              <input
                className="searchInput"
                type="text"
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {filterCourses.map((course) => (
                <div key={course.ID} style={{ display: 'flex', alignContent: 'center', margin: '5% 10px', cursor: 'pointer', width: '200px' }} onClick={() => {
                  addCourseToTrimester(course.ID, course.Name, course.Level, course.Units, course.Grade, parent_index, index);
                  setShowDropDown(false);
                }}>
                  <div className="courseName">{course.Name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trimester;
