import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Link } from "react-router-dom";
import "./ChangePassword.scss";
import { useState } from "react";
import eyeIcon from '../../assets/eyeicon.png'; 

const ChangePassword = () => {
    const [inputs, setInputs] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [err, setErr] = useState();
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTogglePassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            
            console.log("Password change successful");
        } catch (err) {
            setErr(err.response?.data || "An error occurred");
        }
    };

    return (
        <div className="changePassword">
            <div className="card">
                <h1 className="title">Reset Password</h1>
                <form onSubmit={handleChangePassword}>
                    <div className="input-field">
                        <p>Current Password</p>
                        <div className="password-input">
                            <input
                                type={showPassword.currentPassword ? "text" : "password"}
                                placeholder="Enter your current password"
                                name="currentPassword"
                                onChange={handleChange}
                                value={inputs.currentPassword}
                            />
                            <img
                                src={eyeIcon}
                                alt="Toggle visibility"
                                onClick={() => handleTogglePassword("currentPassword")}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <p>New Password</p>
                        <div className="password-input">
                            <input
                                type={showPassword.newPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                name="newPassword"
                                onChange={handleChange}
                                value={inputs.newPassword}
                            />
                            <img
                                src={eyeIcon}
                                alt="Toggle visibility"
                                onClick={() => handleTogglePassword("newPassword")}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <p>Confirm Password</p>
                        <div className="password-input">
                            <input
                                type={showPassword.confirmPassword ? "text" : "password"}
                                placeholder="Re-enter password"
                                name="confirmPassword"
                                onChange={handleChange}
                                value={inputs.confirmPassword}
                            />
                            <img
                                src={eyeIcon}
                                alt="Toggle visibility"
                                onClick={() => handleTogglePassword("confirmPassword")}
                            />
                        </div>
                    </div>
                    {err && <p className="error">{err}</p>}
                    <Link className="forgot-link" to="../reset_password">Forgot Password?</Link>
                    <button type="submit">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
