// import React, { useState, useRef } from 'react';
// import './EditNavBar.css';
// import { SketchPicker } from 'react-color';
// import uonLogo from '../../../assets/uonLogo.png';
// import eyeIcon from '../../../assets/eyeIcon.png'; // Visible eye icon
// import eyeIconCrossed from '../../../assets/eyeIconCrossed.png'; // Crossed-out eye icon
// import editIcon from '../../../assets/editIcon.png'; // Edit icon

// function EditNavBar() {
//   const [logo, setLogo] = useState(uonLogo);
//   const [showHome, setShowHome] = useState(true);
//   const [showContact, setShowContact] = useState(true);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [showAbout, setShowAbout] = useState(true);
//   const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
//   const [isHomeVisible, setIsHomeVisible] = useState(true);
//   const [isContactVisible, setIsContactVisible] = useState(true);
//   const [isAboutVisible, setIsAboutVisible] = useState(true);
//   const [isCancelPopupVisible, setIsCancelPopupVisible] = useState(false);

//   const [navTitles, setNavTitles] = useState({
//     home: 'Home',
//     contact: 'Contact',
//     about: 'About',
//   });

//   const [editingTitle, setEditingTitle] = useState({
//     home: false,
//     contact: false,
//     about: false,
//   });

//   const [showColorPicker, setShowColorPicker] = useState(false);

//   const fileInputRef = useRef(null);

//   // Predefined color options
//   const colorOptions = ['#FE4A49', '#FF7200', '#01847F', '#44A1A0', '#07393C', '#FDF498', '#854442'];
  
//   // Button handlers
//   const handleCancelClick = () => {
//     setIsCancelPopupVisible(true);
//   };

//   const handleCancelConfirmNo = () => {
//     setIsCancelPopupVisible(false);
//   };

//   const handleCancelConfirmYes = () => {
//     setIsCancelPopupVisible(false);
//     alert('Changes have been discarded.');
//   };

//   const handlePreviewClick = () => {
//     alert('Previewing changes.');
//   };

//   const handleSaveClick = () => {
//     setShowSuccessMessage(true);
//     setTimeout(() => setShowSuccessMessage(false), 3000);
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogo(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleLogoDelete = () => {
//     setLogo('');
//   };

//   const handleColorChange = (color) => {
//     setBackgroundColor(color.hex);
//   };

//   const toggleHomeVisibility = () => {
//     setIsHomeVisible(!isHomeVisible);
//   };

//   const toggleContactVisibility = () => {
//     setIsContactVisible(!isContactVisible);
//   };

//   const toggleAboutVisibility = () => {
//     setIsAboutVisible(!isAboutVisible);
//   };

//   // When clicking the 'span', it set the element 'span' back to 'input'
//   const handleEditTitle = (section) => {
//     setEditingTitle({ ...editingTitle, [section]: true, });
//   };

//   // Set the value to the changed value  when input shown
//   const handleTitleChange = (e, section) => {
//     setNavTitles({ ...navTitles, [section]: e.target.value, });
//   };

//   // When existing the input, it set the element 'input' back to 'span'
//   const handleTitleBlur = (section) => {
//     setEditingTitle({ ...editingTitle, [section]: false, });
//   };

//   return (
//     <div className="edit-navigation" style={{ backgroundColor }}>
//       <h1 className="title">Edit Navigation</h1>
//       <div className="boxes"></div>
//       <div className="navigation-items">
//         <div className="box">
//           {editingTitle.home ? (
//             <input
//               type="text"
//               value={navTitles.home}
//               onChange={(e) => handleTitleChange(e, 'home')}
//               onBlur={() => handleTitleBlur('home')}
//               autoFocus
//             />
//           ) : (
//             <span className="box-title" onClick={() => handleEditTitle('home')}>
//               {navTitles.home}
//             </span>
//           )}
//           <img
//             src={isHomeVisible ? eyeIcon : eyeIconCrossed}
//             alt="Toggle visibility"
//             className="eye-icon"
//             onClick={toggleHomeVisibility}
//           />
//           <img
//             src={editIcon}
//             alt="Edit title"
//             className="edit-icon"
//             onClick={() => handleEditTitle('home')}
//           />
//         </div>
//         <div className="box">
//           {editingTitle.contact ? (
//             <input
//               type="text"
//               value={navTitles.contact}
//               onChange={(e) => handleTitleChange(e, 'contact')}
//               onBlur={() => handleTitleBlur('contact')}
//               autoFocus
//             />
//           ) : (
//             <span className="box-title" onClick={() => handleEditTitle('contact')}>
//               {navTitles.contact}
//             </span>
//           )}
//           <img
//             src={isContactVisible ? eyeIcon : eyeIconCrossed}
//             alt="Toggle visibility"
//             className="eye-icon"
//             onClick={toggleContactVisibility}
//           />
//           <img
//             src={editIcon}
//             alt="Edit title"
//             className="edit-icon"
//             onClick={() => handleEditTitle('contact')}
//           />
//         </div>
//         <div className="box">
//           {editingTitle.about ? (
//             <input
//               type="text"
//               value={navTitles.about}
//               onChange={(e) => handleTitleChange(e, 'about')}
//               onBlur={() => handleTitleBlur('about')}
//               autoFocus
//             />
//           ) : (
//             <span className="box-title" onClick={() => handleEditTitle('about')}>
//               {navTitles.about}
//             </span>
//           )}
//           <img
//             src={isAboutVisible ? eyeIcon : eyeIconCrossed}
//             alt="Toggle visibility"
//             className="eye-icon"
//             onClick={toggleAboutVisibility}
//           />
//           <img
//             src={editIcon}
//             alt="Edit title"
//             className="edit-icon"
//             onClick={() => handleEditTitle('about')}
//           />
//         </div>
//       </div>

//       <h2 className="section-title">Logo</h2>
//       <div className="logo-section">
//         {logo ?
//           <div className="logo-image">
//             <img src={logo} className='img' alt="Logo" />
//           </div>:
//             <div className='logoBox'>Add Image</div>
//         }

//         <div className="logo-buttons">
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//             accept="image/*"
//             onChange={handleLogoChange}
//           />
//           <button className="change-logo" onClick={() => fileInputRef.current.click()}>
//             Change Logo
//           </button>
//           <button className="delete-logo" onClick={handleLogoDelete}>Delete Logo</button>
//         </div>
//       </div>

//       <div className="background-color">
//         <h2 className="section-title">Background Color</h2>
//         <div className="color-options">
//           {colorOptions.map((color) => (
//             <div
//               key={color}
//               className="color-box"
//               style={{ backgroundColor: color }}
//               onClick={() => setBackgroundColor(color)}
//             />
//           ))}
//         </div>
//         <button className="color-picker-button" onClick={() => setShowColorPicker(!showColorPicker)}>
//           Pick Color Manually
//         </button>
//         {showColorPicker && (
//           <div className="color-picker-popover">
//             <div className="color-picker-cover" onClick={() => setShowColorPicker(false)} />
//             <SketchPicker color={backgroundColor} onChangeComplete={handleColorChange} />
//           </div>
//         )}
//       </div>

//       <div className="bottom-buttons">
//         <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
//         <div className="right-buttons">
//           <button className="preview-button" onClick={handlePreviewClick}>Preview</button>
//           <button className="save-button" onClick={handleSaveClick}>Save</button>
//         </div>
//       </div>

//       {showSuccessMessage && (
//         <div className="success-message">
//           Changes saved successfully!
//         </div>
//       )}

//       {isCancelPopupVisible && (
//         <div className="modal" onClick={() => setIsCancelPopupVisible(false)}>
//           <div className="modal-content">
//             <span className="close" onClick={() => setIsCancelPopupVisible(false)}>&times;</span>
//             <h2>Confirm Cancel</h2>
//             <p>Are you sure you want to discard your changes?</p>
//             <div className="modal-buttons">
//               <button className="modal-cancel" onClick={handleCancelConfirmNo}>No</button>
//               <button className="modal-save" onClick={handleCancelConfirmYes}>Yes</button>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default EditNavBar;