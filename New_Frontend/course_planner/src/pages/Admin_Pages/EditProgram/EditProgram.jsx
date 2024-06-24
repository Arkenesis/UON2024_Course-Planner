import React, { useState, useEffect, useRef } from 'react';
import plusButton from '../../../assets/plusButton.png';
import trashBin from '../../../assets/trashBin.png';

import './EditProgram.css';

const EditProgram = () => {
    const [programName, setProgramName] = useState('Bachelor of Information Technology');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [newCourse, setNewCourse] = useState('');
    const [courses, setCourses] = useState(Array(12).fill('SENG1050'));
    const [hoveredCourse, setHoveredCourse] = useState(null); // State to track hovered course
    const [isCancelPopupVisible, setIsCancelPopupVisible] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleAddCourseClick = () => {
        setIsPopupVisible(true);
    };

    const handlePopupCancel = () => {
        setNewCourse('');
        setIsPopupVisible(false);
    };

    const handlePopupAdd = () => {
        if (newCourse.trim()) {
            setCourses([...courses, newCourse.trim()]);
            setNewCourse('');
            setIsPopupVisible(false);
        } else {
            alert('Please enter a valid course name.');
        }
    };

    const handleCancelClick = () => {
        setIsCancelPopupVisible(true);
    };

    const handleCancelConfirmNo = () => {
        setIsCancelPopupVisible(false);
    };

    const handleCancelConfirmYes = () => {
        setIsCancelPopupVisible(false);
        alert('Changes have been discarded.');
    };

    const handleSaveClick = () => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 3000);
    };

    const handleDeleteCourse = (index) => {
        const newCourses = courses.filter((_, courseIndex) => courseIndex !== index);
        setCourses(newCourses);
    };

    return (
        <div className="edit-program">
            <h1>Edit Program</h1>
            <div className="sections">
                <div className="program-name">
                    <strong><label htmlFor="program-name-input">Program Name</label></strong>
                    <input
                        type="text"
                        id="program-name-input"
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                    />
                    
                </div>
                <div className="compulsory-courses">
                    <strong><label>Compulsory Courses</label></strong>
                    <div className="courses-grid">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className={`course ${hoveredCourse === index ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredCourse(index)}
                                onMouseLeave={() => setHoveredCourse(null)}
                                onClick={() => hoveredCourse === index && handleDeleteCourse(index)}
                            >
                                {hoveredCourse === index ? (
                                    <img src={trashBin} alt="Delete" className="trash-bin" width="15px"/>
                                ) : (
                                    course
                                )}
                            </div>
                        ))}
                        <div className="add-course" onClick={handleAddCourseClick}>+</div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                <button className="save-button" onClick={handleSaveClick}>Save</button>
            </div>

            {showSuccessMessage && (
                <div className="success-message">
                    Changes saved successfully!
                </div>
            )}

            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <label htmlFor="new-course-input">New Course Name:</label>
                        <input
                            type="text"
                            id="new-course-input"
                            value={newCourse}
                            onChange={(e) => setNewCourse(e.target.value)}
                        />
                        <div className="popup-actions">
                            <button className="popup-cancel" onClick={handlePopupCancel}>Cancel</button>
                            <button className="popup-add" onClick={handlePopupAdd}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {isCancelPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Are you sure you want to cancel your changes?</p>
                        <div className="popup-actions">
                            <button className="popup-cancel" onClick={handleCancelConfirmNo}>No</button>
                            <button className="popup-add" onClick={handleCancelConfirmYes}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProgram;
