import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/login/Login';
import Signup from './Components/signup/Signup';

import { TicketForm } from './Components/ticketForm/TicketForm'; 
import AdminDashboard from './Components/adminDashboard/AdminDashboard';
import UserDashboard from './Components/userDashboard/UserDashboard';
import './index.css';

class App extends Component {
  render() {
    const role = localStorage.getItem('role');
    const isAuthenticated = localStorage.getItem('token') !== null;
    return (
      
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {isAuthenticated && role === 'Admin' && (
                    <Route path="/dashboard" element={<AdminDashboard />} />
                )}
                
                {isAuthenticated && role === 'User' && (
                    <Route path="/dashboard" element={<UserDashboard />} />
                )}
          <Route path="/add-ticket" element={<TicketForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      
    );
  }
}

export default App;
