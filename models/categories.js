const mongoose = require("mongoose");
const dbConnection = require('../database/connection');

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    }
});

const category = mongoose.model("category", categorySchema);
module.exports = category;