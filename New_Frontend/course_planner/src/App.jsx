
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'

import NavigationBar from './components/NavigationBar';
import HomePage from './pages/HomePage/HomePage.jsx';
import AboutUs from './pages/AboutUs/AboutUs.jsx';
import Contact from './pages/Contact/Contact.jsx';
import TrackProgress from './pages/TrackProgress/TrackProgress';
import Register from './pages/Register/Register';
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TermsAndConditions from "./pages/termsandconditions/TermsAndConditions.jsx";
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy.jsx";
import Footer from "./components/Footer.jsx";
import './App.css';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <HomePage/>
      <TrackProgress/>
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
