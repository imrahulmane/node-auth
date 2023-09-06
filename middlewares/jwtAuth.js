const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../app/models/userModel');

const verifyAccessToken = (expressAsyncHandler(async (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).json({'msg': 'No Access Token Provided'});
    }
    
    const accessToken = req.headers.token || req.headers.authorization.split(' ')[1];

    const data = await jwt.verify(accessToken, process.env.ACEES_TOKEN_SECRET);
    console.log(data);
    if(!data){
        return res.json({'msg' : 'invalid token'});
    }
    
    const user = User.findOne({email : data.email, id : data.id});

    if(!user){
        return res.json({'msg' : 'Bad Request/Invalid Token'});
    }
    
    req.userEmail = data.email;
    req.id = data.id;
    next();

}))

module.exports = verifyAccessToken;