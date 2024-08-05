import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './editProfileModal.scss';
import { UserContext } from '../../pages/login/LoginContext';
import { instance } from '../../App';

function EditProfileModal({onClose, userInfo}) {

    const { user, setUser } = useContext(UserContext);

    const [profile, setProfile] = useState({
        program: userInfo?.firestore_data.program || '',
        start_date: userInfo?.firestore_data.start_date || '',
        end_date: userInfo?.firestore_data.end_date || '',
        campus: userInfo?.firestore_data.campus || '',
        level: userInfo?.firestore_data.level || '',
        gender: userInfo?.firestore_data.gender || ''
    });

    const handleSave = async (e) => {
        e.preventDefault();
        try{
            const { data } = await instance.post("/pages/profile", {content: profile});
            let temp = user.program;
            setUser({...data.message, program: temp});
            alert('Saving course data success!');
        }
        catch(ex){
            alert(ex.response?.data.message);
        }
        onClose();
    };

    const handleInputChange = (e) => {
        setProfile({...profile, [e.target.name]: e.target.value})
    };

    const handleSelectChange = (e) => {
        const temp = e.target.selectedOptions[0].value;
        setProfile({...profile, [e.target.name]: e.target.selectedOptions[0].value})
    };

    return (
        <>
            <div className="EditProfileModal">
                <div className="ModalContent">
                    <label>
                        Program
                        <br/>
                        <select name="program" id="program" value={profile.program} onChange={handleSelectChange}>
                            <option value=''>----- Pick 1 Program -----</option>
                            {userInfo?.program && userInfo?.program[0].map((i,idx) => (
                                <option key={idx} value={i.name}>{i.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Start Date
                        <input type="date" name="start_date" value={profile.start_date} onChange={handleInputChange} min="2020-01-01" max="2099-12-31" />
                    </label>
                    <label>
                        End Date
                        <input type="date" name="end_date" value={profile.end_date} onChange={handleInputChange} min="2020-01-01" max="2099-12-31" />
                    </label>
                    <label>
                        Campus
                        <br/>
                        <select name="campus" id="campus" value={profile.campus} onChange={handleSelectChange}>
                            <option value="">----- Pick 1 Campus -----</option>
                            <option value="Newcastle">Newcastle</option>
                            <option value="Central">Central</option>
                            <option value="Coast Sydney">Coast Sydney</option>
                            <option value="Newcastle City">Newcastle City</option>
                            <option value="Singapore">Singapore</option>
                        </select>
                    </label>
                    <label>
                        Level
                        <br/>
                        <select name="level" id="level" value={profile.level} onChange={handleSelectChange}>
                            <option value="">----- Pick 1 Level -----</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Master">Master</option>
                            <option value="Phd">Phd</option>
                        </select>                        
                    </label>
                    <label>
                        Gender
                        <br/>
                        <select name="gender" id="gender" value={profile.gender} onChange={handleSelectChange}>
                            <option value="">----- Optional -----</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>                        
                    </label>
                    <div className="ModalButtons">
                        <button className='CancelChanges' onClick={onClose}>Cancel</button>
                        <button className='SaveDetails' onClick={handleSave}>Save</button>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default EditProfileModal;