import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Service from "./pages/Service";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  const [authenticated, setAuthenticated] = useState(false); // Authentication state

  const handleLogin = () => {
    setAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={authenticated ? <HomePage sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/inventory" element={authenticated ? <Inventory sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/management" element={authenticated ? <UserManagement sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/sales" element={authenticated ? <Sales sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/service" element={authenticated ? <Service sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/reports" element={authenticated ? <Reports sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/profile" element={authenticated ? <Profile sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
        <Route path="/settings" element={authenticated ? <Settings sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
