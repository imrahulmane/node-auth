const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = process.env.DB_CONNECTION + "://"+ process.env.DB_HOST + ":" + process.env.DB_PORT + '/' + 'auth';

const InitiateMongoServer = () => {
    try{
        mongoose.connect(dbURL, {
            useNewUrlParser : true
        })
        console.log(`Connected to DB =>  ${dbURL}`);
    }catch (e) {
        console.log(e);
        exit(1);
    }
}

module.exports = InitiateMongoServer;