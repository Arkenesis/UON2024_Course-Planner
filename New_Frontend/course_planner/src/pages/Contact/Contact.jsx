import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import './Contact.scss';
import axios from 'axios';
const Contact = () => {

  const temp = {
    year: 2024,
    organization: "NewcastlePlanner, Inc.",
    email: "askuon@newcastle.edu.au",
    phone: "+61 2 4921 5000",
    address: "6 Raffles Blvd, #03 - 200, Singapore 039594"
  }

  const [value, setValue] = useState(temp);

  useEffect(() => {
    getData();
  },[])

  const getData = async () => {
    try{
      const { data } = await axios.get("http://localhost:8080/pages/footer");
      if(data.message !== undefined){
        setValue(data.message);
      }
    }
    catch(ex){
      alert(ex.response);
    }
  } 


  return (
    <div className="contact_container">
      <div className="contact_info">
        <div className="contact_item">
          <i className="fas fa-envelope"></i>
          <span>{value?.email}</span>
        </div>
        <div className="contact_item">
          <i className="fas fa-phone" ></i>
          <span>{value?.phone}</span>
        </div>
        <div className="contact_item">
          <i className="fas fa-map-marker-alt"></i>
          <span>{value?.address}</span>
        </div>
      </div>
      <div className="contact_form">
        <form>
          <div className="form_group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Enter your name'  />
          </div>
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter your email'  />
          </div>
          <div className="form_group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Write your message here"></textarea>
          </div>
          <button type="submit">Send message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
