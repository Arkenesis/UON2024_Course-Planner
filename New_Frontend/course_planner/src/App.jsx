import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import 'react-toastify/dist/ReactToastify.css';



import './App.css'
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Footer from "./components/Footer/Footer.jsx";
import Login from './pages/login/Login.jsx';
import NavigationBar from './components/NavigationBar';
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy.jsx";
import Register from './pages/Register/Register';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TermsAndConditions from "./pages/termsandconditions/TermsAndConditions.jsx";

import TrackProgress from './pages/TrackProgress/TrackProgress';

import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import image_upload from "./pages/image_upload/image_upload.jsx";
import EditLoginPage from "./pages/EditLoginPage/EditLoginPage.jsx";
import EditRegisterPage from "./pages/EditRegisterPage/EditRegisterPage.jsx";

// Admin Pages
import AdminAboutUs from "./pages/Admin_Pages/AdminAboutUs/AdminAboutUs.jsx";
import AdminTerm from "./pages/Admin_Pages/AdminTerm/AdminTerm.jsx";
import AdminPolicy from "./pages/Admin_Pages/AdminPolicy/AdminPolicy.jsx";
import EditStudent from "./pages/Admin_Pages/editstudent/EditStudent.jsx";
import EditStudentHomePage from './pages/Admin_Pages/EditStudentHomePage/EditStudentHomePage';
import EditProgram from './pages/Admin_Pages/EditProgram/EditProgram.jsx';
import EditNavBar from './pages/Admin_Pages/EditNavBar/EditNavBar';
import EditCourse from './pages/Admin_Pages/EditCourse/EditCourse.jsx';

import DragDrop from './pages/plan_your_path_demo/PlanYourPathDemo.jsx';
import AdSideNav from "./components/sideNav/AdSideNav.jsx";
import { AdminNav } from "./components/AdminNav/AdminNav.jsx";

import PYP from './pages/PYP/PYP.jsx'
import EditStudentModal from "./components/editstudentmodal/EditStudentModal.jsx";
import AdminAssets from "./components/AdminNav/AdminAssets.jsx";


// Login

function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  return (
    <>
 
      {/* <EditNavBar/> */}

      <PYP/>
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <EditCourse/> */}
      {/* <EditStudent/> */}

      {/* <HomePage/>
      <TrackProgress/>
      <EditStudentHomePage/>
      <EditNavBar/> */}
    
      {/* <DndProvider backend={HTML5Backend}>
        <div className="App">
          <DragDrop />
        </div>
      </DndProvider>
      <NavigationBar />
      <HomePage/>
      <TrackProgress/>

      <AboutUs />
      <Contact />

      <ResetPassword/>
      <TermsAndConditions/>
      <PrivacyPolicy/>
      <Footer/> */}
      {/* <TrackProgress/> */}

      {/* <AboutUs /> */}
      {/* <Contact /> */}
      {/* <Register/> */}
      {/* <Login/> */}
      {/* <EditNavBar/> */}
      {/* <ResetPassword/>  */}
      {/* <ChangePassword/> */}
      {/* <PrivacyPolicy/> */}
      {/* <EditStudent/> */}
      {/* <EditStudentHomePage /> */}
      {/* <EditProgram /> */}
      {/* <Footer/>  */}

      {/* <AdminPolicy/>
      <AdminAboutUs/>
      <AdminTerm/> */}
      {/* <ImageUpload/> */}
     {/* <EditLoginPage/> */}
     {/* <EditRegisterPage/> */}
    
     {/* <image_upload/> */}


     
    {/* <AdminNav/> */}







    </>




  );
}

export default App;
