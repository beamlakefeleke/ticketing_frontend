import React, { Component } from 'react';
import { Button } from '../ui/button/button';
import { Card } from '../ui/card/card';
import { Input } from '../ui/input/input';
import axios from 'axios';

class TicketForm extends Component {
    state = { title: '', description: '', loading: false, error: '' };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        this.setState({ loading: true, error: '' });
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({ error: 'No authorization token found' });
            return;
        }
        try {
            await axios.post('https://ticketing-backend-p827g1p7m-beamlakefelekes-projects.vercel.app/api/tickets', { title, description }, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            this.setState({ title: '', description: '' });
            alert('Ticket created successfully');
        } catch (err) {
            this.setState({ error: 'Failed to create ticket. Please try again.' });
        } finally {
            this.setState({ loading: false });
        }
    };

    render() {
        const { title, description, loading, error } = this.state;
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Card className="p-8 shadow-lg rounded-lg w-full max-w-md bg-white">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Create a Ticket</h2>
                    {error && <p className="text-red-600 text-center mb-4 bg-red-100 p-2 rounded">{error}</p>}
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="text"
                                name="title"
                                placeholder="Ticket Title"
                                value={title}
                                onChange={this.handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                type="text"
                                name="description"
                                placeholder="Ticket Description"
                                value={description}
                                onChange={this.handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <Button 
                            type="submit" 
                            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin border-t-2 border-white rounded-full w-6 h-6 mr-2"></div>
                                    Creating...
                                </div>
                            ) : 'Create Ticket'}
                        </Button>
                    </form>
                </Card>
            </div>
        );
    }
}

export { TicketForm };
