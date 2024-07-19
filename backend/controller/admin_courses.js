// Firebase Firestore
import { deleteUser } from 'firebase/auth';
import { db } from '../services/database.js';

export const getCourses = async (req, res) => {
    try{
        const coll_ref = db.collection('CoursePlannerCourses');
        const coll_doc = await coll_ref.get();
        let content = [];
        if(coll_doc.size === 0){
            const Courses = [
                {ID:'ECON1001', Prerequisite: [],Availability: [], Level: 1, Units: 10, RequiredCredit: 0, Name: "Microeconomics for business decision", TYPE: "ECON"}, 
                {ID:'SENG1110', Prerequisite: [],Availability: [], Level: 1, Units: 10, RequiredCredit: 0, Name: "Object Oriented Programming", TYPE: "SENG"}, 
                {ID:'COMP3350', Prerequisite: [],Availability: [], Level: 3, Units: 10, RequiredCredit: 0, Name: "Advanced Database", TYPE: "COMP"}, 
                {ID:'EBUS3050', Prerequisite: [],Availability: [], Level: 3, Units: 10, RequiredCredit: 0, Name: "The Digital Economy", TYPE: "EBUS"}, 
                {ID:'SENG1120', Prerequisite: [],Availability: [], Level: 1, Units: 10, RequiredCredit: 0, Name: "Data Structure", TYPE: "SENG"}, 
                {ID:'INFT3100', Prerequisite: [],Availability: [], Level: 3, Units: 10, RequiredCredit: 0, Name: "Project Management", TYPE: "INFT"}, 
                {ID:'SENG1050', Prerequisite: [],Availability: [], Level: 1, Units: 10, RequiredCredit: 0, Name: "Web Technologies", TYPE: "SENG"}, 
                {ID:'SENG2130', Prerequisite: [],Availability: [], Level: 2, Units: 10, RequiredCredit: 0, Name: "System Analysis and Design", TYPE: "SENG"}, 
                {ID:'COMP3851A', Prerequisite: [],Availability: [], Level: 3, Units: 10, RequiredCredit: 140, Name: "Computing and Information Sciences Work Integrated Learning Part A", TYPE: "COMP"}, 
                {ID:'INFT2051', Prerequisite: [],Availability: [], Level: 2, Units: 10, RequiredCredit: 0, Name: "Mobile Application Programming", TYPE: "INFT"}, 
                {ID:'SENG2260', Prerequisite: [],Availability: [], Level: 2, Units: 10 , RequiredCredit: 0, Name: "Human-Computer Interaction", TYPE: "SENG"}, 
                {ID:'INFT2060', Prerequisite: [],Availability: [], Level: 2, Units: 10, RequiredCredit: 0, Name: "Applied Artificial Intelligence", TYPE: "INFT"},
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
            let data = doc.data();
            content.push(data);
        }
        return res.json({ message: content });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to retrieve!" });
    }
  };

export const setCourse = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerCourses').doc(content.ID);
        await page_ref.set(content, { merge: true});
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};

export const deleteCourse = async (req, res) => {
    const { content } = req.body;
    try{
        const page_ref = db.collection('CoursePlannerCourses').doc(content);
        await page_ref.delete();
        return res.json({ message: "The information was updated successfully!" });
    }
    catch(error){
        return res.status(403).json({ message: "The information was failed to update!" });
    }
};