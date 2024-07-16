// Firebase Firestore
import { db } from '../services/database.js';

export const getCourses = async (req, res) => {
    try{
        const coll_ref = db.collection('CoursePlannerCourses');
        const coll_doc = await coll_ref.get();
        let content = [];
        if(coll_doc.size === 0){
            const Courses = [
                {ID:'ECON1001', Level: 1, Units: 10, Name: "Microeconomics for business decision", TYPE: "ECON"}, 
                {ID:'SENG1110', Level: 1, Units: 10, Name: "Object Oriented Programming", TYPE: "SENG"}, 
                {ID:'COMP3350', Level: 3, Units: 10, Name: "Advanced Database", TYPE: "COMP"}, 
                {ID:'EBUS3050', Level: 3, Units: 10, Name: "The Digital Economy", TYPE: "EBUS"}, 
                {ID:'SENG1120', Level: 1, Units: 10, Name: "Data Structure", TYPE: "SENG"}, 
                {ID:'INFT3100', Level: 3, Units: 10, Name: "Project Management", TYPE: "INFT"}, 
                {ID:'SENG1050', Level: 1, Units: 10, Name: "Web Technologies", TYPE: "SENG"}, 
                {ID:'SENG2130', Level: 2, Units: 10, Name: "System Analysis and Design", TYPE: "SENG"}, 
                {ID:'COMP3851A', Level: 3, Units: 10, Name: "Computing and Information Sciences Work Integrated Learning Part A", TYPE: "COMP"}, 
                {ID:'INFT2051', Level: 2, Units: 10, Name: "Mobile Application Programming", TYPE: "INFT"}, 
                {ID:'SENG2260', Level: 2, Units: 10, Name: "Human-Computer Interaction", TYPE: "SENG"}, 
                {ID:'INFT2060', Level: 2, Units: 10, Name: "Applied Artificial Intelligence", TYPE: "INFT"},
              ];
            for(let i = 0; i<Courses.length; i++){
                let temp = Courses[i];
                content.push(temp);
                const page_ref = db.collection('CoursePlannerCourses').doc(temp.ID);
                await page_ref.set(temp, {merge: true});
            }
        }
        for(let i = 0; i < coll_doc.size; i++){
            let doc = coll_doc.docs[i];
            let {ID, Level, Units, Name, TYPE } = doc.data();
            content.push({ID, Level, Units, Name, TYPE })
        }
        return res.json({ message: content });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to retrieve!" });
    }
  };

export const setCourses = async (req, res) => {
    const { content } = req.body;
    try{
        for(let i = 0; i<content.length; i++){
            let temp = content[i];
            const page_ref = db.collection('CoursePlannerCourses').doc(temp.ID);
            await page_ref.set(temp, { merge: true});
        }
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};