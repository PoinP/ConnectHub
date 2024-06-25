const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Connection failed", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
