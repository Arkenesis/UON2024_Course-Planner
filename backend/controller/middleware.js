
import admin from "firebase-admin";
import { getAuth } from "firebase/auth";
import { app } from "../services/authentication.js";
import { db } from '../services/database.js';

const auth = getAuth(app);

export const hasToken = async (req, res, next) => {
    const idToken = req.cookies.access_token;
    if (!idToken) {
      return res.status(403).json({ error: "No token provided" });
    }
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(403).json({ error: "Unauthorized" });
    }
  };

export const hasAdmin = async (req, res, next) => {
    const { uid } = req.user;
    try {
        const user_ref = db.collection('CoursePlannerUsers').doc(`${uid}`);
        const user_doc = await user_ref.get();
        const isAdmin = await user_doc.get('roles');
        if(isAdmin !== 'admin'){
            return res.status(403).json({ message: "You are not allowed edit the page." });
        }
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(403).json({ error: "Unauthorized" });
    }
  };