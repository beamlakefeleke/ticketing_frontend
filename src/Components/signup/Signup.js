import React, { Component } from 'react';
import { Button } from '../ui/button/button';
import { Card } from '../ui/card/card';
import { Input } from '../ui/input/input';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Signup extends Component {
    state = { username: '', password: '', role: 'User', error: '', loading: false, redirectToLogin: false };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password, role } = this.state;
        this.setState({ loading: true, error: '' });
        try {
            await axios.post('https://ticketing-backend-git-main-beamlakefelekes-projects.vercel.app/api/signup', { username, password, role });
            this.setState({ redirectToLogin: true });
        } catch (err) {
            this.setState({ error: 'Failed to sign up. Please try again.' });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleLoginRedirect = () => {
        this.setState({ redirectToLogin: true });
    };

    render() {
        const { loading, redirectToLogin } = this.state;

        // Redirect to login page after successful signup
        if (redirectToLogin) {
            return <Navigate to='/login' />;
        }

        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
                <Card className="p-8 max-w-md w-full bg-white shadow-2xl rounded-2xl">
                    <h2 className="text-3xl font-bold mb-4">Signup</h2>
                    {this.state.error && <p className="text-red-500">{this.state.error}</p>}
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="mb-4"
                            onChange={this.handleChange}
                            disabled={loading}
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="mb-4"
                            onChange={this.handleChange}
                            disabled={loading}
                        />
                        <select
                            name="role"
                            className="mb-4 w-full px-4 py-2 border rounded-md"
                            onChange={this.handleChange}
                            disabled={loading}
                        >
                            <option value="User">User</option>
                            <option valuxe="Admin">Admin</option>
                        </select>

                        <Button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? 'Signing up...' : 'Signup'}
                        </Button>
                    </form>

                    {/* Link to login page if already have an account */}
                    <p className="mt-4 text-center">
                        Already have an account?{' '}
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={this.handleLoginRedirect}
                        >
                            Login here
                        </button>
                    </p>
                </Card>
            </div>
        );
    }
}

export default Signup;
