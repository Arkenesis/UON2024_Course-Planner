import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.jsx'
import AboutUs from './pages/AboutUs/AboutUs';
import Contact from './pages/Contact/Contact';
import PYP from './pages/PYP/PYP'
import Register from './pages/Register/Register';
import Login from './pages/login/Login.jsx';
import ResetPassword from './pages/reset_password/ResetPassword.jsx';

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
      path: 'plan-your-path',
      element: <PYP />
  },
  {
      path: 'contact',
      element: <Contact />
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


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = { router } />
  </React.StrictMode>,
)
