import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#f5f5f5', padding: '10px', color: 'blue'}}>
            <div className='container' style={{display: 'flex' }}>
                <div style={{textAlign: 'left', width: 'auto', marginLeft: '25px' }}>
                    <p>Copyright @ 2024 <br/>NewcastlePlanner, Inc. <br/>All Rights Reserved.</p>
                </div>

                <div style={{textAlign: 'left', width: 'auto', marginLeft: '800px', padding: '10px'}}>
                    <a href="/terms-and-conditions">Terms and Conditions</a><br/><br/>  
                    <a href="/privacy-policy">Privacy Policy</a>
                </div>

                <div style={{textAlign: 'left', marginLeft: '100px', padding: '10px', marginTop: '-15px'}}>
                    <p>askuon@newcastle.edu.au <br/><br/>+61 2 4921 5000</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
