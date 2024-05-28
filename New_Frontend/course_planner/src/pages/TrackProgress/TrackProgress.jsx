import React from 'react';
import './TrackProgress.css';

const TrackProgress = () => {
    return (
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
      
    );
  };
  
  export default TrackProgress;
  
