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
import courseM from '../../assets/courseM.png'
import courseAssign from '../../assets/courseAssign.png'
import courseManagment from '../../assets/courseManagment.png'
import Page from '../../assets/Page.png'
import AdminSettings from '../../assets/AdminSettings.png'



const Images = [
    {id: 1 ,name: 'Logo'},
    {id: 2, name: 'Building Background'},
    {id: 3, name: 'email'},
    {id: 4, name: 'phone'},
  ]


export default function DatabaseLink() {


      
       const [page, setPage] = useState(null);
       
       


       function showPage(){
          switch(page){
            case 'accountManagment':
            return <EditProgram/>;
            case 'adminAboutUs':
            return <AdminAboutUs/>;
            case 'About Us':
            return <AboutUs/>;
            case 'Privacy':
            return <AdminPolicy/>;
            case 'Term':
            return <AdminTerm/>;
            case 'Log-in':
            return <EditLoginPage/>;
            case 'Register':
            return <EditRegisterPage/>;
            case 'Home page':
            return <HomePage/>;
            case 'Navigation bar':
            return ;
            case 'Footer':
            return ;
            default: 
            return null;
          }
       };
      
       
      
       
      
        const [isOpen, setIsOpen] = useState(false);
        
        const options = ['About Us', 'Privacy', 'Term', 'Log-in', 'Register', 'Home page', 'Navigation bar', 'Footer'];
      
      
        const [images, setImages] = useState(Images);
      
        const [query, setQuery] = useState('');
      
        const filterCourses = images.filter(image =>
        image.name.includes(query.toLowerCase())
      
        );
      
        const [showDropdown, setShowDropDown] = useState(false);
      
    

  return (
   <div className='databaseNav'>
    
    <div className='dataBaseBtn'> 
          <button className='dbsBtn' onClick={ () =>setPage('adminAboutUs') }>
           <div><img className='rightImg' src={courseAssign}/>Course Management</div>
           </button>

           <button className='dbsBtn'>
           <div><img className='rightImg' src={courseManagment}/>Program Management</div>
            
           </button>

           <button className='dbsBtn' onClick={ () =>setPage('accountManagment') }>
           <div><img className='rightImg' src={AdminSettings}/>Account Management</div>
            
           </button>
         

          
      
      <button className='dbsBtn'  onClick={() => setIsOpen(!isOpen)}><img className='rightImg' src={Page}/><div className='webpageM' >Webpage Management</div>
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
          
          <div className='displayPopup'>
    {page && (
        <div style={{ width:"60vw" }}>
          {showPage()}
        </div>

    )}

    </div>

   </div>
  )
}
