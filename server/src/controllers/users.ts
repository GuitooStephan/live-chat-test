import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import Joi from 'joi';

import { User } from '../db/models/users';
import { validate } from '../utils/validator';

const config = require( '../config.json' );

const UserController = Router();

UserController.post('/users', authMiddleware, async (req, res, next) => {
    try {
        const schema = Joi.object().keys( {
            email: Joi.string().required().email(),
            name: Joi.string().required(),
            picture: Joi.string().optional()
        } );

        const value = validate( req.body, schema );

        const user = await User.getOrCreate( value );
        return res.status(200).json( user );
    } catch ( error ) {
        next(error);
    }
});

// Get Users Online
UserController.get( '/users/:id/active_users', authMiddleware, async( req, res, next ) => {
    try {
        const { id } = req.params;

        const user = await User.findOne( { _id : id } );

        if ( !user ) {
            return res.status(400).json( 'User not found' );
        }

        const activeUsers = await User.find( { socketId: { $ne: '' }, _id: {$ne: user?._id} } ).where( 'blockedUsers' ).ne( user._id );
        return res.status(200).json( activeUsers );
    } catch ( error ) {
        next(error);
    }
} );


// Block Users
UserController.post( '/users/:id/block', authMiddleware, async( req, res, next ) => {
    try {
        const { id } = req.params;
        const user = await User.findOne( { _id : id } );
        if ( !user ) {
            return res.status(400).json( 'User not found' );
        }

        const schema = Joi.object().keys( {
            id: Joi.string().required()
        } );

        const value = validate( req.body, schema );
        const updatedUser = await User.findByIdAndUpdate( { _id: id }, { $push: { blockedUsers: value.id } }, { new: true } );

        let io = req.app.get('socketio');
        io.to( config.APP_NAME ).emit( 'appUsersUpdate', null );

        return res.status(200).json( updatedUser );
    } catch ( error ) {
        next(error);
    }
} )


// Unblock Users
UserController.post( '/users/:id/unblock', authMiddleware, async( req, res, next ) => {
    try {
        const { id } = req.params;
        const user = await User.findOne( { _id : id } );
        if ( !user ) {
            return res.status(400).json( 'User not found' );
        }

        const schema = Joi.object().keys( {
            id: Joi.string().required()
        } );

        const value = validate( req.body, schema );
        const updatedUser = await User.findByIdAndUpdate( { _id: id }, { $pullAll: { blockedUsers: [ value.id ] } }, { new: true } );

        let io = req.app.get('socketio');
        io.to( config.APP_NAME ).emit( 'appUsersUpdate', null );

        return res.status(200).json( updatedUser );
    } catch ( error ) {
        next(error);
    }
} )



// On Join App
const joinApp = async ( data: any, socket: any, io: any ) => {
    const user = await User.findOne( { email : data.email } );
    if ( !user ) {
        socket.emit( 'error', { error : 'User does not exist' } );
        return;
    }

    socket.join( config.APP_NAME );

    await User.updateOne( { email: data.email }, { socketId: socket.id } );
    socket.emit( 'joinedApp', null );
    io.to( config.APP_NAME ).emit( 'appUsersUpdate', null );
}

// On Leave App
const leaveApp = async ( socket: any, io: any ) => {
    const user = await User.findOne( { socketId : socket.id } );
    if ( !user ) {
        socket.emit( 'error', { error : 'User does not exist' } );
        return;
    }

    await User.updateOne( { socketId : socket.id }, { socketId : '' } );
    io.to( config.APP_NAME ).emit( 'appUsersUpdate', null );
}

export {
    UserController,
    joinApp,
    leaveApp
};
