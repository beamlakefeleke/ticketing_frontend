import React, { Component } from 'react';
import axios from 'axios';
import { Button } from '../ui/button/button';
import { Card } from '../ui/card/card';
import { Input } from '../ui/input/input';
import { Navigate } from 'react-router-dom'; // Keep Navigate for redirects

class Login extends Component {
    state = { username: '', password: '', error: '', loading: false, redirectToDashboard: false, redirectToSignUp: false };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.setState({ loading: true, error: '' });
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            this.setState({ redirectToDashboard: true });
        } catch (err) {
            this.setState({ error: 'Invalid credentials' });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleSignUpRedirect = () => {
        this.setState({ redirectToSignUp: true });
    };

    render() {
        const { loading, redirectToDashboard, redirectToSignUp, error } = this.state;

        // Redirect to dashboard if login is successful
        if (redirectToDashboard) {
            return <Navigate to="/dashboard" />;
        }

        // Redirect to sign-up page if the user wants to sign up
        if (redirectToSignUp) {
            return <Navigate to="/signup" />;
        }

        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <Card className="p-8 max-w-md w-full bg-white shadow-2xl rounded-2xl">
                    <h2 className="text-3xl font-bold mb-4">Login</h2>
                    {error && <p className="text-red-500">{error}</p>}
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
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>
                    <p className="mt-4 text-center">
                        Don't have an account?{' '}
                        <button
                            className="text-blue-500 hover:underline"
                            onClick={this.handleSignUpRedirect}
                        >
                            Sign Up
                        </button>
                    </p>
                </Card>
            </div>
        );
    }
}

export default Login;
