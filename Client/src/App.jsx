import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/HomePage';
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Service from "./pages/Service";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { AuthProvider } from './components/Auth';
import Request from './pages/Request';
import Supplier from './pages/Supplier';


const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<HomePage sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/inventory" element={<Inventory sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/management" element={<UserManagement sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/sales" element={<Sales sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/service" element={<Service sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/reports" element={<Reports sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/profile" element={<Profile sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path="/settings" element={<Settings sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />} />
          <Route path='/request' element={<Request sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>}/>
          <Route path='/supplier' element={<Supplier sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;