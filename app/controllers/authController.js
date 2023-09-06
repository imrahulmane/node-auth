const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { getAccessToken, getRefreshToken, verifyRefreshToken} = require('../helpers/jwtHelper');

const signup = asyncHandler(async (req, res, next) => {
    let {...data} = req.body;
    const user = new User(data);

    let userExist = await User.exists({'$or' : [{email : user.email}, {userName : user.username}]});
    
    if(userExist !== null){
        return res.json('Email Already Exists');
    }

    let userData = await user.save();

    return res.status(200).json({'message' : 'User Registered Successfully'});
});

const signin = asyncHandler(async(req, res) => {
    let {...data} = req.body;
    const user = new User(data);

    let userData = await User.findOne({email : user.email});

    if(userData == null){
        return res.status(400).json({'msg' : "user not found"});
    }

    let passwordMatched = user.isValidPassword(userData.password);

    if(!passwordMatched){
        return res.status(400).json({'msg' : "Wrong Password Entered"});
    }
    
    const aceessToken = getAccessToken({email : userData.email, id : userData._id});
    const refreshToken = getRefreshToken({email : userData.email, id : userData._id});

    return res.status(200).json({'aceessToken' : aceessToken, 'refreshToken' : refreshToken});
});

const getToken = asyncHandler(async (req, res) => {
    const {refreshToken} = req.body;
    
    if(!refreshToken){
        return res.status(400).json({'msg': 'invalid refresh token'});
    }

    const payload = await verifyRefreshToken(refreshToken);
    
    if(payload.message){
        return res.status(400).json(payload);
    }

    const user = User.findOne({email : payload.email, id : payload.id});

    if(!user){
        return res.status(400).json({'msg' : 'Bad Request/Invalid Token'});
    }

    const accessToken = getAccessToken(payload);
    const newRefreshToken = getRefreshToken(payload);

    return res.status(200).json({'aceessToken' : accessToken, 'refreshToken' : newRefreshToken});
})

module.exports = {signup, signin, getToken};
