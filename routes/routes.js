const express = require("express");
const route = express.Router();
const { signIn, signUp, sendVerificationKey, passwordReset, verify } = require("../controllers/authController");

route.get("/", (req,res)=>{
    res.send("working");
});

route.post('/login', signIn);
route.post('/register', signUp);
route.post('/sendverify', sendVerificationKey);
route.post('/verify', verify);
route.post('/test', passwordReset);


module.exports = route;