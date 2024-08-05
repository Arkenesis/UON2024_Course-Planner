import "./Register.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import userIcon from '../../assets/userIcon.png';
import emailIcon from '../../assets/emailIcon.png';
import passwordIcon from '../../assets/passwordIcon.png';
import register from '../../assets/registerPic.png';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { UserContext } from "../login/LoginContext";
import ReactQuill from "react-quill";
import { instance } from "../../App";

const Register =() =>{

    const [err, setErr] = useState();

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    });

    const handleChange = (e) =>{
        setInputs((prev) =>({...prev, [e.target.name]: e.target.value}));
    };

    const handleRegister = async(e) =>{
        e.preventDefault();
        try{
            const { data } = await instance.post("/users/register", inputs);
            navigate('/login');
            // setUser(data.message);
            alert('Registration successfully, kindly proceed to login page.')
        } catch (e){
            setErr(e.response?.data.error || "An error occurred");
        }
    };

    const [value, setValue] = useState(register);
    const [title, setTitle] = useState("<h2>Welcome to UON Course Planner</h2>");

    useEffect(() => {
      getData()
    },[])
  
    const getData = async () => {
      try{
        const { data } = await instance.get("/pages/register");
        setTitle(data.message.title);
        setValue(data.message.logo);
      }
      catch(error){
        console.log(error);
      }
    }

    return(
        <div className = "register">
            <div className="card">
                <div className="left">
                    <ReactQuill value={title} readOnly={true} theme={"bubble"} />
                    <form onSubmit={handleRegister}>
                        <p className="subtitle-1">Sign Up Account</p>
                        <p className="subtitle-2">Already have account? <Link to='/login'> Sign in </Link></p>

                        {err && <p>{err}</p>}
                        <div className="input-field-main">
                            <div className="image-container">
                                <img src={userIcon} alt=""/>
                            </div>
                            <div className="input-field-1">
                                <p>Name</p>
                                <input type="text" placeholder="Enter Name" name ="username" onChange={handleChange} value={inputs.name}/>
                            </div>  
                        </div>

                        
                        <div className="input-field-main">
                            <div className="image-container">
                                <img src={emailIcon} alt=""/>
                            </div>
                            <div className="input-field-1">
                                <p>Email</p>
                                <input type="text" placeholder="Enter Email" name ="email" onChange={handleChange} value={inputs.email}/>
                            </div>  
                        </div>

               
                        <div className="input-field-main">
                            <div className="image-container">
                                <img src={passwordIcon} alt=""/>
                            </div>
                            <div className="input-field-1">
                                <p>Password</p>
                                <input type="password" placeholder="Enter Password" name ="password" onChange={handleChange} value={inputs.password}/>
                            </div>  
                        </div>

             
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                    <div className="right">
                        <img src={value}/>
                    </div>
            </div>
        </div>
    );
};

export default Register
