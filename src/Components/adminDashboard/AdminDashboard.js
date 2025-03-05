import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { Button } from '../ui/button/button';
import { Card, CardContent } from '../ui/card/card';
import { TicketTable } from '../../Components/ticketTable/TicketTable';
import { fetchAllTickets } from '../../Routes/ticket-list/ticketsAction';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.tickets);
    const [localTickets, setLocalTickets] = useState([]);
    const [users, setUsers] = useState([]); // State for users
    const [loadingUsers, setLoadingUsers] = useState(false); // Loading state for users
    const [activeTab, setActiveTab] = useState('tickets'); // Track the active tab
    const [updatingUserId, setUpdatingUserId] = useState(null); // Track user being updated
    const [newUsername, setNewUsername] = useState(""); // Track new username for update
    const [newRole, setNewRole] = useState(""); // Track new role for update

    useEffect(() => {
        if (!tickets.length) {
            dispatch(fetchAllTickets());
        } else {
            setLocalTickets(tickets);
        }

        fetchUsers(); // Fetch users when the component mounts
    }, [tickets, dispatch]);

    // Fetch Users function
    const fetchUsers = async () => {
        setLoadingUsers(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get('https://ticketing-backend-p827g1p7m-beamlakefelekes-projects.vercel.app/api/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data); // Set the users in the state
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoadingUsers(false);
        }
    };

    const pendingTickets = tickets.filter((row) => row.status !== "Open" && row.status !== "Closed");
    const openTickets = tickets.filter((row) => row.status === "Open");
    const closedTickets = tickets.filter((row) => row.status === "Closed");
    const totalTickets = tickets.length;

    const handleUpdateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://ticketing-backend-p827g1p7m-beamlakefelekes-projects.vercel.app/api/tickets/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch(fetchAllTickets());
        } catch (error) {
            console.error('Failed to update ticket status', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    // Handle updating user details
    const handleUpdateUser = async () => {
        if (!newUsername || !newRole) {
            alert('Please fill in both fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://ticketing-backend-p827g1p7m-beamlakefelekes-projects.vercel.app/api/users/${updatingUserId}`, {
                username: newUsername,
                role: newRole
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUpdatingUserId(null);
            setNewUsername("");
            setNewRole("");
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    // Handle deleting a user
    const handleDeleteUser = async (userId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://ticketing-backend-p827g1p7m-beamlakefelekes-projects.vercel.app/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            fetchUsers(); // Refresh the user list after deletion
        } catch (error) {
            console.error('Failed to delete user', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
                    Logout
                </Button>
            </div>

            {/* Tab Navigation */}
            <div className="mb-8">
                <div className="flex space-x-4">
                    <Button
                        className={`px-4 py-2 rounded-md ${activeTab === 'tickets' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('tickets')}
                    >
                        Tickets
                    </Button>
                    <Button
                        className={`px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </Button>
                </div>
            </div>

            {/* Sliding Tab Content */}
            <div className="transition-all duration-500 ease-in-out">
                {activeTab === 'tickets' && (
                    <div>
                        {/* Ticket Stats */}
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

                            <Card className="bg-white shadow-md p-4">
                                <CardContent>
                                    <h2 className="text-lg font-semibold">Open Tickets</h2>
                                    <p className="text-2xl font-bold">{openTickets.length}</p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white shadow-md p-4">
                                <CardContent>
                                    <h2 className="text-lg font-semibold">Closed Tickets</h2>
                                    <p className="text-2xl font-bold">{closedTickets.length}</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tickets Table */}
                        <Card>
                            <CardContent>
                                <TicketTable
                                    tickets={localTickets}
                                    onUpdateStatus={handleUpdateStatus}
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">User List</h2>
                        {loadingUsers ? (
                            <p>Loading users...</p>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {users.map((user) => (
                                    <Card key={user._id} className="bg-white shadow-md p-4">
                                        <CardContent>
                                            <h3 className="text-lg font-semibold">{user.username}</h3>
                                            <p className="text-sm text-gray-600">Role: {user.role}</p>

                                            {/* Update and Delete Buttons */}
                                            <div className="mt-4">
                                                <Button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                                    onClick={() => {
                                                        setUpdatingUserId(user._id);
                                                        setNewUsername(user.username);
                                                        setNewRole(user.role);
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    className="bg-red-500 hover:bg-red-600 text-white ml-2"
                                                    onClick={() => handleDeleteUser(user._id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Update User Modal */}
            {updatingUserId && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Update User</h3>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="New Username"
                            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="text"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            placeholder="New Role"
                            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
                        />
                        <div className="mt-4 flex justify-end">
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={handleUpdateUser}
                            >
                                Update
                            </Button>
                            <Button
                                className="bg-gray-500 hover:bg-gray-600 text-white ml-2"
                                onClick={() => setUpdatingUserId(null)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
