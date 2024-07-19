
import admin from "firebase-admin";
import multer from "multer";
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
      return res.status(403).json({ error: "Failed to verify token." });
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
        return res.status(403).json({ error: "User having issues with permission." });
    }
  };

export const upload = multer(
  {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      // Allowed file types
      const allowedTypes = /jpeg|jpg|png|gif|svg/;
      const mimeType = allowedTypes.test(file.mimetype);
      const extName = allowedTypes.test(file.originalname.split('.').pop().toLowerCase());
  
      if (mimeType && extName) {
        return cb(null, true);
      }
      cb(new Error('Only jpeg|jpg|png|gif|svg can be accepted.'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }
  });