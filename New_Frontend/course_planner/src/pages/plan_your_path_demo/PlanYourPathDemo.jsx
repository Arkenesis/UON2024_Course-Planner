import React, { useState, useEffect, Component, useRef, useContext } from "react";
import Trimesters from "./Trimesters";
import Course from "./Course";
import { DndProvider, useDrop } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import "./PlanYourPathDemo.scss"
import shareImg from "../../assets/shareImg.png"
import toast from 'react-hot-toast';
import xLogo from "../../assets/xLogo.png"
import facebookLogo from "../../assets/facebookLogo.png"
import { UserContext } from "../login/LoginContext";
import axios from 'axios';

// The data for the courses
// const Courses = [
//   {ID:'ECON1001', Level: 1, Units: 10, Name: "Microeconomics for business decision", GRADE: "D", TYPE: "ECON", ADDED: false}, 
//   {ID:'SENG1110', Level: 1, Units: 10, Name: "Object Oriented Programming", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
//   {ID:'COMP3350', Level: 3, Units: 10, Name: "Advanced Database", GRADE: "HD", TYPE: "COMP",  ADDED: false}, 
//   {ID:'EBUS3050', Level: 3, Units: 10, Name: "The Digital Economy", GRADE: "HD", TYPE: "EBUS",  ADDED: false}, 
//   {ID:'SENG1120', Level: 1, Units: 10, Name: "Data Structure", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
//   {ID:'INFT3100', Level: 3, Units: 10, Name: "Project Management", GRADE: "HD", TYPE: "INFT",  ADDED: false}, 
//   {ID:'SENG1050', Level: 1, Units: 10, Name: "Web Technologies", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
//   {ID:'SENG2130', Level: 2, Units: 10, Name: "System Analysis and Design", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
//   {ID:'COMP3851A', Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A", GRADE: "HD", TYPE: "COMP",  ADDED: false}, 
//   {ID:'INFT2051', Level: 2, Units: 10, Name: "Mobile Application Programming", GRADE: "HD", TYPE: "INFT",  ADDED: false}, 
//   {ID:'SENG2260', Level: 2, Units: 10, Name: "Human-Computer Interaction", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
//   {ID:'INFT2060', Level: 2, Units: 10, Name: "Applied Artificial Intelligence", GRADE: "HD", TYPE: "INFT",  ADDED: false},
// ];

function DragDrop() {
  const [courses, setCourses] = useState([]);
  
  const studentDefault = [
    { year: new Date().getFullYear(), term: 1, course:  ["", "", "", ""] },
    { year: new Date().getFullYear(), term: 2, course:  ["", "", "", ""] },
    { year: new Date().getFullYear(), term: 3, course:  ["", "", "", ""] },
    { year: new Date().getFullYear() + 1, term: 1, course:  ["", "", "", ""] },
    { year: new Date().getFullYear() + 1, term: 2, course:  ["", "", "", ""] },
  ];
  
  const { user, setUser } = useContext(UserContext);
  
  const [profile, setProfile] = useState({ "courses": studentDefault });

  const [studentTrimester, setStudentTrimester] = useState([]);

  // Update Profile Information for Saving Purpose
  useEffect(() => {
    setProfile({ "courses": studentTrimester });
    updateCoursesAdded(studentTrimester);
  }, [studentTrimester]);

  const [err, setErr] = useState(null);
  const [input, setInput] = useState({
    year: new Date().getFullYear(),
    trimester: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: parseInt(value, 10), // Parse the input value as an integer
    }));
  };

  // Upload to firebase
  const handleSave = async () => {
    try{
        const { data } = await axios.post("http://localhost:8080/pages/profile-courses", {content: profile});
        user.courses = [...profile.courses];
        user.firestore_data.courses = [...profile.courses];
        let temp = {...user};
        setUser(temp);
        alert('Saving course data success!');
    }
    catch(ex){
      setErr(ex.response?.data.message);
    }
  };

  // Get courses from firebase
  const getCourses = async () => {
    try{
        const { data } = await axios.get("http://localhost:8080/pages/courses");
        return data.message;
    }
    catch(ex){
        console.log(ex.response?.data.message);
    }
    return [];
  };
  
  // Add a course
  const addCourseToTrimester = (courseId, name, level, units, grade, parent_index, index) => {

    const currentTrimester = studentTrimester[parent_index];

    let duplicateFound = false;
    const checkEmpty = 0;

    //Checks if the row has the duplicate
    for (let i = 0; i < currentTrimester.course.length; i++) {

      if (currentTrimester.course[i] && currentTrimester.course[i][0] === courseId) {
        window.alert(courseId + " already exists in trimester " + currentTrimester.length);
        duplicateFound = true;
        break;
      }
      if(currentTrimester.course[i] === "" || currentTrimester.course[i] === '' ){
        checkEmpty + 1;
      }
    }

    if (courseId !== '' && duplicateFound == false) {
      if (courseId !== '' && duplicateFound == false && currentTrimester.course.length <= 4) {

        for (let i = 0; i < currentTrimester.course.length; i++) {
          if (currentTrimester.course[i] === "") {
            let updatedTrimester = [...studentTrimester];
            updatedTrimester[parent_index].course[i] = [ courseId, name, units, level, grade, true, ];
            setStudentTrimester(updatedTrimester);
            break;
          }
          // If the row is full, the module will be swapped on the location you added in
          else if (currentTrimester.course[3] !== "") {
            let updatedTrimester = [...studentTrimester];
            updatedTrimester[parent_index].course[index] = [ courseId, name, units, level, grade, true, ];
            setStudentTrimester(updatedTrimester);
            window.alert("found " + courses[i].ID);
            break;
          }
        }
      }
    }
  };  

  //
  const removeCourse = (event, parent_index, index) => {

    const currentTrimester = studentTrimester[parent_index];

    if(parent_index !== undefined && index !== undefined){
      let updatedTrimester = [...studentTrimester];
      updatedTrimester[parent_index].course[index] = "";
      setStudentTrimester(updatedTrimester);

      // Loop that row to organize the row
      const tempArray = [];

      for(let i = 0; i < currentTrimester.course.length; i++){
          if(currentTrimester.course[i] !== ""){
            let updatedTrimester = [...studentTrimester];
            tempArray.push(updatedTrimester[parent_index].course[i]);
            updatedTrimester[parent_index].course[i] = "";
            setStudentTrimester(updatedTrimester);
          }
      }

      for(let j = 0; j < currentTrimester.course.length && j < tempArray.length; j++){
          if(currentTrimester.course[j] === ""){
            let updatedTrimester = [...studentTrimester];
            updatedTrimester[parent_index].course[j] = tempArray[j];
            setStudentTrimester(() => updatedTrimester);
          }
        }
      }
      // Update Added Tag
      updateCoursesAdded(studentTrimester);
  };
  // Update Added Tag Function
  const updateCoursesAdded = (remaining) => {
    const newCourses = [...courses];
    for(let i = 0; i<newCourses.length; i++){
      newCourses[i].ADDED = false;
    }

    for(let i = 0; i<remaining.length; i++){
      let remainingCourses = remaining[i].course;
      for(let k = 0; k<remainingCourses.length; k++){
        let single_course = remainingCourses[k];
        if(single_course === ''){
          continue;
        }
        for(let j = 0; j<newCourses.length; j++){
          if(newCourses[j].ID == single_course[0]){
            let temp = newCourses[j];
            newCourses[j].ADDED = true;
            break;
          }
        }
      }
    }
    setCourses(newCourses);
  }

  const [showDropdown, setShowDropDown] = useState(false);
  
  const menuButton = (parent_index, index) =>{
    var courseOptions = document.getElementById('courseOptions');
    if (courseOptions.style.display === 'none') {
      courseOptions.style.display = 'block';
    } else{
      courseOptions.style.display = 'none';
    }
  }
  
  //Tracks count of the trimester number
  const [count, setCount] = useState(5);

  const triScroll = useRef();

  const notify = () => {windows.alert("Here h")};

  function addTrimester() {

    setCount((prevCount) => prevCount + 1);

    const newTrimester = { year: input.year, term: input.trimester, course: ["","", "", ""] };

    toast.success('Here is your toast.');

    let updatedTrimester = [...studentTrimester, newTrimester];
    setStudentTrimester(updatedTrimester);
    triScroll.current.scrollTop = triScroll.current.scrollHeight;

    for(i = 0; i <= studentTrimester.length; i++){
      updateTerm = studentTrimester[i].term;
      updateTerm = i+1;
      setStudentTrimester(updateTerm);
    }

  }

  const [showTrimesterDrop, setShowTrimesterDrop] = useState(false);

  function removeTrimester(trimesterBox){
    if(studentTrimester.length > 4){
      setCount((prevCount) => prevCount - 1);

      const newTrimesters = studentTrimester.filter((student) => student !== trimesterBox);
      // This updates the trimester
      setStudentTrimester(newTrimesters);
      window.alert("Deleted done");

      for(let i = 0; i <= studentTrimester.length; i++){
        updateTerm = studentTrimester[i].term;
        updateTerm = i+1;
        setStudentTrimester(updateTerm);
      }
    }
    else{
      window.alert("You can't delete more courses");
    }
  }

  // Group courses by type
  const groupCoursesByType = (courses) => {
    return courses.reduce((acc, course) => {
      if (!acc[course.TYPE]) {
        acc[course.TYPE] = [];
      }
      acc[course.TYPE].push(course);
      return acc;
    }, {});
  };

  // Handle grade change
  const handleChange = (e, parent_index, index) => {
    let temp = [...studentTrimester];
    // 0 == ID
    // 4 == grade
    temp[parent_index].course[index][4] = e.target.value;
    setStudentTrimester(temp);
  };

  // Initialize available courses and student's courses.
  useEffect(() => {
    const fetchData = async () => {
      let processed = user.courses;
      let temp_courses = await getCourses();
      setCourses(() => temp_courses);
      if (processed) {
        setProfile(prev => ({ ...prev, "courses": processed }));
        setStudentTrimester(processed);
      } else {
        setStudentTrimester(studentDefault);
      }
    };
    fetchData();
  },[]);

  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if(selectedOption !== ""){
      let temp = {};
      for(let i = 0; i< user.program[0].length; i++){
        if(user.program[0][i].name === selectedOption){
          let { message } = user.program[0][i];
          for(let j = 0; j< message.length; j++){
            for(let k = 0; k<courses.length; k++){
              if(courses[k].ID === message[j].id){
                const { ID, Level, Name, Units} = { ...courses[k], ...message[j] };
                let year = message[j].year;
                let trimester = message[j].trimester;
                if(!temp[year]){
                  temp[year] = {};
                }
                if(!temp[year][trimester]){
                  temp[year][trimester] = [];
                }
                let str = [ID, Name, Units, Level, "", true];
                temp[year][trimester].push(str);
              }
            }
          }
        }
      }

      let result = [];
      for(const _year in temp){
        for(const _trimester in _year){
          if(_trimester != 0){
            let c = temp[_year][_trimester];
            if(!c){
              c = [];
            }
            while(c.length < 4){
              c.push("");
            }
            result.push({
              year: parseInt(_year),
              term: parseInt(_trimester),
              course: c
            });
          }
        }
      }

      setStudentTrimester(result);
    }
  },[selectedOption]);
  
  return (

    <div className="planYourPath">
      <div className="plan-container">
        <p className="plan-title">Plan Your Path</p>
      </div>
      {err && (<p className="alert-notification"></p>)}
      <div className="planYourPathPage">

        <div className="trimestersDetails" ref={triScroll} >
          {Array.isArray(studentTrimester) && studentTrimester.map((trimesters, index) => 
             <div key={index}>
                <Trimesters 
                  key={index} id={index} name={courses.name} units={courses.units} level={courses.level} grade={courses.grade} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}
                  courses={courses} studentTrimester={studentTrimester}  setStudentTrimester={setStudentTrimester} trimesterIndex={index} menuButton={menuButton} deleteTrimesterPos={removeTrimester} removeTrimester={removeTrimester} trimesters={trimesters} handleChange={handleChange}/>
             </div>
          )}
        </div>
        
        <div>
          <div className="trimesterLibrary" >
            <div className="titleList">
              <h2>List of All Courses</h2>
              <label className="select-program-label">
                Auto Complete
                <br/>
                <select name="program-select" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
                  <option value="" className="select-program-option">-- Choose 1 Cohort --</option>
                  {user?.program && Array.isArray(user.program[0]) && user.program[0].map((i, idx) => (
                    <option value={i.name} key={idx} className="select-program-option">{i.name}</option>
                  ))}
                </select>
              </label>

            </div>
            {courses && 
              Object.entries(groupCoursesByType(courses)).map(([type, courseList], idx) => (
                <div key={idx}>
                  <h3 className="courseTitleLi">{type}</h3>
                  <div className="coursesPerType">
                    {courseList.map((course) => (
                      <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        
      </div>
      <div className="triesterMod">
        <div>
        <label> Year:   
        <input type="number" min="2000" max="2099" step="1" value={input.year} name="year" onChange={(e) => handleInputChange(e)}/>
        </label>
        <label> Trimester: 
        <input type="number" min="1" max="3" step="1" value={input.trimester} name="trimester" onChange={(e) => handleInputChange(e)}/>
        </label>
        <button onClick={() => addTrimester()} className="plan-add-more-trimester">+ Add more trimester</button>
        </div>
        <button onClick={() => handleSave()} className="plan-save">+ Save</button>
      </div>
    </div>
  );
}

export default DragDrop;

{/* <div className="topData">
  <h1 className="title">Plan Your Path</h1>

  <div className="shareBlk"  onClick={() => setShowDropDown(!showDropdown)}>
  <p className="share">Share </p>
  <img className="shareImg" src={shareImg} alt="share icon" />
  {showDropdown && (
    <div className="shareOptions">
      <div>
        <img className="" src={facebookLogo} alt="FacebookBtn" />
        <a href="https://www.facebook.com/">FaceBook</a>
      </div>

      <div>
        <img className="" src={xLogo} alt="Xbtn" />
        <a href="https://x.com/i/flow/login">X</a>
      </div>
      
    </div>
    )}
  </div>
</div>  */}