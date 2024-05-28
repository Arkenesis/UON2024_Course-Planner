
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'

import './App.css'
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register';
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TermsAndConditions from "./pages/termsandconditions/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy.jsx";
import Footer from "./components/Footer.jsx";

import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className="App">
        <NavigationBar />
        <div className="container">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <MainContent />
        </div>
      </div>
      <AboutUs />
      <Contact />
      <Register/>
      <Login/>
      <ResetPassword/>
      <TermsAndConditions/>
      <PrivacyPolicy/>
      <Footer/>
    </>
  );
}

export default App;
