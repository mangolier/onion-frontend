import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import CallbackHandler from './pages/CallbackHandler';
import Home from './pages/Home';
import Login from './pages/Login';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/oauth2/redirect" element={<CallbackHandler />} />

            <Route element={<AppLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
        </Routes>
    );
};

export default App;