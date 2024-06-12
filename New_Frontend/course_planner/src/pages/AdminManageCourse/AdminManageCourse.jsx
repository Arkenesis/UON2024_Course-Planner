import React from 'react';
import './AdminManageCourse.scss';

import edit from '../../assets/editIcon.png';
import remove from '../../assets/removeIcon.png';

const ManageCourse = () => {
    const handleDelete = (courseCode) => {
        console.log(`Deleting Course: ${courseCode}`);
    };

    const handleEdit = (courseCode) => {
        console.log(`Editing Course: ${courseCode}`);
    };

    const handleSave = () => {
        console.log("Saving data...");
        alert('Content saved successfully!');
    };

    const handleCancel = () => {
        console.log("Cancelling...");
    };

    const courses = [
        { courseCode: 'COMP1010', courseName: 'Computing Fundamental', credit: '10', prerequisite: 'None', requiredCredit: '0', availability: 'None' },
        { courseCode: 'COMP1140', courseName: 'Database and Information Management', credit: '10', prerequisite: 'None', requiredCredit: '0', availability: 'Trimester 1-2024' },
        { courseCode: 'COMP3350', courseName: 'Advanced Database', credit: '10', prerequisite: 'COMP1140, INFT1004, SENG1110', requiredCredit: '0', availability: 'Trimester 2-2024' },
        { courseCode: 'COMP3851A', courseName: 'Computer Science & Information Technology Work Integrated Learning Part A', credit: '10', prerequisite: 'COMP3007', requiredCredit: '140', availability: 'Trimester 1,2-2024' },
        { courseCode: 'COMP3851B', courseName: 'Computer Science & Information Technology Work Integrated Learning Part B', credit: '10', prerequisite: 'COMP3851A', requiredCredit: '140', availability: 'Trimester 1,2-2024' },
        { courseCode: 'EBUS3050', courseName: 'The Digital Economy', credit: '10', prerequisite: 'None', requiredCredit: '0', availability: 'Trimester 3-2024' },
        { courseCode: 'EBUS3050', courseName: 'Business Intelligence', credit: '10', prerequisite: 'COMP1140, SENG1110 or INFT100', requiredCredit: '0', availability: 'Trimester 3-2024' },
        { courseCode: 'ENGG1003', courseName: 'Introduction to Procedural Programming', credit: '10', prerequisite: 'None', requiredCredit: '0', availability: 'Trimester 3-2024' },
        { courseCode: 'INFT1004', courseName: 'Data Structure C++', credit: '10', prerequisite: 'None', requiredCredit: '0', availability: 'None' },
        { courseCode: 'INFT2012', courseName: 'Application Programming', credit: '10', prerequisite: 'INFT1004 or SENG1110', requiredCredit: '0', availability: 'Trimester 3-2024' },
    ];

    return (
        <div className="manage-course">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Course Code</th>
                            <th>Course Name</th>
                            <th>Credit</th>
                            <th>Prerequisite</th>
                            <th>Required Credit</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index}>
                                <td>{course.courseCode}</td>
                                <td>{course.courseName}</td>
                                <td>{course.credit}</td>
                                <td>{course.prerequisite}</td>
                                <td>{course.requiredCredit}</td>
                                <td>{course.availability}</td>
                                <td className="action-buttons">
                                    <button onClick={() => handleEdit(course.courseCode)}>
                                        <img src={edit} alt="Edit" />
                                    </button>
                                    <button onClick={() => handleDelete(course.courseCode)}>
                                        <img src={remove} alt="Remove" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="add-course-container">
                    <button className="add-course">Add Course</button>
                </div>
            </div>
            <div className="actions">
                <button className="cancel" onClick={handleCancel}>Cancel</button>
                <button className="save" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default ManageCourse;
