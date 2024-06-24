import React from "react";
import { useDrag } from "react-dnd";
import hamburgerMenu from "../../assets/hamburgerMenu.png"
import "./Course.css"
import "./CourseDropped.css"

function CourseDropped({ id, name, units, level, grade, removeCourse, parent_index, index, menuButton}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "course",
    item: { id, name, units, level, grade },
    
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    
    }),
  }));


  


  //Allows to hide and show the menu
//  function menuButton(parent_index, index){
  
  
 
//   var courseOptions = document.getElementById('courseOptions');
//       if (courseOptions.style.display === 'none') {
//         courseOptions.style.display = 'block'
//       } else{
//         courseOptions.style.display = 'none';
//       }

//     }



  return (
    <div ref={drag} id="courseDropped" className="course"  style={{ opacity: isDragging ? "50%" : "100%", background: "#FFEFD7", height: "14em",
      width: "240px", margin: "10px", background: "#FFEFD7"}}>

<div className="courseHeader">
       <div className="heading"> <h3>Core</h3></div> 
       <div  id="hamburgerImg" onClick={()=> menuButton(parent_index, item)} className="hamburgerImg">
        <img style={{height: "50px"}} className="hamburgerMenu" src={hamburgerMenu} alt="hamburgerImage" />
        <div id="courseOptions" className="courseOptions" style={{}} ><ul className="subBox"><li>
       <button style={{padding: "0px", color: "black", backgroundColor: "transparent"}} onClick={() => removeCourse(parent_index, index)}>Remove</button>
        
        </li></ul></div>
        </div>
     
</div>

<div className="subDetails">
<span> <h3>  Modules: {name} </h3>  Level: {level} | Units: {units} </span>
<p>Grade: {grade}</p>
</div>
       

    </div>



  );
}

export default CourseDropped;
