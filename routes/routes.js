const express = require("express");
const route = express.Router();
const { signIn } = require("../controllers/authController");

route.get("/", (req,res)=>{
    res.send("working");
});

route.post('/login', signIn);

module.exports = route;