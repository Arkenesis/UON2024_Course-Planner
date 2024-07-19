import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext, useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './App.css'
// Layout
import NavigationBar from './components/NavigationBar';
// User Page
import DragDrop from './pages/plan_your_path_demo/PlanYourPathDemo.jsx';
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import Footer from "./components/Footer/Footer.jsx";
import HomePage from './pages/Homepage/HomePage';
import Login from './pages/login/Login.jsx';
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy.jsx";
import Register from './pages/Register/Register';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TermsAndConditions from "./pages/termsandconditions/TermsAndConditions.jsx";
import TrackProgress from './pages/TrackProgress/TrackProgress';
import ChangePassword from "./pages/ChangePassword/ChangePassword.jsx";

// Admin Pages
import { AdminNav } from "./components/AdminNav/AdminNav.jsx";

import PYP from './pages/PYP/PYP.jsx'
import { UserContext } from "./pages/login/LoginContext.jsx";
import EditStudentModal from "./components/editstudentmodal/EditStudentModal.jsx";
import AdminAssets from "./components/AdminNav/AdminAssets.jsx";


// Login

function App() {

  const { user } = useContext(UserContext);

  const Layout = ()=>{
    const location = useLocation();
    // Check if the current route is '/admin'
    const hideNavbar = location.pathname.startsWith('/admin');
    return(
      <>
        {!hideNavbar && <NavigationBar />}
        <Outlet />
        {!hideNavbar && <Footer />}
      </>
    );
  };

  const ProtectedRoute = ({children}) => {
    if(!user){
      return <Navigate to ="login"/>
    }
    return children;
  }

  const AdminRoute = ({children}) => {
    if(!user){
      return <Navigate to ="/login"/>
    }
    const roles = user?.firestore_data.roles;
    if(roles === 'Admin'){
      return children;
    }
    return <Navigate to ="/login"/>
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // Use Layout as the common wrapper
      children: [
        { path: 'about-us', element: <AboutUs /> },
        { path: 'contact', element: <Contact /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'privacy-policy', element: <PrivacyPolicy /> },
        { path: 'terms-and-conditions', element: <TermsAndConditions /> },
        { path: 'change-password', element: <ChangePassword /> },
        {
          path: '',
          element: (
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          ),
          children: [
            { path: 'home', element: <HomePage /> },
            { path: 'track-progress', element: <TrackProgress /> },
            {
              path: 'plan-your-path',
              element: (
                <DndProvider backend={HTML5Backend}>
                  <DragDrop />
                </DndProvider>
              ),
            },
          ],
        },
        {
          path: 'admin',
          element: (
            <AdminRoute>
              <AdminNav/>
            </AdminRoute>
          )
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <EditStudentModal/>
      <div style={{width:'100px', margin:'0 0 0 200px'} }>
        <AdminAssets/>
      </div>
    </>
  );
}

export default App;
