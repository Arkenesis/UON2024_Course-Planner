import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState } from 'react';
import './editStudent.scss';
import EditModal from '../../components/editstudentmodal/EditStudentModal.jsx';

import edit from '../../assets/edit.png';
import dustbin from '../../assets/dustbin.png';
import AdminPolicy from '../AdminPolicy/AdminPolicy.jsx';

const EditStudent = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Li Yang', phone: '91234567', email: 'liyang123@gmail.com', date: '10/06/2024' },
        { id: 2, name: 'Kennedy', phone: '91234567', email: 'ken123@gmail.com', date: '10/06/2024' },
        { id: 3, name: 'Diing Yang', phone: '91234567', email: 'DY123@gmail.com', date: '10/06/2024' },
        { id: 4, name: 'Marcus', phone: '91234567', email: 'M123@gmail.com', date: '10/06/2024'},
        { id: 5, name: 'An', phone: '91234567', email: 'An123@gmail.com', date: '10/06/2024'},
        { id: 6, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 7, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 8, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 9, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 10, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 11, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 12, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 13, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 14, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 15, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 16, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 17, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 18, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 19, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
        { id: 20, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    ]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = (studentId) => {
        console.log(`Deleting student with id: ${studentId}`);
        const studentIndex = students.findIndex(student => student.id === studentId);

        if (studentIndex > -1) {
            const updatedStudents = [...students];
            updatedStudents.splice(studentIndex, 1);
            setStudents(updatedStudents);
        }

        setShowModal(false);
        setSelectedStudent(null);
    };

    const handleEdit = (studentId) => {
        console.log(`Editing student with id: ${studentId}`);
        const studentToEdit = students.find(student => student.id === studentId);
        setSelectedStudent(studentToEdit);
        setShowModal(true);
    };

    const handleSave = (updatedStudent) => {
        console.log("Saving data...");
        const studentIndex = students.findIndex(student => student.id === updatedStudent.id);

        if (studentIndex > -1) {
            const updatedStudents = [...students];
            updatedStudents.splice(studentIndex, 1, updatedStudent);
            setStudents(updatedStudents);
        }
        
        setShowModal(false);
        setSelectedStudent(null);
    };

    const handleCancel = () => {
        console.log("Cancelling...");
        setShowModal(false);
        setSelectedStudent(null);
    };

    return (
        <div>
            <div className="Button">
                <button className="PurgeButton">Purge Data</button>
            </div>
            
            <div className="Window">
                <div className="Title">
                    <span>Student Name</span>
                    <span>Phone Number</span>
                    <span>Email Address</span>
                    <span>Commencement Date</span>
                    <span>Action</span>
                </div>

                <div className="StudentList">
                    {students.map(student => (
                        <div className="Student" key={student.id}>
                            <span className="CheckboxAndName">
                                <input type="checkbox" value=""/>
                                <span>{student.name}</span>
                            </span>
                            <span>{student.phone}</span>
                            <span>{student.email}</span>
                            <span>{student.date}</span>
                            <span className="EditAndDelete">
                                <button className="EditButton" onClick={() => handleEdit(student.id)}>
                                    <img src={edit} alt="Edit" className="editImage"/>
                                </button>
                                <button className="DeleteButton" onClick={() => handleDelete(student.id)}>
                                    <img src={dustbin} alt="Delete" className="deleteImage"/>
                                </button>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="CancelAndSave">
                <button className="CancelButton" onClick={handleCancel}>Cancel</button>
                <button className="SaveButton" onClick={handleSave}>Save</button>
            </div>

            {showModal && selectedStudent && (
                <EditModal 
                    student={selectedStudent} 
                    onSave={handleSave} 
                    onClose={handleCancel}
                />
            )}
        </div>
    );
}

export default EditStudent;