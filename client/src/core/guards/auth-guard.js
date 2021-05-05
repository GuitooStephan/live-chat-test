import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthGuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route { ...rest } render={ props => (
        auth ? <Redirect to='/chat' /> : <Component {...props} /> 
    )} />
)

export default AuthGuardedRoute;
