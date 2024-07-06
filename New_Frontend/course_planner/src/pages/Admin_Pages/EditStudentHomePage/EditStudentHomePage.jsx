import React, { useState } from 'react';
import './EditStudentHomePage.css';
import eyeIcon from '../../../assets/eyeIcon.png'; // Visible eye icon
import eyeIconCrossed from '../../../assets/eyeIconCrossed.png'; // Crossed-out eye icon

const EditStudentHomepage = () => {
    // State to manage visibility for each section
    const [isTrackProgressVisible, setIsTrackProgressVisible] = useState(true);
    const [isPlanYourPathVisible, setIsPlanYourPathVisible] = useState(true);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Toggle handlers
    const toggleTrackProgressVisibility = () => {
        setIsTrackProgressVisible(!isTrackProgressVisible);
    };

    const togglePlanYourPathVisibility = () => {
        setIsPlanYourPathVisible(!isPlanYourPathVisible);
    };

    // Button handlers
    const handleCancelClick = () => {
        alert('Changes canceled.');
    };

    const handlePreviewClick = () => {
        alert('Previewing changes.');
    };

    const handleSaveClick = () => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
    };

    return (
        <div className="edit-student-homepage">
            <h1>Edit Student Homepage</h1>

            <div className="sidebar-section">
                <strong><label className="sidebar-label">Side Bar</label></strong>
                
                <div className="boxes">
                    <div className="box">
                        <span className="box-title">Track Progress</span>
                        <img
                            src={isTrackProgressVisible ? eyeIcon : eyeIconCrossed}
                            alt="Toggle visibility"
                            className="eye-icon"
                            onClick={toggleTrackProgressVisibility}
                        />
                    </div>

                    <div className="box">
                        <span className="box-title">Plan Your Path</span>
                        <img
                            src={isPlanYourPathVisible ? eyeIcon : eyeIconCrossed}
                            alt="Toggle visibility"
                            className="eye-icon"
                            onClick={togglePlanYourPathVisibility}
                        />
                    </div>
                </div>
            </div>

            <div className="bottom-buttons">
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
                <div className="right-buttons">
                    <button className="preview-button" onClick={handlePreviewClick}>Preview</button>
                    <button className="save-button" onClick={handleSaveClick}>Save</button>
                </div>
            </div>
            {showSuccessMessage && (
                <div className="success-message">
                Changes saved successfully!
                </div>
            )}
        </div>
    );
};

export default EditStudentHomepage;