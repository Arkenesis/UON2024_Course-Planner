// Firebase Firestore
import { db } from '../services/database.js';

export const getAboutUs = async (req, res) => {
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('about-us');
        const page_doc = await page_ref.get();
        const content = await page_doc.get('message');
        return res.json({ message: content });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to retrieve the information!" });
    }
  };

export const setAboutUs = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('about-us');
        await page_ref.set({ "message": content });
        return res.json({ message: "Successfully updated!" });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to update content!" });
    }
};