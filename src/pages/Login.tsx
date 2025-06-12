import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import '../styles/Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [, setLoading] = useState(false);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        login({ email, password })
            .then(data => {
                localStorage.setItem('jwt', data.access_token);
            })
            .finally(() => setLoading(false));
        navigate('/home', { replace: true });
    };

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorize/google';
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">CÁ VIÊN CHIÊN</h1>
                <form onSubmit={handleEmailLogin} className="login-form">
                    <input type="email" placeholder="Email" className="login-input" required />
                    <input type="password" placeholder="Mật khẩu" className="login-input" required />
                    <button type="submit" className="login-button">Đăng nhập</button>
                </form>
                <div className="divider">hoặc</div>
                <button className="google-btn" onClick={handleLogin}>
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google logo"
                        className="google-logo"
                    />
                    Sign in with Google
                </button>
                <p className="signup-text">
                    Chưa có tài khoản?{' '}
                    <span onClick={() => navigate('/signup')} className="signup-link">
            Đăng ký
          </span>
                </p>
            </div>
        </div>
    );
};

export default Login;