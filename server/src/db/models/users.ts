import mongoose from 'mongoose';


export interface IUser {
    email: string;
    name: string;
    socketId: String;
    picture: string;
    blockedUsers: mongoose.Types.ObjectId[] | UserDocument[];
    createdAt: Date;
}

export interface UserDocument extends IUser, mongoose.Document { }

// For model
export interface UserModel extends mongoose.Model<UserDocument> {
    getOrCreate(query: any): Promise<UserModel>
}


const userSchema = new mongoose.Schema<UserDocument, UserModel>({
    email: { type: String, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    socketId: { type: String, default: ''},
    picture: { type: String, required: true, trim: true },
    blockedUsers: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

userSchema.statics.getOrCreate = async function( query: any ){
    let user = await this.findOne(query)
    if ( !user ){
        user = await this.create(query)
    }
    return user;
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export {
    User
}
