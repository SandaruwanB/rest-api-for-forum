const mongoose = require("mongoose");
const dbConnection = require('../database/connection');

const notificationsSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    }, 
    actionBy : {
        type : String,
        required : true,
    },
    notification : {
        type : String,
        Required : true,
    },
    readFlag : {
        type : Boolean,
        required : true,
        default : false
    },
    date : {
        type : Date,
        default : Date.now,
    }
});

const notifications = mongoose.model("notifications", notificationsSchema);
module.exports = notifications;