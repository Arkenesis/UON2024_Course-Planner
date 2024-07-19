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



const Images = [
  {id: 1 ,name: 'Logo', link: 'courseAssign'},
  {id: 2, name: 'Building Background', link: 'pageIcon'},
  {id: 3, name: 'email'},
  {id: 4, name: 'phone'},
]


export const AdminNav = () => {

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
  image.name.toLowerCase().includes(query.toLowerCase())

  );

  const [showDropdown, setShowDropDown] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  return (

    
    <div className='adminHomePage'>


      
    <div className='adminNav'>
        <div className='leftNav'>
        <div className='mainAdminNav' ><img className='leftImgProfile' src={profilePic} alt='Database img'  onClick={() =>setShowProfile(!showProfile)}/></div>
{showProfile && 
(<div>
  fsdfsdfs
  </div>

)

}
            <div className='mainAdminNav' onClick={() => setMainAdminNav}>
        

            
              <img className='leftImg' src={databaseImg} alt='Database img'/>
            
              </div>
            <div className='mainAdminNav' >
              
              <img className='leftImg' src={picture} alt='Database img'/>
              
              </div>

              <div className='mainAdminNav' >
              
              <img className='leftImg' src={help} alt='help'/>
              
              </div>

        </div>
        <div className='rightNav'>

        <DatabaseLink/>
        </div>
         
         
    </div>

  
   
 




    </div>

  )
}
