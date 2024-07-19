
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
      const doc_ref = db.collection('CoursePlannerUsers').doc(user.uid);
      await doc_ref.set({ program, start_date, end_date, campus, level, gender: `${gender}` }, { merge: true });
      return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
      return res.status(403).json({ message: "The information was failed to update!" });
    }
  };
