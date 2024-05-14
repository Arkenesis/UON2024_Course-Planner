import CourseModule from './CourseModule.jsx'
import React, {useState, useEffect} from "react";

const oldTasks = localStorage.getItem("tasks")

function App(){

  return(

  <div className='path'>
  
  <Trimester/>
 

  </div>   

  );



}

export default App