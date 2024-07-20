import React from 'react';
import NavigationBar from '../../components/NavigationBar';
import contactStyles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={contactStyles.contact_container}>
      <NavigationBar />
      <div className={contactStyles.contact_info}>
        <div className={contactStyles.contact_item}>
          <i id={contactStyles.contact_item_i} className="fas fa-envelope"></i>
          <span>askuon@newcastle.edu.au</span>
        </div>
        <div className={contactStyles.contact_item}>
          <i id={contactStyles.contact_item_i} className="fas fa-phone" ></i>
          <span>+61 2 4921 5000</span>
        </div>
        <div className={contactStyles.contact_item}>
          <i id={contactStyles.contact_item_i} className="fas fa-map-marker-alt"></i>
          <span>6 Raffles Blvd, #03 - 200, Singapore 039594</span>
        </div>
      </div>
      <div className={contactStyles.contact_form}>
        <form>
          <div className={contactStyles.form_group}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='Enter your name'  />
          </div>
          <div className={contactStyles.form_group}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Enter your email'  />
          </div>
          <div className={contactStyles.form_group}>
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Write your message here"></textarea>
          </div>
          <button type="submit" className={contactStyles.contact_button}>Send message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
