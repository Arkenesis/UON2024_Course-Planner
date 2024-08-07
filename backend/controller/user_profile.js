
import admin from "firebase-admin";
import multer from "multer";
import { getAuth } from "firebase/auth";
import { app } from "../services/authentication.js";
import { db } from '../services/database.js';

const auth = getAuth(app);

export const setProfile = async (req, res) => {
  const user = req.user;
  const { content } = req.body;
  const { program, start_date, end_date, campus, level, gender } = content;
  if(!program || !start_date || !end_date || !campus || !level){
    return res.status(403).json({ message: "You must fill in all the information." });
  }
  try{
    //Set user data
    const doc_ref = db.collection('CoursePlannerUsers').doc(user.uid);
    await doc_ref.set({ program, start_date, end_date, campus, level, gender: `${gender}` }, { merge: true });
    //Retrieve latest user data and return
    const user_info = await doc_ref.get();
    const firestore_data = user_info.data();
    const result = {...user, firestore_data};
    return res.json({ message: result });
  }
  catch(error){
    return res.status(403).json({ message: "Failed to update information!" });
  }
};

export const setProfileCourses = async (req, res) => {
  const user = req.user;
  const { content } = req.body;
  const { courses } = content;
  try{
    let result = [...courses ];
    // for(let i = 0; i<result.length; i++){
    //   for(let j = 0; j<result[i].course.length; j++){
    //     for(let k = 0; k<result[i].course[j].length; k++){
    //       if(!result[i].course[j][k]){
    //         result[i].course[j][k] = 'Unset';
    //       }
    //     }
    //   }
    // }
    const doc_ref = db.collection('CoursePlannerUsers').doc(user.uid);
    await doc_ref.set({ "courses": JSON.stringify(result) }, { merge: true });
    return res.json({ message: "Successfully updated!" });
  }
  catch(error){
    return res.status(403).json({ message: "Failed to update information!" });
  }
};