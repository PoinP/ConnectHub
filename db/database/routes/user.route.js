const express = require('express');
const User = require('../model/product.model.js');
const router = express.Router();
const {getUsers,getUser, createUser, deleteUser, updateUser, searchUsers} = require('../controller/user.controller.js');

router.use(express.json());

router.get('/search', searchUsers);

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);



module.exports = router;