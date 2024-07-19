import React, { useState, useEffect } from 'react';
import './AdminNav.css'
import databaseImg from '../../assets/databaseImg.png'
import imageIcon from '../../assets/imageIcon.png'
import profileImg2 from '../../assets/profileImg2.png'
import folderIcon from '../../assets/folderIcon.png'
import pageIcon from '../../assets/pageIcon.png'
import EditProgram from '../../pages/Admin_Pages/EditProgram/EditProgram'
import AdminAboutUs from '../../pages/Admin_Pages/AdminAboutUs/AdminAboutUs'
import AboutUs from '../../pages/AboutUs/AboutUs'
import AdminTerm from '../../pages/Admin_Pages/AdminTerm/AdminTerm'
import Login from '../../pages/login/Login'
import EditLoginPage from '../../pages/EditLoginPage/EditLoginPage'
import EditRegisterPage from '../../pages/EditRegisterPage/EditRegisterPage'
import HomePage from '../../pages/Homepage/HomePage'
import AdminPolicy from '../../pages/Admin_Pages/AdminPolicy/AdminPolicy'
import courseAssign from '../../assets/courseAssign.png'
import AdminSet from '../../assets/AdminSet.png'
import Page from '../../assets/Page.png'

import Dbs from './dbs'


const [isOpen, setIsOpen] = useState(false);

const options = ['About Us', 'Privacy', 'Term', 'Log-in', 'Register', 'Home page', 'Navigation bar', 'Footer'];


function dbs() {
  return (
    <div className='dataBaseBtn'> 
    <button className='dbsBtn' onClick={ () =>setPage('adminAboutUs') }>
     <div><img className='rightImg' src={courseAssign}/>Course Management</div>
     </button>

     <button className='dbsBtn'>
     <div><img className='rightImg' src={folderIcon}/>Program Management</div>
      
     </button>

     <button className='dbsBtn' onClick={ () =>setPage('accountManagment') }>
     <div><img className='rightImg' src={profileImg2}/>Account Management</div>
      
     </button>
   

    

<button className='dbsBtn'  onClick={() => setIsOpen(!isOpen)}><img className='rightImg' src={Page}/><div className='webpageM'>Webpage Management</div>
{isOpen && (
  <div className='optionBox'>
    {options.map(option => 
    <button className='optionsBtn' key={option} onClick={ () =>setPage(option)}>
    {option}

    </button>
    )}
  </div>
)}
</button>

    </div>
  )
}

export default dbs;
