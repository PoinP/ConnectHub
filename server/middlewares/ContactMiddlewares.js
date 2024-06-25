const uniqid = require('uniqid'); 

function generateId (req, res, next) {
    req.contactId = uniqid();
    next();
}

module.exports = {generateId};