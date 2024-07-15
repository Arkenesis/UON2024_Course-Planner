// Firebase Firestore
import { db } from '../services/database.js';

export const getPolicy = async (req, res) => {
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('policy');
        const page_doc = await page_ref.get();
        const content = await page_doc.get('message');
        return res.json({ message: content });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to retrieve!" });
    }
  };

export const setPolicy = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('policy');
        await page_ref.set({ "message": content });
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};