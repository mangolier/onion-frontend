import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorize/google';
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <h1 className="login-title">Sign in to Your App</h1>
                <p className="login-subtitle">Use your Google account</p>

                <button className="google-btn" onClick={handleLogin}>
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="google-logo"
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;