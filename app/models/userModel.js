const expressAsyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type:String, required:true
    },
    email : {
        type:String, required:true
    },
    password : {
        type:String, required:true
    }
}, {timestamps : true});

userSchema.pre('save', async function (next) {
    if(this.isNew){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    next()
});

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("user", userSchema);