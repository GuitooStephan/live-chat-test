import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <div className="h-100-vh d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader
