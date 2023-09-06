const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const getUser = asyncHandler(async (req, res) => {
    let id = req.params.id;
    let user = await User.findOne({_id : id});
    
    if(user == null){
        return res.status(400).json({'msg': 'User Not Found'});
    }

    return res.status(200).json(user);
});

const getAllUsers = asyncHandler(async (req, res) => {
    let users = await User.find({});

    if(Array.isArray(users) && users.length == 0){
        return res.status(400).json({'msg' : 'users not found'});
    }
    
    return res.status(200).json(users);
})

 

module.exports = {getUser, getAllUsers};