import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editStudentModal.scss';
import { instance } from '../../App';

function EditStudentModal({ student, onSave, onClose, onDelete }) {
    const [editedStudent, setEditedStudent] = useState(student);

    const handleSave = async () => {
        try{
            const { data } = await instance.post("/pages/users", {content: editedStudent});
            // setEditedStudent(prevState => {...prevState, newPassword: '', newEmail: '' });
            onSave(editedStudent);
            alert('Saving course data success!');
        }
        catch(error){
            console.log(error.response?.data);
        }
        onClose();
    };

    const handleDelete = () => {
        onDelete(student.uid);
        onClose();
    };

    const handleInputChange = (e) => {
        setEditedStudent({...editedStudent, [e.target.name]: e.target.value})
    };

    const handleSelectChange = (e) => {
        const temp = e.target.selectedOptions[0].value;
        setEditedStudent({...editedStudent, [e.target.name]: e.target.selectedOptions[0].value})
    };

    return (
        <>
    
        {student && (
            <div className="EditStudentModal">
                <div className="ModalContent">
                    <label>
                        Name
                        <input type="text" name="username" value={editedStudent.username} onChange={handleInputChange} />
                    </label>

                    <label>
                        Phone Number
                        <input type="text" name="phone" value={editedStudent.phone} onChange={handleInputChange} />
                    </label>

                    <label>
                        New Password
                        <input type="text" name="newPassword" value={editedStudent.newPassword} onChange={handleInputChange} />
                    </label>
                    <label>
                        Current Email Address
                        <input type="text" name="email" value={editedStudent.email} onChange={handleInputChange} readOnly/>
                    </label>
                    <label>
                        New Email Address
                        <input type="text" name="newEmail" value={editedStudent.newEmail} onChange={handleInputChange} />
                    </label>

                    <label>
                        Commencement Date
                        <input type="date" name="date" value={editedStudent.date} onChange={handleInputChange} />
                    </label>

                    <label>
                        Roles
                        <br/>
                        <select name="roles" onChange={handleSelectChange} value={editedStudent.roles}>
                            <option value='Admin' selected={editedStudent.Roles}>Admin</option>
                            <option value='Student' selected={editedStudent.Roles}>Student</option>
                        </select>
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