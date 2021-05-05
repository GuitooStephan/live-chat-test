import React from 'react';
import { Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loader from '../../components/Loader';

const UnAuthGuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        component={withAuthenticationRequired(Component, {
            onRedirecting: () => <Loader />,
        })}
        {...rest}
    />
)

export default UnAuthGuardedRoute;
