// src/Routes/Dashboard/Dashboard.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../Components/ui/button/button";
import { Card, CardContent } from "../../Components/ui/card/card";
import { Link } from "react-router-dom";
import {TicketTable} from "../../Components/ticketTable/TicketTable"; // Updated import for TicketTable component
import { fetchAllTickets } from "../../Routes/ticket-list/ticketsAction"; // Updated import for fetchAllTickets action

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch]);

  const pendingTickets = tickets.filter((row) => row.status !== "Closed");
  const totalTickets = tickets.length;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/add-ticket">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add New Ticket
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-white shadow-md p-4">
          <CardContent>
            <h2 className="text-lg font-semibold">Total Tickets</h2>
            <p className="text-2xl font-bold">{totalTickets}</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md p-4">
          <CardContent>
            <h2 className="text-lg font-semibold">Pending Tickets</h2>
            <p className="text-2xl font-bold">{pendingTickets.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-md p-4">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Recently Added Tickets</h2>
          <TicketTable tickets={tickets} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
