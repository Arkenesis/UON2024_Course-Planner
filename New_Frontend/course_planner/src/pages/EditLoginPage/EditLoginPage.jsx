import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import uonBuilding from "../../assets/uonBuilding.jpg";
import "./EditLoginPage.scss";
import ImageUpload from "../image_upload/image_upload";
import axios from 'axios';
import { Link } from "react-router-dom";

function EditLoginPage() {

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [ "header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", ];
  
  const [value, setValue] = useState({
    title: "",
    logo: "",
  });

  const [title, setTitle] = useState('');

  const setLogo = (input) => {
    let temp = { ...value };
    temp.logo = input;
    setValue(temp);
    setIsImagePreviewVisible(false);
  }

  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);

  const handlePreview = () => {
    console.log("Saved content:", value);
    alert("Content saved successfully!");
  };

  const handleImagePreviewClick = () => {
    setIsImagePreviewVisible(!isImagePreviewVisible);
  };

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try{
      const { data } = await axios.get("http://localhost:8080/pages/login");
      setValue((prev) => ({...prev, logo: data.message.logo}));
      setTitle(data.message.title);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleSave = async () => {
    try{
      const { data } = await axios.post("http://localhost:8080/pages/login", {content: {title: title, logo: value.logo}});
      alert(data.message);
    }
    catch(error){
      console.log(error.response?.data);
    }
  };

  return (
    <>
    <h1 style={{textAlign: "center"}}>Edit Login Page</h1>
    <div className="editLoginPage">
      <div className="editTitles">

        <h3>Welcome Message</h3>

        <ReactQuill
          value={title}
          onChange={setTitle}
          modules={modules}
          formats={formats}
        />

        <h3>Picture </h3>
        <div className="imageEdit">
          <div className="backgroundImg">
            {value.logo && value.logo 
            ? ( <img src={value.logo} alt="background Picture" className="loginImg" height={"240px"} width={"300px"} id="profile-pic" /> ) 
            : ( <div className="noImgAlt">Add Background Image</div> )}
          </div>

          <div className="imgButtonContainer">
            <button className="changePic" onClick={handleImagePreviewClick}>
              Change Picture
            </button>
            <button className="deletePic" onClick={() => setLogo('')}>Delete Picture</button>
          </div>
        </div>

        {isImagePreviewVisible && <ImageUpload setImageUrl={setLogo}/> }

        <div className="buttonsContainer">
          {/* <button className="cancel" onClick={handleCancel}>
            Cancel
          </button> */}
          <Link to="../login" target="_blank" className="preview">Preview</Link>
          <button className="save" onClick={handleSave}> Save </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditLoginPage;
