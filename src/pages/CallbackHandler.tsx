import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackHandler: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('jwt', token);
            navigate('/home');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return <p>Logging you in...</p>;
};

export default CallbackHandler;