
import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <div className={styles.about_us}>
      <header className={styles.about_us_header}>
        <h1 className="styles.about_us_header_h1">Welcome To UON Course Planner</h1>
      </header>
      <main className={styles.main}>
        <p>
          UON Course Planner is a Professional Educational Platform. Here we will provide you only
          interesting content, which you will like very much. We're dedicated to providing you the
          best of Educational, with a focus on dependability and Plan Course throughout your Study.
          We're working to turn our passion for Educational into a booming online website. We hope
          you enjoy our Educational as much as we enjoy offering them to you.
        </p>
        <p>
          I will keep posting more important posts on my Website for all of you. Please give your
          support and love.
        </p>
      </main>
      <section className={styles.thanks_message}>
        <p className='styles.thanks_message_p'>Thanks For Visiting Our Site </p>
        <p className='styles.thanks_message_lastline'>Have a nice day!</p>
      </section>
    </div>
  );
}

export default AboutUs;
