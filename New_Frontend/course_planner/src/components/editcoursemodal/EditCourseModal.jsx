import React, { useState, useEffect } from 'react';
import './editCourseModal.scss';

function EditCourseModal({ course, onSave, onClose, onDelete }) {
    const [editedCourse, setEditedCourse] = useState(course);
    const [availability, setAvailability] = useState(course.availability);


    useEffect(() => {
        setEditedCourse(course);
        const initialAvailability = course.availability || [];
        if (initialAvailability.length > 0) {
            initialAvailability[0].enable = true; // Ensure the first row is checked
        }
        setAvailability(initialAvailability);
    }, [course]);

    const handleSave = () => {
        const updatedCourse = { ...editedCourse, availability };
        onSave(updatedCourse);
        onClose();
    };

    const handleDelete = () => {
        onDelete(course.id);
        onClose();
    };

    const handleAvailabilityChange = (index, field, value) => {
        const updatedAvailability = availability.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setAvailability(updatedAvailability);
    };

    const handleTrimesterChange = (index, trimester) => {
        const updatedAvailability = availability.map((item, i) => {
            const currentTrimester = item.trimester || [];
            return i === index
                ? {
                    ...item,
                    trimester: currentTrimester.includes(trimester)
                        ? currentTrimester.filter(t => t !== trimester)
                        : [...currentTrimester, trimester],
                }
                : item;
        });
        setAvailability(updatedAvailability);
    };

    const addRow = () => {
        setAvailability([...availability, { year: '', trimester: [], enable: false }]);
    };

    const handleEnableChange = (index) => {
        const updatedAvailability = availability.map((item, i) =>
            i === index ? { ...item, enable: !item.enable } : item
        );
        setAvailability(updatedAvailability);
    };

    return (
        <>
            {course && (
                <div className="Modal">
                    <div className="ModalContent">
                        <label>
                            Course Code
                            <input
                                type="text"
                                value={editedCourse.courseCode}
                                onChange={(e) => setEditedCourse({ ...editedCourse, courseCode: e.target.value })}
                            />
                        </label>

                        <label>
                            Course Name
                            <input
                                type="text"
                                value={editedCourse.courseName}
                                onChange={(e) => setEditedCourse({ ...editedCourse, courseName: e.target.value })}
                            />
                        </label>

                        <label>
                            Credits
                            <input
                                type="text"
                                value={editedCourse.credits}
                                onChange={(e) => setEditedCourse({ ...editedCourse, credits: e.target.value })}
                            />
                        </label>

                        <label>
                            Prerequisite
                            <input
                                type="text"
                                value={editedCourse.prerequisite}
                                onChange={(e) => setEditedCourse({ ...editedCourse, prerequisite: e.target.value })}
                            />
                        </label>

                        <label>
                            Required Credits
                            <input
                                type="text"
                                value={editedCourse.requiredCredit}
                                onChange={(e) => setEditedCourse({ ...editedCourse, requiredCredit: e.target.value })}
                            />
                        </label>

                        <label>Availability</label>
                        <div className="availabilityContainer">
                            {availability.map((item, index) => (
                                <div key={index} className="availabilityRow">
                                    <label className="availabilityLabel">Year
                                        <input
                                            type="text"
                                            placeholder="Year"
                                            value={item.year}
                                            onChange={(e) => handleAvailabilityChange(index, 'year', e.target.value)}
                                            className="yearInput"
                                        />
                                    </label>
                                    
                                    {['Trimester 1', 'Trimester 2', 'Trimester 3'].map((trimester, i) => (
                                        <label key={i} className="availabilityLabel">{trimester}
                                            <input
                                                type="checkbox"
                                                checked={(item.trimester || []).includes(i + 1)}
                                                onChange={() => handleTrimesterChange(index, i + 1)}
                                                className="trimesterCheckbox"
                                            />
                                        </label>
                                    ))}

                                    <label className="availabilityLabel">Enable
                                        <input
                                            type="checkbox"
                                            checked={item.enable || false}
                                            onChange={() => handleEnableChange(index)}
                                            className="enableCheckbox"
                                        />
                                    </label>
                                </div>
                            ))}

                            {availability.length === 0 || availability[availability.length - 1].year ? (
                                <button onClick={addRow} className="addRowButton">Add Row</button>
                            ) : null}
                        </div>

                        <div className="ModalButtons">
                            <button className='DeleteDetails' onClick={handleDelete}>Delete</button>
                            <button className='CancelChanges' onClick={onClose}>Cancel</button>
                            <button className='SaveDetails' onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditCourseModal;
