const mongoose = require("mongoose");
const dbConnection = require('../database/connection');

const categorySchema = new mongoose.Schema({
    
});

const category = mongoose.model("category", categorySchema);
module.exports = category;