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
            await axios.post('http://localhost:5000/api/tickets', { title, description }, {
                headers: { Authorization: `Bearer ${token}` },
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
            <Card className="p-4 max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4">Create a Ticket</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={this.handleSubmit}>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={this.handleChange}
                        className="mb-4"
                    />
                    <Input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={this.handleChange}
                        className="mb-4"
                    />
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Ticket'}
                    </Button>
                </form>
            </Card>
        );
    }
}

export { TicketForm };
