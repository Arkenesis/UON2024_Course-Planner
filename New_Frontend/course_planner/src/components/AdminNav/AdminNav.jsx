import React, { useState } from 'react'
import './AdminNav.css'
import databaseImg from '../../assets/databaseImg.png'
import imageIcon from '../../assets/imageIcon.png'
import profileImg2 from '../../assets/profileImg2.png'
import folderIcon from '../../assets/folderIcon.png'
import pageIcon from '../../assets/pageIcon.png'
import EditProgram from '../../pages/Admin_Pages/EditProgram/EditProgram'
import AdminAboutUs from '../../pages/AdminAboutUs/AdminAboutUs'

export const AdminNav = () => {

 const [page, setPage] = useState(null);
  
 function showPage(){
    switch(page){
      case 'accountManagment':
      return <EditProgram/>;
      case 'adminAboutUs':
      return <AdminAboutUs/>;
      default: 
      return null;
    }
 };



  //Using useState to set the defualt value of DropDown Menu and declare the values
   const [selectedValue, setSelectedValue] = useState('Option 1'); 
  const handleChange = (event) => {
   setSelectedValue(event.target.value);
   };

  return (

    
    <div className='adminHomePage'>


      
    <div className='adminNav'>
        <div className='leftNav'>
        <div><img className='leftImgProfile' src={profileImg2} alt='Database img'/></div>

            <div>
        

            
              <img className='leftImg' src={databaseImg} alt='Database img'/>
            
              </div>
            <div>
              
              <img className='leftImg' src={imageIcon} alt='Database img'/>
              
              </div>

        </div>
        <div className='rightNav'>
           <button className='dbsBtn' onClick={ () =>setPage('adminAboutUs') }>
           <div><img className='rightImg' src=''/>Course Management</div>
           </button>

           <button className='dbsBtn'>
           <div><img className='rightImg' src={folderIcon}/>Program Management</div>
            
           </button>

           <button className='dbsBtn' onClick={ () =>setPage('accountManagment') }>
           <div><img className='rightImg' src={profileImg2}/>Account Management</div>
            
           </button>
           <button className='dbsBtn'>
           <div><img className='rightImg' src={pageIcon}/>Webpage Management</div>
       
           </button>

           

           
        </div>
         
         
    </div>

    
    {page && (
        <div>
          {showPage()}
        </div>

    )}






    </div>

  )
}
