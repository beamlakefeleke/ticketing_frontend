import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '../ui/button/button';
import { Card, CardContent } from '../ui/card/card';
import {TicketList} from '../../Components/ticketList/TicketList';

class AdminDashboard extends Component {
  state = { tickets: [] };

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tickets', {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      });
      this.setState({ tickets: response.data });
    } catch (error) {
      console.error('Failed to fetch tickets', error);
    }
  };

  handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tickets/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchTickets();
    } catch (error) {
      console.error('Failed to update ticket status', error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  render() {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button onClick={this.handleLogout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
        <Card>
          <CardContent>
            <TicketList tickets={this.state.tickets} onUpdateStatus={this.handleUpdateStatus} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default AdminDashboard;
