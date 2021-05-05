
import { Router } from 'express';
import Joi from 'joi';

import { Room } from '../db/models/rooms';
import { User } from '../db/models/users';
import { validate } from '../utils/validator';
import { authMiddleware } from '../middlewares/auth';

const ChatController = Router();

ChatController.post('/rooms', authMiddleware, async (req, res, next) => {
    try {
        const schema = Joi.object().keys( {
            participantOneId: Joi.string().required(),
            participantTwoId: Joi.string().required()
        } );

        const value = validate( req.body, schema );

        const room = await Room.getOrCreate( value.participantOneId, value.participantTwoId );
        const populatedRoom = await (await room.populate( 'messages' ).populate( 'participants' )).execPopulate();
        return res.status(200).json( populatedRoom );
    } catch ( error ) {
        next(error);
    }
});


// On Join Room
const joinRoom = async ( data: any, socket: any, io: any ) => {
    socket.join( data.name );
    socket.emit( 'joinedRoom', { name: data.name } );
}

// On Text
const sendMessageInRoom = async ( data: any, socket: any, io: any ) => {
    const user = await User.findOne( { _id : data.user } );
    const toUser = await User.findOne( { _id : data.toUser } );

    const message = { text: data.text, user: user };
    const room = await Room.updateOne( { name: data.name }, { $push: { messages: message } } );

    io.to( data.name ).emit( 'sentMessageInRoom', { text: data.text, user: user?._id } );
}


export {
    ChatController,
    joinRoom,
    sendMessageInRoom
}
