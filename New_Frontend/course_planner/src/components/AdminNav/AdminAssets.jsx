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
import HomePage from '../../pages/HomePage/HomePage'
import AdminPolicy from '../../pages/Admin_Pages/AdminPolicy/AdminPolicy'
import courseM from '../../assets/courseM.png'
import courseAssign from '../../assets/courseAssign.png'
import DatabaseLink from './DatabaseLink';



import './AdminNav.css';

// Define the image data
const Images = [
    { id: 1, name: 'Logo', link: 'courseAssign', path: courseAssign },
    { id: 2, name: 'Building Background', link: 'pageIcon', path: courseM },
    { id: 3, name: 'email', path: profileImg2 },
    { id: 4, name: 'phone', path: imageIcon },
];

function AdminAssets() {


    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const objectURL = URL.createObjectURL(file);
        setProfilePic(objectURL);
      }
    };

    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropDown] = useState(false);

    const filterCourses = Images.filter((image) =>
        image.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className='assetComp'>
  <div className='uploadImgDiv'>
  <div className="imgButtonContainer">
            <label className="addPic" for="input-fileAssets">
              Add Asset
            </label>
            <input
            style={{display:"none"}}
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              id="input-fileAssets"
              onChange={handleFileChange}
            />

  
 </div>

   </div>

            <div className='imgChoices'>
                <input
                    onClick={() => setShowDropDown(!showDropdown)}
                    className='searchInputAdmin'
                    type='text'
                    
                    placeholder='Search Images...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {showDropdown && (
                    <div
                        style={{
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: '10px', 
                            width: '300px',
                            position: 'absolute',
                            height: '200px',
                            overflowY: 'auto',
                            zIndex: 1,
                            background: 'lightgray',
                            margin: '0 0 0 ',
                            color: 'black',
                         
                         
                        }}
                    >
                        {filterCourses.map((image) => (
                            <div
                                key={image.id}
                                className='ImageBox'
                                style={{
                                    margin: '10% 10px',
                                    width: '200px',
                                    cursor: 'pointer',
                                    width: 'calc(50% - 5px)'
                                }}
                            >
                                <div className='imgName'>
                                    {image.name} 
                                </div>
                          
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='imgGallery'>
                {/* Display images here */}
                {filterCourses.map((image) => (
                    <img
                        key={image.id}
                        src={image.path}
                        alt={image.name}
                        style={{ width: '140px', height: 'auto', margin: '5px', cursor: 'pointer' }}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminAssets;
