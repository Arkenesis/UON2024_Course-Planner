import React, { useState, useRef, useEffect } from 'react';
import './EditNavBar.scss';
import { SketchPicker } from 'react-color';
import uonLogo from '../../../assets/uonLogo.png';
import eyeIcon from '../../../assets/eyeIcon.png'; // Visible eye icon
import editIcon from '../../../assets/eyeIcon.png'; // Visible eye icon
import eyeIconCrossed from '../../../assets/eyeIconCrossed.png'; // Crossed-out eye icon
import ImageUpload from '../../image_upload/image_upload';
import axios from 'axios';

function EditNavBar() {
  const [err, setErr] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isCancelPopupVisible, setIsCancelPopupVisible] = useState(false);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  
  const [navTitles, setNavTitles] = useState({
    backgroundColor: '#FFFFFF',
    logo: '',
    items: []
  }); 
  const setLogo = (input) => {
    let temp = { ...navTitles };
    temp.logo = input;
    setNavTitles(temp);
    setIsImagePreviewVisible(false);
  }

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    try{
      const { data } = await axios.get("http://localhost:8080/pages/navigation");
      const { backgroundColor, logo, items } = data.message;
      setNavTitles({backgroundColor, logo, items});
    }
    catch(error){
      setErr(error.response);
    }
  }

  const [showColorPicker, setShowColorPicker] = useState(false);

  const fileInputRef = useRef(null);

  // Predefined color options
  const colorOptions = ['#FE4A49', '#FF7200', '#01847F', '#44A1A0', '#07393C', '#FDF498', '#854442'];
  
  // Button handlers
  const handleImagePreviewClick = () => {
    setIsImagePreviewVisible(!isImagePreviewVisible);
  }

  const handleCancelClick = () => {
    setIsCancelPopupVisible(true);
  };

  const handleCancelConfirmNo = () => {
    setIsCancelPopupVisible(false);
  };

  const handleCancelConfirmYes = () => {
    setIsCancelPopupVisible(false);
    alert('Changes have been discarded.');
  };

  const handlePreviewClick = () => {
    alert('Previewing changes.');
  };

  const handleSaveClick = async () => {
    try{
        const { data } = await axios.post("http://localhost:8080/pages/navigation", {content: navTitles});
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    }
    catch(error){
        setErr(error.response?.data.error);
        setTimeout(() => setErr(undefined), 3000);
    }
  };

  const handleColorChange = (color) => {
    navTitles.backgroundColor(color.hex);
  };

  // Set title to the changed value, as it is array, so done via index
  const handleTitleChange = (e, idx) => {
    let temp = {...navTitles};
    temp.items[idx].title = e.target.value;
    setNavTitles(temp);
  };
  // Set title to the changed value, as it is array, so done via index
  const handleVisibility = (idx) => {
    let temp = {...navTitles};
    temp.items[idx].visibility = !temp.items[idx].visibility;
    setNavTitles(temp);
  }

  return (
    
    <div className="edit-navigation">
      
      <h1 className="title">Edit Navigation</h1>
      <div className="boxes"></div>
      <div className="navigation-items">
        {navTitles.items.map( (i, idx) => (
          <div className="box" key={idx}>
            <input type="text" value={i.title} onChange={(e) => handleTitleChange(e, idx)} autoFocus />
            <img src={i.visibility ? eyeIcon : eyeIconCrossed} alt="Toggle visibility" className="eye-icon" onClick={(e) => handleVisibility(idx)} />
            <img src={editIcon} alt="Edit title" className="edit-icon" onClick={() => handleEditTitle('home')} />
          </div>
        ))}
      </div>

      <h2 className="section-title">Logo</h2>
      <div className="logo-section">
        {navTitles.logo 
          ?
            <div className="logo-image">
              <img src={navTitles.logo} className='img' alt="Logo" />
            </div>
          :
            <div className='logoBox'>Add Image</div>
        }

        <div className="logo-buttons">
          {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleLogoChange} /> */}
          <button className="change-logo" onClick={handleImagePreviewClick}>
            Change Logo
          </button>
          <button className="delete-logo" onClick={() => setLogo('')}>Delete Logo</button>
        </div>
      </div>
      {isImagePreviewVisible && <ImageUpload setImageUrl={setLogo} /> }
      <div className="background-color">
        <h2 className="section-title">Background Color</h2>
        <div className="color-options">
          {colorOptions.map((color) => (
            <div
              key={color}
              className="color-box"
              style={{ backgroundColor: color }}
              onClick={() => setNavTitles((prev) => ({ ...prev, backgroundColor: color}))}
            />
          ))}
        </div>
        <button className="color-picker-button" onClick={() => setShowColorPicker(!showColorPicker)}>
          Pick Color Manually
        </button>
        {showColorPicker && (
          <div className="color-picker-popover">
            <div className="color-picker-cover" onClick={() => setShowColorPicker(false)} />
            <SketchPicker color={navTitles.backgroundColor} onChangeComplete={handleColorChange} />
          </div>
        )}
      </div>

      <div className="bottom-buttons">
        <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        <div className="right-buttons">
          <button className="preview-button" onClick={handlePreviewClick}>Preview</button>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </div>
      </div>

      {err && ( <p> {err} </p> )}

      {showSuccessMessage && (
        <div className="success-message">
          Changes saved successfully!
        </div>
      )}

      {isCancelPopupVisible && (
        <div className="modal" onClick={() => setIsCancelPopupVisible(false)}>
          <div className="modal-content">
            <span className="close" onClick={() => setIsCancelPopupVisible(false)}>&times;</span>
            <h2>Confirm Cancel</h2>
            <p>Are you sure you want to discard your changes?</p>
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={handleCancelConfirmNo}>No</button>
              <button className="modal-save" onClick={handleCancelConfirmYes}>Yes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default EditNavBar;