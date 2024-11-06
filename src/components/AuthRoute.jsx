/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AuthRoute = ({ type }) => {
    const isAuthenticated = Boolean(
        JSON.parse(localStorage.getItem('user'))?.token
    );
    if (type === 'protected' && !isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (type === 'public' && isAuthenticated) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

AuthRoute.propTypes = {
    type: PropTypes.oneOf(['protected', 'public']).isRequired,
};
export const isLoggedIn = JSON.parse(localStorage.getItem('user'))?.token;