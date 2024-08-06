// Firebase Firestore
import { db } from '../services/database.js';

export const getNavigation = async (req, res) => {
    try{

        const coll_ref = db.collection('CoursePlannerPages').doc('navigation');
        const doc = await coll_ref.get();
        //return a string
        const color = await doc.get('backgroundColor');
        const logo = await doc.get('logo');
        //return an array
        let items = await doc.get('items');
        if(!Array.isArray(items)){
            await coll_ref.set({items: []}, {merge: true});
            items = [];
        }
        let result = [];

        const page_ref = db.collection('CoursePlannerPages');
        const pages = await page_ref.get();
        for(let i = 0; i<pages.size; i++){
            const page = pages.docs[i];
            var temp = {id: page.id, title: page.id ,visibility: false};
            if(page.id === 'navigation'){
                continue;
            }

            if(!items.some((x) => x.id == temp.id)){
                result.push(temp);
            }
        }
        if(result){
            items = items.concat(result);
            await coll_ref.update({items: items});
        }
        
        return res.json( { message: { backgroundColor: color, items: items, logo: logo}});
    }
    catch(error){
        return res.status(403).json({ message: "Failed to retrieve the information!" });
    }
  };

export const setNavigation = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerPages').doc('navigation');
        await page_ref.set({ backgroundColor: content.backgroundColor, items: content.items, logo: content.logo }, {merge: true});
        return res.json({ message: "Successfully updated!" });
    }
    catch(error){
        return res.status(403).json({ message: "Failed to update content!" });
    }
};