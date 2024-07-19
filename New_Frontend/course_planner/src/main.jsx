import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import axios from 'axios';
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App.jsx'
import { UserContextProvider } from './pages/login/LoginContext.jsx';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <UserContextProvider>
      <App/>
    </UserContextProvider>
  </React.StrictMode>,
)
