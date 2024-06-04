
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

import DragDrop from './pages/plan_your_path_demo/PlanYourPathDemo.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <DragDrop />
        </div>
      </DndProvider>
      {/* <NavigationBar />
      <HomePage/>
      <TrackProgress/>

      <AboutUs />
      <Contact />
      <Register/>
      <Login/>
      <ResetPassword/>
      <TermsAndConditions/>
      <PrivacyPolicy/>
      <Footer/> */}
    </>
  );
}

export default App;
