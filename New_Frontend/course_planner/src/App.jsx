
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './App.css'
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Footer from "./components/Footer.jsx";
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/login/Login.jsx';
import NavigationBar from './components/NavigationBar';
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy.jsx";
import Register from './pages/Register/Register';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TermsAndConditions from "./pages/termsandconditions/TermsAndConditions.jsx";
import TrackProgress from './pages/TrackProgress/TrackProgress';

import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";
import AdminAboutUs from "./pages/AdminAboutUs/AdminAboutUs.jsx";
import AdminTerm from "./pages/AdminTerm/AdminTerm.jsx";
import AdminPolicy from "./pages/AdminPolicy/AdminPolicy.jsx";
import EditStudent from "./pages/editstudent/EditStudent.jsx";
import ImageUpload from "./pages/image_upload/ImageUpload.jsx";
import EditLoginPage from "./pages/EditLoginPage/EditLoginPage.jsx";
import EditRegisterPage from "./pages/EditRegisterPage/EditRegisterPage.jsx";

// Admin Pages
import EditStudentHomePage from './pages/Admin_Pages/EditStudentHomePage/EditStudentHomePage';
import EditProgram from './pages/Admin_Pages/EditProgram/EditProgram';
import EditNavBar from './pages/Admin_Pages/EditNavBar/EditNavBar';



import DragDrop from './pages/plan_your_path_demo/PlanYourPathDemo.jsx';
import AdSideNav from "./components/sideNav/AdSideNav.jsx";
import { AdminNav } from "./components/AdminNav/AdminNav.jsx";




// Login
import AdminManageCourse from "./pages/AdminManageCourse/AdminManageCourse.jsx";

function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  return (
    <>
    {/* <HomePage/>
    <TrackProgress/>

    <EditStudentHomePage/>
    <EditProgram/>
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
      <Register/>
      <Login/>
      <ResetPassword/>
      <TermsAndConditions/>
      <PrivacyPolicy/>
      <Footer/>
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
     <EditLoginPage/>
     <EditRegisterPage/>
   
      <AdminNav/>



      <Footer/>
      
      <AdminManageCourse/>

    </>




  );
}

export default App;
