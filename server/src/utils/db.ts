import mongoose from 'mongoose';

async function connectToDB() {
    try {
        let url = process.env["MONGODB_URI"] || 'mongodb://mongo:27017';

        await mongoose.connect( url , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log( 'Connected to database.' );
    } catch (err) {
        console.log('Error connecting to database.')
        process.exit(1);
    }
}

export {
    connectToDB
};
