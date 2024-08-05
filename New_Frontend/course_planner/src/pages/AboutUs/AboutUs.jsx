import React, { useEffect, useState } from 'react';
import NavigationBar from '../../components/NavigationBar';
import './AboutUs.scss';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { instance } from '../../App';

const AboutUs = () => {

  const [value, setValue] = useState('');

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try{
      const { data } = await instance.get("/pages/about-us");
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