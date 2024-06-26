const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const contactRouter = require('./routes/Contact.js');
const searchRouter = require('./routes/Search.js');
const tagRouter = require('./routes/Tag.js');
const userRouter = require('./routes/Users.js');
const connectDB = require('./configs/database.js');

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('avatars'))

// app.use(express.json())

// Routes
app.use("/", contactRouter);
app.use("/", searchRouter);
app.use("/", tagRouter);
app.use("/", userRouter);
// Serever startup

// Uncomment when you download and run mongo
// We need env.variables
connectDB();

app.listen(port, () => {
  console.log(`Phone Book app listening on port ${port}`);
});


// TODO: Remove? Keep for now
// function formatNumber(number) {
//   let plusFlag = false;
//   let numberFlag = false;
//   let formattedNumber = "";

//   let validSymbols = " -0123456789";

//   for (let i = 0; i < number.length; i++) {
//       if (number.charAt(i) == '+') {
//           if (plusFlag || numberFlag)
//               return "";
//           formattedNumber += "+";
//           plusFlag = true;
//       }
//       else if (validSymbols.includes(number.charAt(i))) {
//           if (+number.charAt(i)) {
//               numberFlag = true;
//               formattedNumber += number.charAt(i);
//           }
//       }
//       else {
//           return "";
//       }
//   }
//   return formattedNumber;
// }