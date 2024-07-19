import React, { useState } from 'react'
import './AdminNav.css'
import databaseImg from '../../assets/databaseImg.png'
import imageIcon from '../../assets/imageIcon.png'
import profileImg2 from '../../assets/profileImg2.png'
import folderIcon from '../../assets/folderIcon.png'
import pageIcon from '../../assets/pageIcon.png'
import EditProgram from '../../pages/Admin_Pages/EditProgram/EditProgram'
import AdminAboutUs from '../../pages/AdminAboutUs/AdminAboutUs'
import AboutUs from '../../pages/AboutUs/AboutUs'
import AdminTerm from '../../pages/AdminTerm/AdminTerm'
import Login from '../../pages/login/Login'
import EditLoginPage from '../../pages/EditLoginPage/EditLoginPage'
import EditRegisterPage from '../../pages/EditRegisterPage/EditRegisterPage'
import HomePage from '../../pages/Homepage/HomePage'
import AdminPolicy from '../../pages/AdminPolicy/AdminPolicy'
import courseM from '../../assets/courseM.png'


const Images = [
  {id: 1 ,name: 'Logo'},
  {id: 2, name: 'Building Background'},
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
  image.name.includes(query.toLowerCase())

  );

  const [showDropdown, setShowDropDown] = useState(false);



  return (

    
    <div className='adminHomePage'>


      
    <div className='adminNav'>
        <div className='leftNav'>
        <div className='mainAdminNav' ><img className='leftImgProfile' src={profileImg2} alt='Database img'/></div>

            <div className='mainAdminNav' onClick={() => setMainAdminNav}>
        

            
              <img className='leftImg' src={databaseImg} alt='Database img'/>
            
              </div>
            <div className='mainAdminNav' >
              
              <img className='leftImg' src={imageIcon} alt='Database img'/>
              
              </div>

        </div>
        <div className='rightNav'>


          <div className='dataBaseBtn'> 
          <button className='dbsBtn' onClick={ () =>setPage('adminAboutUs') }>
           <div><img className='rightImg' src={courseM}/>Course Management</div>
           </button>

           <button className='dbsBtn'>
           <div><img className='rightImg' src={folderIcon}/>Program Management</div>
            
           </button>

           <button className='dbsBtn' onClick={ () =>setPage('accountManagment') }>
           <div><img className='rightImg' src={profileImg2}/>Account Management</div>
            
           </button>
         

          
      
      <button className='dbsBtn'  onClick={() => setIsOpen(!isOpen)}><img className='rightImg' src={pageIcon}/><div className='webpageM'>Webpage Management</div>
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
          


           
        </div>
         
         
    </div>

    <div className='displayPopup'>
    {page && (
        <div style={{ width:"60vw" }}>
          {showPage()}
        </div>

    )}

    </div>
   
   <div className='imgChoices'>
   <button className="addImgBtn" onClick={() => setShowDropDown(!showDropdown)}>Add Course</button>
   <input
    onClick={() => setShowDropDown(!showDropdown)}
    className="searchImg"
  type="text"
  placeholder="Search Images..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
   {showDropdown && (
  <div style={{ position: 'relative', height: '200px', overflowY: 'auto', zIndex: 1, background: '#ffe5e3', margin:'70px 0 0 -200px', color: 'black'}}>
 {/* This input takes the Images */}
    <input
   type='text'
   className='searchBox'
/>
    {filterCourses.map((image) => (
     
     <div key={image.id} style={{margin: '10% 10px', width: '200px', cursor: 'pointer' }} onClick={() => {
  
        setShowDropDown(false);
      }}>
        <div  className="imgName">
        {image.name}

        </div>
      </div>
    ))}
  </div>
)}
 <div>

  <div>
  <img src="" alt="" />
  <img src="" alt="" />
  </div>

  <div>
  <img src="" alt="" />
  <img src="" alt="" />
  </div>

 </div>



   </div>





    </div>

  )
}
