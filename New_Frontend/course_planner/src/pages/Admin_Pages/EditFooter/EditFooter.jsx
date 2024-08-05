import React, { useState, useRef, useEffect } from 'react';
import './EditFooter.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { instance } from '../../../App';

function EditFooter() {
  
  const template = {
    year: 2024,
    organization: "NewcastlePlanner, Inc.",
    email: "askuon@newcastle.edu.au",
    phone: "+61 2 4921 5000",
    address: "6 Raffles Blvd, #03 - 200, Singapore 039594"
  }

  const [inputs, setInputs] = useState(template); 

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    try{
      const { data } = await instance.get("/pages/footer");
      if(data.message !== undefined){
        setInputs(data.message);
      }
    }
    catch(ex){
      alert(ex.response);
    }
  } 

  const handleSaveClick = async () => {
    try{
        const { data } = await instance.post("/pages/footer", {content: inputs});
        alert(data.message);
    }
    catch(ex){
        alert(ex.response?.data.error);
    }
  };

  const handleChange = (e) =>{
    setInputs((prev) =>({...prev, [e.target.name]: e.target.value}));
};

  return (
    <>
      <h1 style={{ textAlign: "center"}}>Edit Footer</h1>
      <div className="edit-footer">
        <div className='footer-container'>
          <label className="footer-label"> Year
            <br/>
            <input type="text" value={inputs?.year} onChange={(e) => handleChange(e)} name="year"/>
          </label>
          <label className="footer-label"> Organization
            <br/>
            <input type="text" value={inputs?.organization} onChange={(e) => handleChange(e)} name="organization"/>
          </label>
          <label className="footer-label"> Email
            <br/>
            <input type="text" value={inputs?.email} onChange={(e) => handleChange(e)} name="email"/>
          </label>
          <label className="footer-label"> Phone
            <br/>
            <input type="text" value={inputs?.phone} onChange={(e) => handleChange(e)} name="phone"/>
          </label>
          <label className="footer-label"> Address
            <br/>
            <input type="text" value={inputs?.address} onChange={(e) => handleChange(e)} name="address"/>
          </label>
        </div>
        <div className="footer-bottom-buttons">
          <Link to="../home" target="_blank" className="preview">Preview</Link>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </>
  );
}

export default EditFooter;