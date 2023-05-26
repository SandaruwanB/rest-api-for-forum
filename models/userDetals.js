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
    }
});

const userDetails = mongoose.model("userDetails", userDetailsSchema);
module.exports = userDetails;
