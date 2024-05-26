import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'lightblue', padding: '10px', textAlign: 'center' }}>
            <p>Copyright @ 2024 NewcastlePlanner, Inc. All Rights Reserved.</p>
            <a href="/terms-and-conditions">Terms and Conditions</a> | 
            <a href="/privacy-policy">Privacy Policy</a>
            <p>Contact us: askuon@newcastle.edu.au | +61 2 4921 5000</p>
        </footer>
    );
};

export default Footer;
