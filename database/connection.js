const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path : './config.env'});
const mongoUri = process.env.MONGO_URI;

const dbConnection = mongoose.connect(mongoUri, {
    useNewUrlParser : true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mogo connected");
});

module.exports = dbConnection;