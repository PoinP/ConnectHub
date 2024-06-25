const express = require('express');
const User = require('../models/Users');
const contactController = require('../controllers/ContactsController');
const bodyParser = require('body-parser');

const app = express();
const posrt = 3000;

app.use(bodyParser.json());

