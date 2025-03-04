import React, { Component } from 'react';

import { Card } from '../ui/card/card';

import axios from 'axios';


class TicketList extends Component {
    state = { tickets: [], loading: false, error: '' };

    componentDidMount() {
        this.fetchTickets();
    }

    fetchTickets = async () => {
        this.setState({ loading: true, error: '' });
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('http://localhost:5000/api/tickets', {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.setState({ tickets: response.data });
        } catch (err) {
            this.setState({ error: 'Failed to fetch tickets. Please try again.' });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { tickets, loading, error } = this.state;
        return (
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Ticket List</h2>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tickets.map((ticket) => (
                        <Card key={ticket._id} className="p-4 bg-white shadow rounded">
                            <h3 className="text-lg font-semibold">{ticket.title}</h3>
                            <p>{ticket.description}</p>
                            <p>Status: {ticket.status}</p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export { TicketList };
