// Firebase Firestore
import { db } from '../services/database.js';

export const getFooter = async (req, res) => {
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('footer');
        const page_doc = await page_ref.get();
        const content = await page_doc.get('message');
        return res.json({ message: content });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to retrieve!" });
    }
  };

export const setFooter = async (req, res) => {
    const { content } = req.body;
    let { email, phone, organization, year, address } = content;
    try{
        if(!email){
            email = "";
        }
        if(!phone){
            phone = "";
        }
        if(!organization){
            organization = "";
        }
        if(!year){
            year = "";
        }
        if(!address){
            address = "";
        }
        const page_ref = db.collection('CoursePlannerPages').doc('footer');
        await page_ref.set({ "message": { email, phone, organization, year, address } }, {merge: true});
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};