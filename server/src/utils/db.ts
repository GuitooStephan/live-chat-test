import mongoose from 'mongoose';

import config from '../config.json';

async function connectToDB() {
    try {
        const url = config.MONGODB_URI;

        await mongoose.connect( url , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        process.exit(1);
    }
}

export {
    connectToDB
};
