const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/user.route.js');

dotenv.config();


app.use(express.json());


app.use("/phonebookDB/users", router);


mongoose.connect(process.env.DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000/phonebookDB/users');
    });
})
.catch((error) => {
    console.error('Connection failed', error);
});