
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'

import './App.css'
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';

function App() {

  return (
    <>
      <AboutUs />
      <Contact />
      <Register/>
      {/* <Login/>
      <ResetPassword/> */}
    </>
  );
}

export default App;
