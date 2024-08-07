// Firebase Auth
import { getAuth} from "firebase/auth";
import { app } from "../services/authentication.js";
import admin from "firebase-admin";
// Firebase Firestore
import { db } from '../services/database.js';


// Initialize firebase config
const auth = getAuth(app);

export const getUsers = async (req, res) => {
    try{
        const coll_ref = db.collection('CoursePlannerUsers');
        const coll_doc = await coll_ref.get();
        const content = []
        for(let i = 0; i < coll_doc.size; i++){
            let doc = coll_doc.docs[i];
            content.push(doc.data());
        }
        return res.json({ message: content });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to retrieve the information!" });
    }
  };

export const setUser = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerUsers').doc(content.uid);
        if(content.newPassword !== '' && content.newPassword !== undefined){
            await admin.auth().updateUser(content.uid, { password: content.newPassword});
        }
        if(content.newEmail !== '' && content.newEmail !== undefined){
            await admin.auth().updateUser(content.uid, { email: content.newEmail });
        }
        const { username, date, phone, roles} = content;
        let result = {};
        if(username !== undefined){
            result = {...result, username};
        }
        if(date !== undefined){
            result = {...result, date};
        }
        if(phone !== undefined){
            result = {...result, phone};
        }
        if(roles !== undefined){
            result = {...result, roles};
        }
        await page_ref.set(result, { merge: true});
        return res.json({ message: "Successfully updated!" });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to update content!" });
    }
};

export const removeUser = async (req, res) => {
    const { content } = req.body;
    try{
        await admin.auth().deleteUser(content);
        const page_ref = db.collection('CoursePlannerUsers').doc(content);
        await page_ref.delete();
        return res.json({ message: "User information  deleted successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to update content!" });
    }
};