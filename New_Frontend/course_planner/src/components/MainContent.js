// src/components/CourseActivity.js
import React from 'react';
import './MainContent.css';
import { faBorderTopLeft } from '@fortawesome/free-solid-svg-icons';

const CourseActivity = () => {
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
              <img src="courseCompleted.png" alt="course completed icon" width="80" style={{float:"left"}}/>
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
            <img src="myInfo.png" alt="course completed icon" width="80" style={{float:"left"}}/>
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
    </div>
        

    {/*2nd page: Track Progress */}
    <div className="main-content">
      <h1 style={{opacity:"0.47"}}>Track Progress</h1>
      <div className="user-info">
        <div className="avatar">KT</div>
        <div className="details">
          <h2 style={{marginBottom:"5px"}}>Kennedy Tan</h2>
          <p>c3426446 <a href="mailto:kennedy.tan@uon.edu.au">kennedy.tan@uon.edu.au</a> (Mr.) 3426446</p>
          <p>Undergraduate - School of Engineering Science and Environment</p>
          <p><span role="img" aria-label="location">📍</span> Singapore PSB Start Year: Trimester 1 (Singapore) 2023</p>
        </div>
      </div>

      <h3>Courses</h3>
      <div className="courseStatus">
        <div className="smallBar" style={{borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px"}}></div>
        <div className="smallBar"></div>
        <div className="smallBar"></div>
        <div className="smallBar"  style={{backgroundColor:"#FED766"}}></div>
        <div className="smallBar" style={{backgroundColor:"#E9E9E9", borderTopRightRadius: "5px", borderBottomRightRadius: "5px"}}></div>
      </div>
      <div className="courseStatus">
        <div className="statusItem">15 Finished</div>
        <div className="statusItem" style={{backgroundColor:"rgba(254,215,102,0.3)", color:"#FFBE00"}}>4 Registered</div>
        <div className="statusItem" style={{backgroundColor:"rgba(233,233,233,0.3)", color:"#9A9A9A"}}>4 Left</div>
        <div className="statusItem" style={{backgroundColor:"white"}}></div>
      </div>

      <div className="courses">
        <h3 className="currentTrimester">Bachelor of Information Technology [BIT]</h3>
        <p className="trimesterInfo">(Current) Trimester 1 Singapore 2024</p>
        
        <div className="courseStatus">
          <p style={{color:"#888080"}}>30 Units</p>
          <div className="courseItem">COMP3851A</div>
          <div className="courseItem">SENG2260</div>
          <div className="courseItem">INFT2060</div>
          <div className="courseItem">INFT2051</div>
      </div>
      </div>





    </div>
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

    
    </>
  );
};

export default CourseActivity;
