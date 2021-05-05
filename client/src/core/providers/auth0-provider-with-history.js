import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import config from '../../config.json';

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = config.AUTH0_DOMAIN;
    const clientId = config.AUTH0_CLIENT_ID;
    const audience = config.AUTH0_AUDIENCE;

    const history = useHistory();

    const onRedirectCallback = ( appState ) => {
        history.push( appState?.returnTo || window.location.pathname );
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            audience={audience}
            redirectUri={`${window.location.origin}/`}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;