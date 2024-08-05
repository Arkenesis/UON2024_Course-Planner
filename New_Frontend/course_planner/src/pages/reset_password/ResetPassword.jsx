import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import emailLogo from '../../assets/email.svg';
import backLogo from '../../assets/back.svg';
import loginPic from '../../assets/login.png';

import { Link } from "react-router-dom";
import "./reset_password.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import NavigationBar from '../../components/NavigationBar';
import { instance } from '../../App';

const ResetPassword = () => {
    const [inputs, setInputs] = useState({
        email: "",
    });
    const [err, setErr] = useState();
    const [msg, setMsg] = useState();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const navigate = useNavigate();
    
    const handleResetPassword = async(e) =>{
        e.preventDefault();
        try{
            const { data } = await instance.post("/users/reset-password", inputs);
            setMsg(data.message);
            alert('Kindly proceed to your e-mail to reclaim your account.');
            navigate('/login');
        } catch (ex){
            setErr(ex.response?.data || "An error occurred");
        }
    };

    return (
        <div className="reset-password">
            <div className="card">
                <div className="left">
                    
                    <h1 className="title-1">Welcome to</h1>
                    <h1 className="title-2">UON Course Planner</h1>
                    <form onSubmit={handleResetPassword}>
                        <div className="back">
                            <Link to="/login"><img src={backLogo} /></Link>
                            <p className="subtitle-1">Reset Password</p>
                        </div>
                        <p className="subtitle-2">Enter your email to reset password</p>
                        <div className="input-field-main">
                            <div>
                                <img src={emailLogo} alt=""/> 
                            </div>
                            <div className="input-field-1">
                                <p>Email</p>
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={inputs.email}
                                />
                            </div>
                        </div>

                        <button type="submit">Reset Password</button>
                    </form>
                </div>

                <div className="right">
                    <img src={loginPic}/>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
