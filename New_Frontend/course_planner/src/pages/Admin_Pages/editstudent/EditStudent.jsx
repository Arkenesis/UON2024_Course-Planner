import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useState, useEffect } from 'react';
import './editStudent.scss';
import axios from 'axios';
import EditModal from '../../../components/editstudentmodal/EditStudentModal.jsx';

import edit from '../../../assets/edit.png';
import dustbin from '../../../assets/dustbin.png';

const EditStudent = () => {
    const [students, setStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async (studentId) => {
        console.log(`Deleting student with id: ${studentId}`);
        const studentIndex = students.findIndex(student => student.uid === studentId);

        if (studentIndex > -1) {
            try{
                const { data } = await axios.post("http://localhost:8080/pages/delete-users", {content: studentId});
                alert('Delete user data success!');
            }
            catch(error){
                console.log(error.response?.data);
            }
            const updatedStudents = [...students];
            updatedStudents.splice(studentIndex, 1);
            setStudents(updatedStudents);
        }

        setShowModal(false);
        setSelectedStudent(null);
    };

    const handleEdit = (studentId) => {
        console.log(`Editing student with uid: ${studentId}`);
        const studentToEdit = students.find(student => student.uid === studentId);
        setSelectedStudent(studentToEdit);
        setShowModal(true);
    };

    const handleSave = (updatedStudent) => {
        console.log("Saving data...");
        const studentIndex = students.findIndex(student => student.uid === updatedStudent.uid);

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

    useEffect(() => {
        getData();
    },[])

    const getData = async () => {
        try{
            const { data } = await axios.get("http://localhost:8080/pages/users");
            setStudents(data.message);
        }
        catch(error){
            console.log(error);
        }
    }

    const [registerModal, setRegisterModal] = useState(false);

    const [inputs, setInputs] = useState({ username:"", email:"", password:"", });

    const handleChange = (e) =>{
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value}));
    };

    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            const { data } = await axios.post("http://localhost:8080/users/register", inputs);
            alert('User registration is completed.')
        } catch (e){
            alert(e.response?.data.error || "An error occurred");
        }
        setInputs({ username:"", email:"", password:"", });
    };


    return (
        <div className="EditStudent">
            <h1>Edit Student</h1>
            {/* <div className="Button">
                <button className="PurgeButton">Purge Data</button>
            </div> */}
            
            <div className="EditStudent-Window">
                <div className="Title">
                    <span>Student Name</span>
                    <span>Phone Number</span>
                    <span>Email Address</span>
                    <span>Commencement Date</span>
                    <span>Roles</span>
                    <span>Action</span>
                </div>

                <div className="StudentList">
                    {students.map((student, idx) => (
                        <div className="Student" key={idx}>
                            <span className="CheckboxAndName">
                                <input type="checkbox" value=""/>
                                <span>{student.username}</span>
                            </span>
                            <span>{student.phone}</span>
                            <span>{student.email}</span>
                            <span>{student.date}</span>
                            <span>{student.roles}</span>
                            <span className="EditAndDelete">
                                <button className="EditButton" onClick={() => handleEdit(student.uid)}>
                                    <img src={edit} alt="Edit" className="editImage"/>
                                </button>
                                <button className="DeleteButton" onClick={() => handleDelete(student.uid)}>
                                    <img src={dustbin} alt="Delete" className="deleteImage"/>
                                </button>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => setRegisterModal(!registerModal)} className="NewAccount">+ New Account</button>
            
            <div className="CancelAndSave">
                {/* <button className="CancelButton" onClick={handleCancel}>Cancel</button> */}
                {/* <button className="SaveButton" onClick={handleSaveToCloud}>Save</button> */}
            </div>

            {showModal && selectedStudent && (
                <EditModal 
                    student={selectedStudent} 
                    onSave={handleSave} 
                    onClose={handleCancel}
                />
            )}

            {registerModal && (
                <div className='registerModal'>
                    <h2 style={{textAlign: "center"}}>Registraion Form</h2>
                    <label className="registerModal-label"> Username
                        <br/>
                        <input type="text" value={inputs.username} onChange={(e) => handleChange(e)} name="username"/>
                    </label>
                    <label className="registerModal-label"> Email
                        <br/>
                        <input type="text" value={inputs.email} onChange={(e) => handleChange(e)} name="email"/>
                    </label>
                    <label className="registerModal-label"> Password
                        <br/>
                        <input type="text" value={inputs.password} onChange={(e) => handleChange(e)} name="password"/>
                    </label>
                    <div className="registerModal-submit">
                        <button onClick={(e) => setRegisterModal(false)} className="registerModal-cancel">Cancel</button>
                        <button onClick={(e) => handleRegister(e)} className="registerModal-submit">Submit</button>
                    </div>

                </div>
            )}

        </div>
    );
}

export default EditStudent;

    // const [students, setStudents] = useState([
    //     { id: 1, name: 'Li Yang', phone: '91234567', email: 'liyang123@gmail.com', date: '10/06/2024' },
    //     { id: 2, name: 'Kennedy', phone: '91234567', email: 'ken123@gmail.com', date: '10/06/2024' },
    //     { id: 3, name: 'Diing Yang', phone: '91234567', email: 'DY123@gmail.com', date: '10/06/2024' },
    //     { id: 4, name: 'Marcus', phone: '91234567', email: 'M123@gmail.com', date: '10/06/2024'},
    //     { id: 5, name: 'An', phone: '91234567', email: 'An123@gmail.com', date: '10/06/2024'},
    //     { id: 6, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 7, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 8, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 9, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 10, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 11, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 12, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 13, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 14, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 15, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 16, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 17, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 18, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 19, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    //     { id: 20, name: 'John Doe', phone:'91234567', email: 'JD123@gmail.com', date: '10/06/2024'},
    // ]);
