const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAccessToken = ((payload) => {
    const options = {
        expiresIn : '15m'
    }
    return jwt.sign(payload, process.env.ACEES_TOKEN_SECRET, options);
})

const getRefreshToken = ((payload) => {
    const options = {
        expiresIn : '90d'
    }
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, options);
})

const verifyRefreshToken = (expressAsyncHandler(async (refreshToken) => {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if(err){
            return {'message' : err.message};
        }else{
            
            return {'id' : payload.id, 'email':payload.email};
        }
    });

}))

module.exports = {getAccessToken, getRefreshToken, verifyRefreshToken};