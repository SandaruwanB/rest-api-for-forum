const mongoose = require("mongoose");
const dbConnection = require('../database/connection');

const userDetailsSchema = new mongoose.Schema({
    id : {
        type : String,
        require : true,
        unique : true,
    },
    image : {
        type : String,
    },
    name : {
        type : String,
        require : true,
    },
    contact : {
        type : String,
    },
    address : {
        type : String,
    },
    sex : {
        type : String,
    },
    industry : {
        type : String,
    },
    jobTitle : {
        type : String,
    },
    category : [],
    followers : [],
    following : [],
});

const userDetails = mongoose.model("userDetails", userDetailsSchema);
module.exports = userDetails;
