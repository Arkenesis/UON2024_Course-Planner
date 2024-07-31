import React, { useState, useEffect, Component, useRef } from "react";
import Trimesters from "./Trimesters";
import Course from "./Course";
import { DndProvider, useDrop } from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend'
import "./PlanYourPathDemo.scss"
import shareImg from "../../assets/shareImg.png"
import toast from 'react-hot-toast';
import xLogo from "../../assets/xLogo.png"
import facebookLogo from "../../assets/facebookLogo.png"

// The data for the courses
const Courses = [
  {ID:'ECON1001', Level: 1, Units: 10, Name: "Microeconomics for business decision", GRADE: "D", TYPE: "ECON", ADDED: false}, 
  {ID:'SENG1110', Level: 1, Units: 10, Name: "Object Oriented Programming", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'COMP3350', Level: 3, Units: 10, Name: "Advanced Database", GRADE: "HD", TYPE: "COMP",  ADDED: false}, 
  {ID:'EBUS3050', Level: 3, Units: 10, Name: "The Digital Economy", GRADE: "HD", TYPE: "EBUS",  ADDED: false}, 
  {ID:'SENG1120', Level: 1, Units: 10, Name: "Data Structure", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'INFT3100', Level: 3, Units: 10, Name: "Project Management", GRADE: "HD", TYPE: "INFT",  ADDED: false}, 
  {ID:'SENG1050', Level: 1, Units: 10, Name: "Web Technologies", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'SENG2130', Level: 2, Units: 10, Name: "System Analysis and Design", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'COMP3851A', Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A", GRADE: "HD", TYPE: "COMP",  ADDED: false}, 
  {ID:'INFT2051', Level: 2, Units: 10, Name: "Mobile Application Programming", GRADE: "HD", TYPE: "INFT",  ADDED: false}, 
  {ID:'SENG2260', Level: 2, Units: 10, Name: "Human-Computer Interaction", GRADE: "HD", TYPE: "SENG",  ADDED: false}, 
  {ID:'INFT2060', Level: 2, Units: 10, Name: "Applied Artificial Intelligence", GRADE: "HD", TYPE: "INFT",  ADDED: false},
];



function DragDrop() {
  const [courses, setCourses] = useState(Courses);
  let coursesObject = Courses[0];
  let courseEntries = Object.entries(coursesObject);

  // Force render the sub components
  // Without key, the actual dragged item won't get update, lead to weird display bug 
  const [key, setKey] = useState(0);

  const [studentTrimester, setStudentTrimester] = useState([
    
    {
      trimesterId: 1,
      year: 2023,
      term: 1,
      course: ["", "" , "" , ""]
    },
    {
      trimesterId: 2,
      year: 2023,
      term: 2,
      course: ["", "", "", ""]
    },
    {
      trimesterId: 3,
      year: 2023,
      term: 3,
      course:  ["", "", "", ""]
    },
    {
      trimesterId: 4,
      year: 2023,
      term: 4,
      course:  ["", "", "", ""]
    },

  ]);


  
  const addCourseToTrimester = (courseId, name, level, units, grade, parent_index, index) => {


    const currentTrimester = studentTrimester[parent_index];
 

      let duplicateFound = false;
      const checkEmpty = 0;

    //Checks if the row has the duplicate
      for (let i = 0; i < currentTrimester.course.length; i++) {

        if (currentTrimester.course[i] && currentTrimester.course[i][0] === courseId) {
          window.alert(courseId + " already exists in trimester " + currentTrimester.trimesterId);
          duplicateFound = true;
          break;
        }
        if(currentTrimester.course[i] === "" || currentTrimester.course[i] === '' ){
              checkEmpty + 1;
        }
      }
        

        if (courseId !== '' && duplicateFound == false) {
          if (courseId !== '' && duplicateFound == false && currentTrimester.course.length <= 4) {

             for(let i = 0; i < currentTrimester.course.length; i++){

              if(currentTrimester.course[i] === ""){
                let updatedTrimester = [...studentTrimester];
                updatedTrimester[parent_index].course[i] = [courseId, name, units, level, grade, true];

                setCourses(prevCourses => 
                  prevCourses.map(course =>
                    course.ID.toLowerCase() ===  courseId.toLowerCase() ? {...course, ADDED: true} : course
                  )
                  
                )
             
           
                
                setStudentTrimester(() => updatedTrimester);
            
                break;
              }
              // If the row is full, the module will be swapped on the location you added in
              else if(currentTrimester.course[3] !== ""){

                let updatedTrimester = [...studentTrimester];
                updatedTrimester[parent_index].course[index] = [courseId, name, units, level, grade, true];
                
                setStudentTrimester(() => updatedTrimester);
                      window.alert("found " + courses[i].ID);

                setCourses(prevCourses => 
                  prevCourses.map(course =>
                    course.ID ===  courseId ? {...course, ADDED: false} : course
                  )
                  
                )
              
            
                break;

              }
            

             }


    
          }

    
      if(key < 2)
        setKey((k) => k + 1);
      else
        setKey((k) => k - 1);
  }

  };  


  const removeCourse = (parent_index, index, id) => {

    const currentTrimester = studentTrimester[parent_index];
    const courseTrimester = currentTrimester.course[index]
 

    if(parent_index !== undefined && index !== undefined){

            
  
      let updatedTrimester = [...studentTrimester];
      updatedTrimester[parent_index].course[index] = "";
      setStudentTrimester(updatedTrimester);
        
    

      let matchCount = 0;

      studentTrimester.forEach(trimester => {
        trimester.course.forEach(currentCourse => {
          if (currentCourse && currentCourse[0] === courseTrimester[0]) {
            matchCount++;
          } 
        });
      });

      if(matchCount == 0){

        
        setCourses(prevCourses => 
          prevCourses.map(course =>
            course.ID.toLowerCase() ===  courseTrimester[0].toLowerCase() ? {...course, ADDED: false} : course
          )
          
        )
        
      }



  
      
  
      
      // Check if the course id to change the status of the course
  
        
      


      // Loop that row to organize the row
      const tempArray = [];

      for(let i = 0; i < currentTrimester.course.length; i++){
        
          if(currentTrimester.course[i] === ""){

          }
          else{

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

          
          

    // Force render the sub components
    // Used to solve the weird display bug

    if(key < 2)
      setKey((k) => k + 1);
    else
      setKey((k) => k - 1);
  };


    const [showDropdown, setShowDropDown] = useState(false);
  
  const menuButton = (parent_index, index) =>{
    var courseOptions = document.getElementById('courseOptions');
    if (courseOptions.style.display === 'none') {
      courseOptions.style.display = 'block';
    } else{
      courseOptions.style.display = 'none';
    }
    if(key < 2)
      setKey((k) => k + 1);
    else
      setKey((k) => k - 1);
  }
  
  //Tracks count of the trimester number
  const [count, setCount] = useState(5);

  const triScroll = useRef();



  function addTrimester() {

    setCount((prevCount) => prevCount + 1);

    const newTrimester = {
      year: 2023,
      term: count,
      course: ["","", "", ""]
    };
  

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
    
   if(studentTrimester.length > 4 && window.confirm("Do you really want to delete?")){
    setCount((prevCount) => prevCount - 1);
   
    const newTrimesters = studentTrimester.filter((student) => student !== trimesterBox);
    //  This updates the trimester
     setStudentTrimester(newTrimesters);
    
    
  //  for(i = 0; i <= studentTrimester.length; i++){
  //     updateTerm = studentTrimester[i].term;
  //     updateTerm =    {...studentTrimester, term: i+1} ;
  //     setStudentTrimester(updateTerm);
  //  }
     
  

   window.alert("Selected trimester deleted");
   }
   else if(studentTrimester.length <= 4){
    window.alert("You can't delete more courses");
   }
   else{
    window.alert("Process cancelled");
   }
 
    //Update trimester number small bugs though where number won't show unless you add a course
    count = 1;
   let currentCount = count;
   const updatedTrimesters = studentTrimester.map(trimester => ({
       ...trimester, 
       term: currentCount++
   }));
   setStudentTrimester(updatedTrimesters);
   setCount(currentCount);

 
  }




  return (

    <div className="planYourPath">
      <div className="topData">
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
      </div> 

      <div key={key} className="planYourPathPage">

    

        <div className="trimestersDetails" ref={triScroll} >

          {studentTrimester.map((trimesters, index) => 
             <div>
        <span><button className="deleteTrimester" onClick={() => removeTrimester(trimesters)}>-</button></span>

            <Trimesters 
            key={index} id={index} name={courses.name} units={courses.units} level={courses.level} grade={courses.grade} year={trimesters.year} term={trimesters.term} course={trimesters.course} addCourseToTrimester={addCourseToTrimester} removeCourse={removeCourse}
            courses={courses} studentTrimester={studentTrimester}  setStudentTrimester={setStudentTrimester} trimesterIndex={index} menuButton={menuButton} deleteTrimesterPos={removeTrimester} />

             </div>
            
              
            
            
          )}

        
       
         
        </div>
        
        <div>
          <div className="trimesterLibrary" >
          <div className="titleList">
             <h2>List of All Courses</h2>
            </div>
            <div>
          
              <h3 className="courseTitleLi">Econ </h3>
              <div className="coursesPerType">
              {courses.map((course) => (
                course.TYPE === "ECON" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
              ))}
              </div>
           
            </div>

            <div>
              <hr />
              <h3 className="courseTitleLi">Ebus</h3>
              <div className="coursesPerType">
              {courses.map((course) => (
                course.TYPE === "EBUS" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
              ))}
              </div>
            </div>

            <div>
              <hr />
              <h3 className="courseTitleLi">INFT</h3>
              <div className="coursesPerType">
              {courses.map((course) => (
                course.TYPE === "INFT" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
              ))}
              </div>
            </div>

            <div>
              <hr />
              <div className="coursesPerType">
              <h3 className="courseTitleLi">SENG</h3>
              {courses.map((course) => (
                course.TYPE === "SENG" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
                ))}
                </div>
            </div>
            <div>
              <hr />
              <div className="coursesPerType">
              <h3 className="courseTitleLi">COMP</h3>
              {courses.map((course) => (
                course.TYPE === "COMP" && <Course key={course.ID} id={course.ID} name={course.Name} level={course.Level} units={course.Units} added={course.ADDED}/>
                ))}
                </div>
            </div>
        
          </div>   

         
       
        </div>
        
      </div>
      <div className="triesterMod">
      <div>
      <button  onClick={() => addTrimester()}>+ Add more trimester</button>
      </div>
      <div>

      </div>
          
            </div> 
    </div>
  );
}

export default DragDrop;
