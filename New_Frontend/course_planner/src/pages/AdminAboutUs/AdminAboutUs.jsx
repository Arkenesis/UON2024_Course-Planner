import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './AdminAboutUs.module.scss';

const AdminAboutUs = () => {
  const [value, setValue] = useState(`
    <p>UON Course Planner is a Professional Educational Platform. Here we will provide you only interesting content, which you will like very much. We’re dedicated to providing you the best of Educational, with a focus on dependability and Plan Course throughout your Study. We’re working to turn our passion for Educational into a booming online website. We hope you enjoy our Educational as much as we enjoy offering them to you.</p>
    <p>I will keep posting more important posts on my Website for all of you. Please give your support and love.</p>
    <p><strong>Thanks For Visiting Our Site</strong></p>
    <p><span style="color: blue;">Have a nice day!</span></p>
  `);

  const handleCancel = () => {
    setValue(`
      <p>UON Course Planner is a Professional Educational Platform. Here we will provide you only interesting content, which you will like very much. We’re dedicated to providing you the best of Educational, with a focus on dependability and Plan Course throughout your Study. We’re working to turn our passion for Educational into a booming online website. We hope you enjoy our Educational as much as we enjoy offering them to you.</p>
      <p>I will keep posting more important posts on my Website for all of you. Please give your support and love.</p>
      <p><strong>Thanks For Visiting Our Site</strong></p>
      <p><span style="color: blue;">Have a nice day!</span></p>
    `);
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

  return (
    <div className={styles.editorContainer}>
      <ReactQuill value={value} onChange={setValue} modules={modules} formats={formats} className={styles.quill} />
      <div className={styles.buttonsContainer}>
        <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
        <button onClick={handlePreview}>Preview</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AdminAboutUs;
