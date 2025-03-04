import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/login/Login';
import Signup from './Components/signup/Signup';
import Dashboard from './Routes/dashboard/dashboard';
import { TicketForm } from './Components/ticketForm/TicketForm'; 
import './index.css';

class App extends Component {
  render() {
    return (
      
        <Routes>
         
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-ticket" element={<TicketForm />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      
    );
  }
}

export default App;
