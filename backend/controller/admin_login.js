// Firebase Firestore
import { db } from '../services/database.js';

export const getLogin = async (req, res) => {
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('login');
        const page_doc = await page_ref.get();
        const title = await page_doc.get('title');
        const logo = await page_doc.get('logo');
        return res.json({ message: { title, logo} });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to retrieve!" });
    }
  };

export const setLogin = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('login');
        await page_ref.set({title: content.title, logo: content.logo});
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};