import mongoose from 'mongoose';
import { User, IUser, UserDocument } from './users';

import { v4 as uuidv4 } from 'uuid';

export interface IMessage {
    text: string;
    user: mongoose.Types.ObjectId | UserDocument
}

const messageSchema = new mongoose.Schema(
    {
        text: { type: String, trim: true },
        user: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
)


export interface IRoom {
    name: string;
    participants: mongoose.Types.ObjectId[] | UserDocument[];
    messages: IMessage[];
    createdAt: Date;
}

interface RoomBaseDocument extends IRoom, mongoose.Document { }

export interface RoomDocument extends RoomBaseDocument {
    participants: mongoose.Types.ObjectId[];
}

// Export this for strong typing
export interface RoomPopulatedDocument extends RoomBaseDocument {
    participants: UserDocument[];
}

// For model
export interface RoomModel extends mongoose.Model<RoomDocument> {
    getOrCreate(participantOneId: string, participantTwoId: string): Promise<RoomPopulatedDocument>
}


const roomSchema = new mongoose.Schema<RoomDocument, RoomModel>({
    name: { type: String, unique: true, trim: true },
    messages: [messageSchema],
    participants: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

roomSchema.statics.getOrCreate = async function( participantOneId, participantTwoId ){
    let room = await this.findOne( { } ).where( 'participants' ).all( [ participantOneId, participantTwoId ] );
    if ( !room ){
        const name = uuidv4();
        room = await this.create( { name, participants: [ participantOneId, participantTwoId ] } );
    }
    return room;
}

const Room = mongoose.model<RoomDocument, RoomModel>('Room', roomSchema);

export {
    Room
}
