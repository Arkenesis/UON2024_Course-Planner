import React from 'react';
import courseCompleted from '../../assets/courseCompleted.png';
import myInfo from '../../assets/myInfo.png';

import './HomePage.css';

const HomePage = () => {
    const currentDate = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  
    // To put a comma in the date:
    const formattedDate = currentDate.replace(/ (\d{2})/, ', $1');
  
    return (
      <>
      <div className="course-activity">
        <h1 style={{opacity:"0.47"}}>Course Activity</h1>
        <p className="current-date" style={{color:"#1577BD"}}><b>{formattedDate}</b></p>
        <div className="course-info">
          <div className="course-completed">
            <div className="card">
              <div className="left">
                <img src={courseCompleted} alt="course completed icon" width="80" style={{float:"left"}}/>
              </div>
              <div className="right">
                <h2>Course Completed</h2>
                <p style={{marginBottom:"-10px"}}><b>Enrolled</b></p>
                <p style={{marginBottom:"-10px",fontSize:"smaller"}}>Bachelor of Information Technology </p>
                <p style={{fontSize:"smaller"}}>(2023-2024)</p>
              </div>
            </div>
            
            <div className="progress-section">
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
              <p style={{marginLeft:"10px", fontSize:"smaller"}}>12/16</p>
            </div>
            <button class="DetailButton">Detail</button>
          </div>
        </div>
  
        <div className="course-info">
          <div className="my-info">
  
          <div className="card">
            <div className="left">
              <img src={myInfo} alt="myInfo icon" width="80" style={{float:"left"}}/>
            </div>
            <div className="right">
              <h2>My Info</h2>
              <p style={{marginBottom:"-10px"}}><b>Miley Cyrus</b></p>
              <p style={{fontSize:"smaller"}}><b>c3438043@uon.edu.au</b></p>
              <p style={{marginBottom:"-5px",fontSize:"smaller"}}>Campus: Singapore</p>
              <p style={{fontSize:"smaller"}}>Level of Study: Undergraduate</p>
            </div>
          </div>
          <button class="DetailButton">Detail</button>
        </div>
      
  
      <div className="current-courses">
        <h2 className="course-title">Trimester 1 Singapore 2024</h2>
        <ul>
          <li className="course-item">
            <span className="course-code">COMP3851A</span>
            <span className="course-name">Computer Science and Information Technology Work Integrated Learning Part A</span>
          </li>
          <li className="course-item">
            <span className="course-code">INFT2060</span>
            <span className="course-name">Applied Artificial Intelligence</span>
          </li>
          <li className="course-item">
            <span className="course-code">INFT2052</span>
            <span className="course-name">Mobile Application Programming</span>
          </li>
          <li className="course-item">
            <span className="course-code">SENG2260</span>
            <span className="course-name">Human-Computer Interaction</span>
          </li>
        </ul>
      </div>
      </div>
      </div>
      
      </>
    );
  };
  
  export default HomePage;
  