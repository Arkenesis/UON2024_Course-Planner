// Firebase Firestore
import { db } from '../services/database.js';

export const getRegister = async (req, res) => {
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('register');
        const page_doc = await page_ref.get();
        const title = await page_doc.get('title');
        const logo = await page_doc.get('logo');
        return res.json({ message: { title, logo} });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to retrieve the information!" });
    }
  };

export const setRegister = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('register');
        await page_ref.set({title: content.title, logo: content.logo});
        return res.json({ message: "Successfully updated!" });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to update content!" });
    }
};