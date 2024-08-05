import React, { useEffect, useState } from 'react';
import './Footer.css'
import axios from 'axios';
import { instance } from '../../App';
const Footer = () => {

    const temp = {
      year: 2024,
      organization: "NewcastlePlanner, Inc.",
      email: "askuon@newcastle.edu.au",
      phone: "+61 2 4921 5000",
    }

    const [value, setValue] = useState(temp);

    useEffect(() => {
      getData();
    },[])
  
    const getData = async () => {
      try{
        const { data } = await instance.get("/pages/footer");
        if(data.message !== undefined){
          setValue(data.message);
        }
      }
      catch(ex){
        alert(ex.response);
      }
    } 

    return (
        <footer style={{ backgroundColor: '#F5F5F5', padding: '10px', color: '#002481'}}>
            <div className='container' style={{display: 'flex' }}>
                <div style={{textAlign: 'left', width: 'auto', marginLeft: '25px' }}>
                    <p>Copyright @ {value.year} <br/>{value.organization} <br/>All Rights Reserved.</p>
                </div>

                <div style={{textAlign: 'left', width: 'auto', marginLeft: '800px', padding: '10px', textDecoration: 'none'}}>
                    <a className='termsCon' href="/terms-and-conditions">Terms and Conditions</a><br/><br/>  
                    <a className='privacyPol' href="/privacy-policy">Privacy Policy</a>
                </div>

                <div style={{textAlign: 'left', marginLeft: '100px', padding: '10px', marginTop: '-15px', textDecoration: 'none'}}>
                    <p>{value.email} <br/><br/>{value.phone}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
