import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uonBuilding from '../../assets/uonBuilding.jpg'
import './EditRegisterPage.css'

function EditRegisterPage() {

     const [value, setValue] = useState(`
        
        `);
      
        const handleCancel = () => {
          setValue(``);
        };
      
        const handlePreview = () => {
          alert('Preview: ' + value);
        };
      
        const handleSave = () => {
          console.log('Saved content:', value);
          alert('Content saved successfully!');
        };
      
        const modules = {
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
          ],
        };
      
        const formats = [
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image'
        ];
      


        // let profilePic = document.getElementById("profile-pic");
        // let inputFile = document.getElementById("input-file");

        //  changePicture = () => {
        //     profilePic.src = URL.createObjectURL(inputFile.files[0]);

           
        // }

        const [profilePic, setProfilePic] = useState(null);

        const handleFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
            const objectURL = URL.createObjectURL(file);
            setProfilePic(objectURL);
          }
        };


  return (
    <div>

        <div className='editTitles'>
            <h2>Edit Register Page</h2>


            <h3>Welcome Message</h3>


    

            <div className='editorContainer'>
            <ReactQuill value={value} onChange={setValue} modules={modules} formats={formats}/>

            </div>
            <div className='buttonsContainer'>
            <button className='cancel' onClick={handleCancel}>Cancel</button>
            <button className='preview' onClick={handlePreview}>Preview</button>
            <button className='save' onClick={handleSave}>Save</button>
            </div>




        <div>
            
    </div>
       
    <h3>Picture </h3>
        <div className='imageEdit'>


      {profilePic && (
        <img
          src={profilePic}
          alt="Profile Picture"
          
          id="profile-pic"
        />
      )}


        <div className='imgButtonContainer'>
        <label className='changePic' for="input-file">Change Picture</label>
        <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            id="input-file"
            onChange={handleFileChange}
        />


        <button className='deletePic'>Delete Picture</button>
    </div>


</div>
        

<div>
    
    </div>

</div>
    

</div>



  )
}

export default EditRegisterPage;