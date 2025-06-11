import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home: React.FC = () => {
    const { user } = useAuth();
    return (
        <div>
            <h1>Home</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user info...</p>
            )}
        </div>
    );
};

export default Home;