import http from 'http';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import { Server, Socket } from 'socket.io';

import { connectToDB } from './utils/db';
import { UserController, joinApp, leaveApp } from './controllers/users';
import { ChatController, joinRoom, sendMessageInRoom } from './controllers/chat';
import ValidationError from './errors/validation_error';

import config from './config.json';


connectToDB();

const app = express();

app.use( json() );
app.use( urlencoded() );
app.use( cors() );
app.use( helmet() );

app.use( '/healthcheck', async ( req, res ) => {
    res.status( 200 ).json( { message: 'ok' } );
} );

// error handling
app.use( ( error: any, req: any, res: any, next: any ) => {
    if ( error instanceof ValidationError ) {
        return res.status( 400 ).json( { message: error.message } );
    }

    return res.status( 500 ).json( { message: error.message } );
} );

const server = http.createServer( app );

const io = new Server( server, {
    cors: {
        origin: config.CLIENT_URL,
        methods: ["GET", "POST"]
    }
} );

app.set('socketio', io);

io.on( 'connection', ( socket: Socket ) => {
    socket.emit( 'connectedApp', null );

    socket.on( 'joinApp', async ( data: any, cb: any ) => {
        await joinApp( data, socket, io );
    } );

    socket.on( 'joinRoom', async ( data: any, cb: any ) => {
        await joinRoom( data, socket, io );
    } );

    socket.on( 'sendMessageInRoom', async ( data: any, cb: any ) => {
        await sendMessageInRoom( data, socket, io );
    } );

    socket.on( 'disconnect', async () => {
        await leaveApp( socket, io );
    } );
} );

app.use( '/api/v1/', [ UserController, ChatController ] );

server.listen( config.PORT || 8080 );

export default server;
