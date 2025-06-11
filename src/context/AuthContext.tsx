import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, User } from '../services/user';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('jwt'));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const logout = useCallback(() => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
        navigate('/login', { replace: true });
    }, [navigate]);

    useEffect(() => {
        if (token) {
            getUserInfo()
                .then(data => {
                    setUser(data);
                    localStorage.setItem('user', JSON.stringify(data));
                })
                .catch(() => {
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [logout, token]);

    return (
        <AuthContext.Provider value={{ user, token, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};