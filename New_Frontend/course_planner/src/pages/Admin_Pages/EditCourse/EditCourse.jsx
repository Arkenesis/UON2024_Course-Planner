import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState } from 'react';
import './editCourse.scss';
import EditModal from '../../../components/editcoursemodal/EditCourseModal.jsx';

import edit from '../../../assets/edit.png';
import dustbin from '../../../assets/dustbin.png';

const EditCourse = () => {
    const [course, setCourse] = useState([
        { 
            id: 1,
            courseCode: 'ACF1001',
            courseName: 'Accounting for Decision Makers',
            credits: '10',
            prerequisite: 'None',
            requiredCredit: '0', 
            availability: [{"year": "2024", "trimester": [1, 2, 3] },
                           {"year": "2025", "trimester": [1] }]
        },

        {
            id: 2,
            courseCode: 'COMP1010',
            courseName: 'Computing Fundamentals',
            credits: '10',
            prerequisite: 'None',
            requiredCredit: '0',
            availability: []
        },

        {
            id: 3,
            courseCode: 'COMP1140',
            courseName: 'Database and Information Management',
            credits: '10',
            prerequisite: 'None',
            requiredCredit: '0',
            availability: [{"year": "2024", "trimester": [1]}]
        },

        {
            id: 4,
            courseCode: 'COMP3350',
            courseName: 'Advanced Database',
            credits: '10',
            prerequisite: 'COMP1140, INFT1004, SENG1110',
            requiredCredit: '0',
            availability: [{"year": "2024", "trimester": [2]}]
        },

        {
            id: 5,
            courseCode: 'COMP3851A',
            courseName: 'Computer Science & Information Technology Work Integrated Learning Part A',
            credits: '10',
            prerequisite: 'COMP3007',
            requiredCredit: '140',
            availability: [{"year": "2024", "trimester": [1, 2]}]
        }
        ]);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (courseId) => {
        console.log(`Deleting course with id: ${courseId}`);
        const courseIndex = course.findIndex(course => course.id === courseId);

        if (courseIndex > -1) {
            const updatedCourse = [...course];
            updatedCourse.splice(courseIndex, 1);
            setCourse(updatedCourse);
        }

        setShowModal(false);
        setSelectedCourse(null);
    };

    const handleEdit = (courseId) => {
        console.log(`Editing course with id: ${courseId}`);
        const courseToEdit = course.find(course => course.id === courseId);
        setSelectedCourse(courseToEdit);
        setShowModal(true);
    };

    const handleSave = (updatedCourse) => {
        console.log("Saving data...");
        const courseIndex = course.findIndex(course => course.id === updatedCourse.id);

        if (courseIndex > -1) {
            const updatedCourse = [...course];
            updatedCourse.splice(courseIndex, 1, updatedCourse);
            setCourse(updatedCourse);
        }
        
        setShowModal(false);
        setSelectedCourse(null);
    };

    const handleCancel = () => {
        console.log("Cancelling...");
        setShowModal(false);
        setSelectedCourse(null);
    };

    return (
        <div>
            <div className="Window">
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
                        {course.map((course) => (
                        <tr key={course.id}>
                            <td>{course.courseCode}</td>
                            <td>{course.courseName}</td>
                            <td>{course.credits}</td>
                            <td>{course.prerequisite}</td>
                            <td>{course.requiredCredit}</td>
                            <td>{Array.isArray(course.availability)
                                ? 
                                    ( course.availability.map((x, index) => (
                                        <span key={x.year}>
                                            {x.year} {x.trimester.join(', ')}
                                            {index < course.availability.length - 1 && ' || '}
                                        </span>
                                    )))
                                : <p>'None'</p>}
                            </td>
                            <td>
                                <div className="editDelete">
                                    <button className="EditButton" onClick={() => handleEdit(course.id)}>
                                        <img src={edit} alt="Edit" className="editImage"/>
                                    </button>
                                
                                    <button className="DeleteButton" onClick={() => handleDelete(course.id)}>
                                        <img src={dustbin} alt="Delete" className="deleteImage"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="CancelAndSave">
                <button className="CancelButton" onClick={handleCancel}>Cancel</button>
                <button className="SaveButton" onClick={handleSave}>Save</button>
            </div>

            {showModal && selectedCourse && (
                <EditModal 
                    course={selectedCourse} 
                    onSave={handleSave} 
                    onClose={handleCancel}
                />
            )}
        </div>
    );
}

export default EditCourse;