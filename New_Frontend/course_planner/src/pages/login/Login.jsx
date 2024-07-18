import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import emailLogo from '../../assets/email.svg';
import passwordLogo from '../../assets/email.svg';
import loginPic from '../../assets/login.png';

import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from './LoginContext';

const Login = () => {
    
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setErr] = useState();
    
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const navigate = useNavigate();

    const { login } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try{
            await login(inputs);
            alert('Login done.')
            //navigate("/");
        }
        catch(error){
            setErr(error.response?.data || "Kindly check your email and password");
        }

    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    
                    <h1 className="title-1">Welcome to</h1>
                    <h1 className="title-2">UON Course Planner</h1>
                    <form onSubmit={handleLogin}>
                        <p className="subtitle-1">Account Login</p>
                        <p className="subtitle-2">Sign in to your account</p>
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

                        <div className="input-field-main">
                            <div>
                                <img src={passwordLogo} alt=""/> 
                            </div>
                            <div className="input-field-1">
                                <p>Password</p>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={handleChange}
                                    value={inputs.password}
                                />
                            </div>
                        </div>

                        <div className="remember-me">
                            <div className="remember-me-1">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    onChange={handleChange}
                                    value={inputs.rememberMe}
                                />
                                <p>Remember Me</p>
                            </div>
                            <div>
                                <p>Forgot Password</p>
                            </div>
                        </div>

                        {/* {err && <p className="error">{err}</p>} */}
                        <button type="submit">Login</button>
                    </form>
                    {/* <Link to="/register">
                        <button>Register</button>
                    </Link> */}
                </div>

                <div className="right">
                    <img src={loginPic}/>
                </div>
            </div>
        </div>
    );
};

export default Login;
