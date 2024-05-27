// src/App.js
import React, { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      <NavigationBar />
      <div className="container">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
    </div>
  );
};

export default App;
