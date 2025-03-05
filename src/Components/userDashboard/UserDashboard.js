import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '../ui/button/button';
import { Card, CardContent } from '../ui/card/card';

import {TicketList} from '../../Components/ticketList/TicketList';

class UserDashboard extends Component {
  state = { tickets: [] };

  componentDidMount() {
    this.fetchTickets();
  }

  fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://ticketing-backend-git-main-beamlakefelekes-projects.vercel.app/api/tickets', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.setState({ tickets: response.data });
    } catch (error) {
      console.error('Failed to fetch tickets', error);
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
          <h1 className="text-2xl font-bold">User Dashboard</h1>
          <Button onClick={this.handleLogout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        </div>
        {/* <Card className="mb-8">
          <CardContent>
            <TicketForm onTicketCreated={this.fetchTickets} />
          </CardContent>
        </Card> */}
        <Card>
          <CardContent>
            <TicketList tickets={this.state.tickets} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default UserDashboard;
