import { useState, useRef } from 'react';
import hamburgerMenu from './assets/hamburgerMenu.png'



function CourseModule(){

const [isOpen, SetIsOpen] = useState(false);
const ref = useRef(null);

const toggleList = () => {
    SetIsOpen(!isOpen);
  };




    return(

       <div className="modules">

        <div className="moduleHeading">
        <h2>Core</h2>

        <div>
            {/* Used to hide the options in the hamburger menu and reveal it */}
  <img className="hamburgerMenu" src={hamburgerMenu} onClick={toggleList} />
  {isOpen && (
    <ul className='moduleMenuContent'>
      <li>Edit</li>
      <li>Remove</li>
    </ul>
  )}
</div>


        </div>

        <div className="moduleContent">
        <h4> INFT 3100</h4>
        
        <h3>Project Managment</h3>
        <h3 className="grade">Grade: C</h3>
        </div>

       </div>


    );
}

export default CourseModule