import React from 'react';
import { Card } from '../ui/card/card';
import { Button } from '../ui/button/button';

const TicketTable = ({ tickets, onUpdateStatus }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Ticket Table</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tickets.map((ticket) => (
                    <Card key={ticket._id} className="p-4 bg-white shadow rounded">
                        <h3 className="text-lg font-semibold">{ticket.title}</h3>
                        <p>{ticket.description}</p>
                        <p>Status: {ticket.status}</p>
                        <div className="flex gap-2 mt-4">
                            <Button
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => onUpdateStatus(ticket._id, 'Closed')}
                            >
                                Close Ticket
                            </Button>
                            <Button
                                className="bg-yellow-500 hover:bg-yellow-600"
                                onClick={() => onUpdateStatus(ticket._id, 'In Progress')}
                            >
                                In Progress
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export { TicketTable };
