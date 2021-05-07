import io from 'socket.io-client';
import { post } from './api.service';

import config from '../../config.json';

let socket;

export const connect = () => {
    if ( ! socket || socket.disconnected  ) {
        socket = io( config.SERVER_URL );
    }
    return socket;
};

export const joinApp = email => {
    socket.emit( 'joinApp', { email } );
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
