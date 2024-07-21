import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import axios from 'axios';
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx'
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import PYP from './pages/PYP/PYP'
import Register from './pages/Register/Register';
import Login from './pages/login/Login.jsx';
import { UserContextProvider } from './pages/login/LoginContext.jsx';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';
import TrackProgress from './pages/TrackProgress/TrackProgress.jsx';


const router = createBrowserRouter([
  {
      path: '/',
      element: <App />
  },
  {
      path: 'about-us',
      element: <AboutUs />
  },
  {
      path: 'contact',
      element: <Contact />
    },
    {
        path: 'plan-your-path',
        element: <PYP />
    },
    {
        path: 'track-progress',
        element: <TrackProgress />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'reset_password',
        element: <ResetPassword />
    }
]);

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router = { router } />
    </UserContextProvider>
  </React.StrictMode>,
)
