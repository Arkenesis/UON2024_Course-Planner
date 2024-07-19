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
import DatabaseLink from './DatabaseLink';
import AdminAssets from './AdminAssets';
import help from '../../assets/help.png'
import profilePic from '../../assets/profilePic.png'
import picture from '../../assets/picture.png'
import databaseIcon from '../../assets/databaseIcon.png'
import profSettings from '../../assets/profSettings.png'
import signOut from '../../assets/signOut.png'

const Images = [
  {id: 1 ,name: 'Logo', link: 'courseAssign'},
  {id: 2, name: 'Building Background', link: 'pageIcon'},
  {id: 3, name: 'email'},
  {id: 4, name: 'phone'},
]


export const AdminNav = (page) => {


 

 

  const [isOpen, setIsOpen] = useState(false);
  
  const options = ['About Us', 'Privacy', 'Term', 'Log-in', 'Register', 'Home page', 'Navigation bar', 'Footer'];


  const [images, setImages] = useState(Images);

  const [query, setQuery] = useState('');

  const filterCourses = images.filter(image =>
  image.name.toLowerCase().includes(query.toLowerCase())

  );

  const [showDropdown, setShowDropDown] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [leftNav, setLeftNav] = useState(null);

  function showNav(){
    switch(leftNav){
      case 'databaseLink':
      return <DatabaseLink/>;

      case 'adminAssets':
      return <AdminAssets/>;

      default: 
      return <AdminAssets/>;
    }
 };


  return (

    
    <div className='adminHomePage'>



      <div className='adminNav'>
      <div className='leftNav'>
      <div className='mainAdminNav' ><img className='leftImgProfile' src={profilePic} alt='Database img'  onClick={() =>setLeftNav(!showProfile)}/></div>
      {showProfile && 
      (<div className='profilePage'>
      <div className='profileData'> <img src={profilePic} alt="profile picture" />  <div className='userName'>Miley Cyrus</div></div>
      <div className='profileSettings'> <img src={profSettings} alt="profile settings" />  Profile Settings</div>

      <div className='signOut'><img src={signOut} alt="sign out" />  Sign Out</div>

      </div>

      )

      }
          <div className='mainAdminNav' onClick={ () =>setLeftNav('databaseLink')}>
        
          <img className='leftImg' src={databaseImg} alt='Database img'/>
          
            </div>
            
          <div className='mainAdminNav'  onClick={ () =>setLeftNav('adminAssets')} >
            
            <img className='leftImg' src={picture} alt='Database img'/>
            
            </div>

            <div className='mainAdminNav' >
            
            <img className='leftImg' src={help} alt='help'/>
            
            </div>

      </div>
      <div className='rightNav'>

      <div>
    {leftNav && (
        <div style={{ width:"60vw" }}>
          {showNav()}
        </div>

    )}

    </div>
 
      </div>
        
      
    </div>

  




    </div>

  )
}
