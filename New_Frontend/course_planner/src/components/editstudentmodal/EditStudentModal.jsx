import React, { useState, useEffect } from 'react';
import './editStudentModal.scss';

function EditStudentModal({ student, onSave, onClose, onDelete }) {
    const [editedStudent, setEditedStudent] = useState(student);

    useEffect(() => {
        setEditedStudent(student);
    }, [student]);

    const handleSave = () => {
        onSave(editedStudent);
        onClose();
    };

    const handleDelete = () => {
        onDelete(student.id);
        onClose();
    };

    return (
        <>
    
        {student && (
            <div className="Modal">
                <div className="ModalContent">
                    <label>
                        Name
                        <input
                            type="text"
                            value={editedStudent.name}
                            onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                        />
                    </label>

                    <label>
                        Phone Number
                        <input
                            type="text"
                            value={editedStudent.phone}
                            onChange={(e) => setEditedStudent({ ...editedStudent, phone: e.target.value })}
                        />
                    </label>

                    <label>
                        Email Address
                        <input
                            type="text"
                            value={editedStudent.email}
                            onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
                        />
                    </label>

                    <label>
                        Commencement Date
                        <input
                            type="text"
                            value={editedStudent.date}
                            onChange={(e) => setEditedStudent({ ...editedStudent, date: e.target.value })}
                        />
                    </label>

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

export default EditStudentModal;