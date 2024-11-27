/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated, isAdmin } from '../api/auth';
import { useState, useEffect } from 'react';

export const AuthRoute = ({ type }) => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await isAuthenticated();
            setIsVerified(authenticated);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (type === 'protected' && !isVerified) {
        return <Navigate to="/login" />;
    }

    if (type === 'public' && isVerified) {
        return <Navigate to="/" />;
    }

    if (type === 'admin' && (!isVerified || !isAdmin())) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};


AuthRoute.propTypes = {
    type: PropTypes.oneOf(['protected', 'public', 'admin']).isRequired,
};
