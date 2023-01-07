const express = require('express');

const router = express.Router();

// const User = require('../models/userModel')
const {getAll, getOne, postOne, deleteOne, updateOne} = require('../controllers/userController')

//get all users
router.get('/', getAll)

//get single user
router.get('/:id', getOne)

//create single user
router.post('/', postOne)

//delete user
router.delete('/:id', deleteOne)

//update user
router.patch('/:id', updateOne)

module.exports = router
