import "./Register.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import userIcon from '../../assets/userIcon.png';
import emailIcon from '../../assets/emailIcon.png';
import passwordIcon from '../../assets/passwordIcon.png';
import register from '../../assets/registerPic.png';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

const Register =() =>{
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    });
    const [err, setErr] = useState();

    const handleChange = (e) =>{
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value}));
    };

    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            NavigationPreloadManager("/");
        } catch (err){
            setErr(err.response?.data || "An error occurred");
        }
    };

    return(
        <div className = "register">
            <div className="card">
                <div className="left">
                    <h1 className="title-1">Welcome to</h1>
                    <h1 className="title-2">UON Course Planner</h1>
                    <form onSubmit={handleRegister}>
                        <p className="subtitle-1">Sign Up Account</p>
                        <p className="subtitle-2">Already have account? Sign in</p>

                        
                        <div className="input-field-main">
                            <div>
                                <img src={userIcon} alt=""/>
                            </div>
                            <div className="input-field-1">
                                <p>Name</p>
                                <input type="text" placeholder="Enter Name" name ="name" onChange={handleChange} value={inputs.name}/>
                            </div>  
                        </div>

                        
                        <div className="input-field-main">
                            <div>
                                <img src={emailIcon} alt=""/>
                            </div>
                            <div className="input-field-1">
                                <p>Email</p>
                                <input type="text" placeholder="Enter Email" name ="emai" onChange={handleChange} value={inputs.email}/>
                            </div>  
                        </div>

               
                        <div className="input-field-main">
                            <div>
                                <img src={passwordIcon} alt=""/>
                            </div>
                            <div className="input-field-1">
                                <p>Password</p>
                                <input type="text" placeholder="Enter Password" name ="password" onChange={handleChange} value={inputs.password}/>
                            </div>  
                        </div>

             
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                    <div className="right">
                        <img src={register}/>
                    </div>
            </div>
        </div>
    );
};

export default Register
