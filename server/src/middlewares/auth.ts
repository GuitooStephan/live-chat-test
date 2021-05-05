import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const config = require( '../config.json' );


const authMiddleware = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.JWKSURI
    }),

    // Validate the audience and the issuer.
    audience: config.AUDIENCE,
    issuer: [config.ISSUER],
    algorithms: ['RS256']
});

export {
    authMiddleware
}
