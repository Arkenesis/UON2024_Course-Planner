import React, { useContext, useEffect } from 'react';
import NavigationBar from '../../components/NavigationBar';
import './TrackProgress.scss';
import { UserContext } from '../login/LoginContext';

const TrackProgress = () => {



    const { user } = useContext(UserContext);

    const getAbbrName = (name) => {
      const raw = name.split(' ');
      if(raw.length >= 2){
        const first_letter  = raw[0].charAt(0).toUpperCase(); 
        const second_letter = raw[1].charAt(0).toUpperCase();
        return first_letter + second_letter;
      }
      else{
        return name.charAt(0).toUpperCase();
      }
    }

    return (
      <div className="main-content">
          <div>
            <h1 style={{opacity:"0.47"}}>Track Progress</h1>
            <div className="user-info">
              <div className="avatar">{user && getAbbrName(user?.firestore_data.username)}</div>
              <div className="details">
                <h2 style={{marginBottom:"5px"}}>{user?.firestore_data.gender === 'male' ? '(Mr.)' : '(Mrs.)'} {user?.firestore_data.username}</h2>
                <p>{user?.firestore_data.studentid} <a href="mailto:kennedy.tan@uon.edu.au">{user?.firestore_data.email}</a></p>
                <p>{user?.firestore_data.level ? `${user?.firestore_data.level} -` : ''} {user?.firestore_data.program}</p>
                <p><span role="img" aria-label="location">📍</span> Singapore PSB Start Year: Trimester 1 {user?.firestore_data.campus ? `(${user?.firestore_data.campus})` : ''} {user?.firestore_data.date}</p>
              </div>
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
  
