const mongoose = require("mongoose");
const dbConnection = require('../database/connection');


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    authToken : {
        type : String,
    },
    verified : {
        type : Boolean,
        required : true,
    },
    role : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

const users = mongoose.model("Users", userSchema);
module.exports = users;