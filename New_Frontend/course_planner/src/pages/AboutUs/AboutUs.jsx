import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import './AboutUs.scss';
import axios from 'axios';
import ReactQuill from 'react-quill';

const AboutUs = () => {

  const [value, setValue] = useState('');

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try{
      const { data } = await axios.get("http://localhost:8080/pages/about-us");
      setValue(data.message);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className='user-about-us'>
        <ReactQuill
          value={value}
          readOnly={true}
          theme={"bubble"}
        />
      </div>
    </>
  );
}

export default AboutUs;