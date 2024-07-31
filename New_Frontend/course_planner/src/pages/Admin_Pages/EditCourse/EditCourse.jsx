import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState, useEffect } from 'react';
import './editCourse.scss';
import axios from 'axios';
import EditModal from '../../../components/editcoursemodal/EditCourseModal.jsx';

import edit from '../../../assets/edit.png';
import dustbin from '../../../assets/dustbin.png';

const EditCourse = () => {
    const [course, setCourse] = useState([]);
    const [deletedCourse, SetDeletedCourse] = useState([]);
    const [ids, SetIds] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(false);

    const handleDelete = async (courseId) => {
        console.log(`Deleting course with id: ${courseId}`);
        const courseIndex = course.findIndex(course => course.ID === courseId);

        if (courseIndex > -1) {
            try{
                const { data } = await axios.post("http://localhost:8080/pages/delete-courses", {content: courseId});
                alert('Delete course data success!');
            }
            catch(error){
                console.log(error.response?.data);
            }
            const updatedCourse = [...course];
            updatedCourse.splice(courseIndex, 1);
            setCourse(updatedCourse);
            SetDeletedCourse(prevState => [...prevState, courseId]);
        }

        setShowModal(false);
        setSelectedCourse(null);
    };

    const handleEdit = (courseId) => {
        console.log(`Editing course with id: ${courseId}`);
        const courseToEdit = course.find(course => course.ID === courseId);
        setSelectedCourse(courseToEdit);
        const temp = course.map(course => course.ID);
        SetIds(temp);
        setShowModal(true);
    };

    const handleCancel = () => {
        console.log("Cancelling...");
        setShowModal(false);
        setSelectedCourse(null);
    };

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        try{
            const { data } = await axios.get("http://localhost:8080/pages/courses");
            setCourse(data.message);
        }
        catch(error){
            console.log(error);
        }
    }

    const handleSave = (inputCourse) => {
        console.log("Saving data...");
        const idx = course.findIndex(course => course.ID === inputCourse.ID);
        if (idx > -1) {
            let list = [...course];
            list.splice(idx, 1, inputCourse);
            setCourse(list);
        }
        setShowModal(false);
        setSelectedCourse(null);
    };

    return (
        <div>
            <div className="Window">
                <h1>Edit Courses</h1>
                <table className="CourseList">
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Credits</th>
                            <th>Prerequisite</th>
                            <th>Required Credit</th>
                            <th>Availability</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {course.map((x) => (
                        <tr key={x.ID}>
                            <td>{x.ID}</td>
                            <td>{x.Name}</td>
                            <td>{x.Units}</td>

                            <td>{Array.isArray(x.Prerequisite) && x.Prerequisite.length > 0 
                                ? (x.Prerequisite.map((i, index) => (
                                    <div key={index}>
                                        {i}
                                        <br/>
                                    </div>
                                )))
                                : 'None'}
                            </td>
                            
                            <td>{x.RequiredCredit}</td>
                            <td>{Array.isArray(x.Availability) && x.Availability.length > 0
                                ?   (x.Availability.map((i, index) => (
                                        <div key={index}>
                                            {i.year}  
                                            [{i.trimester.map((_, idx) => (
                                                <div key={idx} className="availability">
                                                    {idx === 0 && _ && <span>1</span>}
                                                    {idx === 1 && _ && <span>2</span>}
                                                    {idx === 2 && _ && <span>3</span>}
                                                </div> ))}]
                                            <br/>
                                        </div>
                                    )))
                                : <p>None</p> }
                            </td>
                            <td>
                                <div className="editDelete">
                                    <button className="EditButton" onClick={() => handleEdit(x.ID)}>
                                        <img src={edit} alt="Edit" className="editImage"/>
                                    </button>
                                
                                    <button className="DeleteButton" onClick={() => handleDelete(x.ID)}>
                                        <img src={dustbin} alt="Delete" className="deleteImage"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* <div className="CancelAndSave">
                <button className="CancelButton" onClick={handleCancel}>Cancel</button>
                <button className="SaveButton" onClick={handleSaveToCloud}>Save</button>
            </div> */}

            {showModal && selectedCourse && (
                <EditModal 
                    course={selectedCourse} 
                    ids={ids}
                    onDelete={handleDelete}
                    onSave={handleSave} 
                    onClose={handleCancel}
                />
            )}
        </div>
    );
}

export default EditCourse;


// const [course, setCourse] = useState([
    //     { 
    //         id: 1,
    //         courseCode: 'ACF1001',
    //         courseName: 'Accounting for Decision Makers',
    //         credits: '10',
    //         prerequisite: 'None',
    //         requiredCredit: '0', 
    //         availability: [{"year": "2024", "trimester": [1, 2, 3] },
    //                        {"year": "2025", "trimester": [1] }]
    //     },

    //     {
    //         id: 2,
    //         courseCode: 'COMP1010',
    //         courseName: 'Computing Fundamentals',
    //         credits: '10',
    //         prerequisite: 'None',
    //         requiredCredit: '0',
    //         availability: []
    //     },

    //     {
    //         id: 3,
    //         courseCode: 'COMP1140',
    //         courseName: 'Database and Information Management',
    //         credits: '10',
    //         prerequisite: 'None',
    //         requiredCredit: '0',
    //         availability: [{"year": "2024", "trimester": [1]}]
    //     },

    //     {
    //         id: 4,
    //         courseCode: 'COMP3350',
    //         courseName: 'Advanced Database',
    //         credits: '10',
    //         prerequisite: 'COMP1140, INFT1004, SENG1110',
    //         requiredCredit: '0',
    //         availability: [{"year": "2024", "trimester": [2]}]
    //     },

    //     {
    //         id: 5,
    //         courseCode: 'COMP3851A',
    //         courseName: 'Computer Science & Information Technology Work Integrated Learning Part A',
    //         credits: '10',
    //         prerequisite: 'COMP3007',
    //         requiredCredit: '140',
    //         availability: [{"year": "2024", "trimester": [1, 2]}]
    //     }
    //     ]);