import React from 'react';
import { Card } from '../ui/card/card';
import { Button } from '../ui/button/button';

const TicketTable = ({ tickets, onUpdateStatus }) => {
    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">Ticket Table</h2>

            {/* Ticket Cards Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                    <Card
                        key={ticket._id}
                        className="p-6 bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{ticket.title}</h3>
                        <p className="text-gray-700 mb-4">{ticket.description}</p>

                        {/* Status Badge */}
                        <p className="text-sm font-medium mb-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    ticket.status === 'Open'
                                        ? 'bg-green-100 text-green-700'
                                        : ticket.status === 'In Progress'
                                        ? 'bg-yellow-100 text-yellow-700'
                                        : 'bg-red-100 text-red-700'
                                }`}
                            >
                                {ticket.status}
                            </span>
                        </p>

                        {/* Buttons for Updating Status */}
                        <div className="flex gap-3 mt-4">
                            <Button
                                className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2 transition duration-300"
                                onClick={() => onUpdateStatus(ticket._id, 'Closed')}
                                disabled={ticket.status === 'Closed'}
                            >
                                Close
                            </Button>
                            <Button
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg py-2 transition duration-300"
                                onClick={() => onUpdateStatus(ticket._id, 'In Progress')}
                                disabled={ticket.status === 'In Progress'}
                            >
                                In Progress
                            </Button>
                            <Button
                                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg py-2 transition duration-300"
                                onClick={() => onUpdateStatus(ticket._id, 'Open')}
                                disabled={ticket.status === 'Open'}
                            >
                                Open
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export { TicketTable };
