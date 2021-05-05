import mongoose from 'mongoose';
import { User, IUser, UserDocument } from './users';

const crypto = require("crypto");

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
    messages: Array<IMessage>;
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
    name: { type: String, unique: true, trim: true, default: crypto.randomBytes(16).toString("hex") },
    messages: [messageSchema],
    participants: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

roomSchema.statics.getOrCreate = async function( participantOneId, participantTwoId ){
    let room = await this.findOne( { } ).where( 'participants' ).in( [ participantOneId, participantTwoId ] );
    if ( !room ){
        room = await this.create( { participants: [ participantOneId, participantTwoId ] } );
    }
    return room;
}

const Room = mongoose.model<RoomDocument, RoomModel>('Room', roomSchema);

export {
    Room
}
