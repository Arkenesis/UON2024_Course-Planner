import React, { useState, useEffect } from 'react';
import './editCourseModal.scss';

function EditCourseModal({ course, ids, onSave, onClose, onDelete }) {
    const [editedCourse, setEditedCourse] = useState(course);

    const handleSave = () => {
        onSave(editedCourse);
        onClose();
    };

    const handleDelete = () => {
        onDelete(course.ID);
        onClose();
    };

    const handleChange = (e) => {
        setEditedCourse({ ...editedCourse, [e.target.name]: e.target.value })
    }

    const handleTrimesterChange = (e, idx, trimesterIndex) => {
        const checked = e.target.checked;
        setEditedCourse(prevState => {
            const newAvailability = [...prevState.Availability];
            const newTrimester = [...newAvailability[idx].trimester];
            newTrimester[trimesterIndex] = checked;
            newAvailability[idx] = { ...newAvailability[idx], trimester: newTrimester };
            return { ...prevState, Availability: newAvailability };
        });
    };

    const handleEnableChange = (e, idx) => {
        const checked = e.target.checked;
        setEditedCourse(prevState => {
            const newAvailability = [...prevState.Availability];
            newAvailability[idx] = { ...newAvailability[idx], enable: checked };
            return { ...prevState, Availability: newAvailability };
        });
    };

    const handleYearChange = (e, idx) => {
        const value = e.target.value;
        setEditedCourse(prevState => {
            const newAvailability = [...prevState.Availability];
            newAvailability[idx] = { ...newAvailability[idx], year: value };
            return { ...prevState, Availability: newAvailability };
        });
    };

    const handlePrerequisiteChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        
        setEditedCourse(prevState => {
            return { ...prevState, Prerequisite: selectedOptions }; 
        });
    };

    const addRow = () => {
        setEditedCourse( prevState => {
            const newAvailability = [...prevState.Availability, {year: '', trimester: [false,false,false]}];
            return { ...prevState, Availability: newAvailability };        
        });
    };
    const removeRow = (idx) => {
        setEditedCourse( prevState => {
            const newAvailability = prevState.Availability.filter((_, index) => index !== idx);
            return { ...prevState, Availability: newAvailability };      
        });
    };
    return (
        <>
            {editedCourse && (
                <div className="Modal">
                    <div className="ModalContent">
                        <label>
                            Course Code
                            <input type="text" onChange={handleChange} name="ID" value={editedCourse.ID} readOnly/>
                        </label>

                        <label>
                            Course Name
                            <input type="text" onChange={handleChange} name="Name" value={editedCourse.Name}  />
                        </label>

                        <label>
                            Credits
                            <input type="text" onChange={handleChange} name="Units" value={editedCourse.Units}  />
                        </label>

                        <label>
                            Prerequisite
                            <br/>
                            {/* <input type="text" onChange={handleChange} name="Prerequisite" value={editedCourse.Prerequisite} /> */}
                            <select name="Prerequisite" multiple onChange={handlePrerequisiteChange}>
                                {ids.map((i) => (
                                    <option key={i} value={i}>{i}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Required Credits
                            <input type="text" onChange={handleChange} name="RequiredCredit" value={editedCourse.RequiredCredit} />
                        </label>

                        <label>Availability</label>
                        <div className="availabilityContainer">
                            {editedCourse.Availability?.length > 0 && (
                                <div className="availabilityRow">
                                    <p className="availabilityLabel">Year</p>
                                    <p className="availabilityLabel">Trimester 1</p>
                                    <p className="availabilityLabel">Trimester 2</p>
                                    <p className="availabilityLabel">Trimester 3</p>
                                    <p className="availabilityLabel">Enable</p>
                                    <p className="availabilityLabel"></p>
                                </div>
                            )}
                            {editedCourse.Availability?.map((i, index) => (
                                <div key={index} className="availabilityRow">
                                    <input type="text" placeholder="Year" value={i.year} onChange={(e) => handleYearChange(e, index)} className="availabilityLabel" />
                                    <input type="checkbox" checked={i.trimester[0] === true} onChange={(e) => handleTrimesterChange(e, index, 0)} className="availabilityLabel" />
                                    <input type="checkbox" checked={i.trimester[1] === true} onChange={(e) => handleTrimesterChange(e, index, 1)} className="availabilityLabel" />
                                    <input type="checkbox" checked={i.trimester[2] === true} onChange={(e) => handleTrimesterChange(e, index, 2)} className="availabilityLabel" />
                                    <input type="checkbox" checked={i.enable || false} onChange={(e) => handleEnableChange(e, index)} className="availabilityLabel" />
                                    <button onClick={() => removeRow(index)} className="availabilityLabel">Remove Row</button>
                                </div>
                            ))}
                            <button onClick={addRow} className="addRowButton">Add Row</button>
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
