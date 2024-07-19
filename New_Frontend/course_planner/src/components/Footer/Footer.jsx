import React from 'react';
import './Footer.css'
const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#F5F5F5', padding: '10px', color: '#002481'}}>
            <div className='container' style={{display: 'flex' }}>
                <div style={{textAlign: 'left', width: 'auto', marginLeft: '25px' }}>
                    <p>Copyright @ 2024 <br/>NewcastlePlanner, Inc. <br/>All Rights Reserved.</p>
                </div>

                <div style={{textAlign: 'left', width: 'auto', marginLeft: '800px', padding: '10px', textDecoration: 'none'}}>
                    <a className='termsCon' href="/terms-and-conditions">Terms and Conditions</a><br/><br/>  
                    <a className='privacyPol' href="/privacy-policy">Privacy Policy</a>
                </div>

                <div style={{textAlign: 'left', marginLeft: '100px', padding: '10px', marginTop: '-15px', textDecoration: 'none'}}>
                    <p>askuon@newcastle.edu.au <br/><br/>+61 2 4921 5000</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
