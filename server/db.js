const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection failed', error.message);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
