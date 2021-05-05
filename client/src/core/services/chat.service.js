import io from 'socket.io-client';
import { post } from './api.service';

import config from '../../config.json';

let socket;

export const connect = () => {
    socket = io( config.SERVER_URL );
    return socket;
};

export const joinApp = email => {
    socket.emit( 'joinApp', { email } );
};

export const disconnect = () => {
    if ( socket ) {
        socket.off();
    }
};

export const getSocket = () => {
    if ( socket && socket.disconnected ) {
        socket = socket = io( config.SERVER_URL );
    }
    return socket;
};

export const joinRoom = name => {
    socket.emit( 'joinRoom', { name } );
};

export const sendMessageToRoom = data => {
    socket.emit( 'sendMessageInRoom', data );
} 


// Https Requests
export const fetchRoom = payload => {
    const url = `/rooms`;
    return post( url, payload );
};
