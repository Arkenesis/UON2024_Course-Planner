
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
import HomePage from './pages/Homepage/HomePage';
import TrackProgress from './pages/TrackProgress/TrackProgress';
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import AdminAboutUs from "./pages/AdminAboutUs/AdminAboutUs.jsx";
import AdminTerm from "./pages/AdminTerm/AdminTerm.jsx";
import AdminPolicy from "./pages/AdminPolicy/AdminPolicy.jsx";
import ImageUpload from "./pages/image_upload/ImageUpload.jsx";

function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  return (
    <>
      {/* <NavigationBar />
      <HomePage/>
      <TrackProgress/> */}

      {/* <AboutUs />
      <Contact />
      <Register/>
      <Login/>
      <ResetPassword/> */}
      {/* <ChangePassword/> */}
      {/* <TermsAndConditions/>
      <PrivacyPolicy/>
      <Footer/> */}
      
      {/* <AdminPolicy/> */}

      <ImageUpload/>
    </>
  );
}

export default App;
