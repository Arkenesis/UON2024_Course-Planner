// Firebase Firestore
import { db } from '../services/database.js';

export const initPrograms = async () => {
    try{
        const coll_ref = db.collection('CoursePlannerPrograms');
        const coll_doc = await coll_ref.get();
        if(coll_doc.size === 0){
            const items = [ { id: 'ECON1001', year: '2024', trimester: '1' }, { id: 'SENG1110', year: '2024', trimester: '1' }, { id: 'SENG1120', year: '2024', trimester: '2' }, { id: 'COMP3350', year: '2024', trimester: '2' }, { id: 'EBUS3050', year: '2024', trimester: '2' }, { id: 'SENG1050', year: '2024', trimester: '3' }, { id: 'SENG2130', year: '2024', trimester: '3' }, { id: 'INFT3100', year: '2024', trimester: '3' }, { id: 'COMP3851A', year: '2025', trimester: '1' }, { id: 'INFT2060', year: '2025', trimester: '1' }, { id: 'INFT2051', year: '2025', trimester: '1' }, { id: 'SENG2260', year: '2025', trimester: '1' }, { id: 'COMP3851B', year: '2025', trimester: '2' }, { id: 'INFT3800', year: '2025', trimester: '2' }, { id: 'INFT3950', year: '2025', trimester: '2' }, { id: 'INFT3050', year: '2025', trimester: '2' }, { id: 'COMP1140', year: '2026', trimester: '1' }, { id: 'COMP1010', year: '2026', trimester: '1' }, { id: 'COMP1140', year: '2026', trimester: '2' }, { id: 'EBUS3030', year: '2026', trimester: '2' }, { id: 'INFT2150', year: '2026', trimester: '3' }, { id: 'MATH1510', year: '2026', trimester: '3' }, ];
            await coll_ref.add({ "message": items, name: "Bachelor of Information Technology"});
            await coll_ref.add({ "message": items, name: "Bachelor of Busienss"});
            console.log("Seeding programs success.");
        }
        else{
            console.log("There are programs in the database.");
        }
    }
    catch(error){
        console.log("Seeding programs failed.");
        console.log(error);
    }
  };

export const getPrograms = async (req, res) => {
    try {
        const coll_ref = db.collection('CoursePlannerPrograms');
        const coll_doc = await coll_ref.get();
        let content = []
        for (let i = 0; i < coll_doc.size; i++) {
            let doc = coll_doc.docs[i];
            let data = doc.data();
            data = {...data, uuid: doc.id}
            content.push(data);
        }
        return res.json({ message: content });
    }
    catch (ex) {
        return res.status(403).json({ error: ex });
    }
};

export const getProgram = async (req, res) => {
    try{
        const page_ref = db.collection('CoursePlannerPrograms').doc('bachelor-of-it');
        const page_doc = await page_ref.get();
        const name = await page_doc.get('name');
        const content = await page_doc.get('message');
        return res.json({ message: content, name: name });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to retrieve!" });
    }
  };

export const setProgram = async (req, res) => {
    const { name, content, uuid } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerPrograms').doc(uuid);
        await page_ref.set({ "message": content, name }, {merge: true});
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};