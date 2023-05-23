const express = require("express");
const route = express.Router();
const { signIn, signUp, sendVerificationKey } = require("../controllers/authController");

route.get("/", (req,res)=>{
    res.send("working");
});

route.post('/login', signIn);
route.post('/register', signUp);
route.post('/sendverify', sendVerificationKey);

module.exports = route;