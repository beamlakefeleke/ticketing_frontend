import React, { Component } from 'react';
import { Card } from '../ui/card/card';
import { Button } from '../ui/button/button';
import { Link } from 'react-router-dom';
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
            const response = await axios.get('https://ticketing-backend-p827g1p7m-beamlakefelekes-projects.vercel.app/api/tickets', {
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
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-semibold text-blue-600">Ticket List</h2>
                    {/* Add New Ticket Button on the left */}
                    <Link to="/add-ticket">
                        <Button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold shadow-md transition duration-300">
                            Add New Ticket
                        </Button>
                    </Link>
                </div>

                {/* Loading & Error Messages */}
                {loading && <p className="text-blue-500 text-lg">Loading...</p>}
                {error && <p className="text-red-500 text-lg">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {tickets.map((ticket) => (
                        <Card key={ticket._id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                            <p className="text-gray-600 mb-4">{ticket.description}</p>
                            <p className="text-gray-500 font-medium">Status: 
                                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                    ticket.status === 'Open' ? 'bg-green-100 text-green-700' :
                                    ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                    {ticket.status}
                                </span>
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }
}

export { TicketList };
