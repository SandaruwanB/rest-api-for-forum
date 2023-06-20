const express = require("express");
const route = express.Router();
const { signIn, signUp, sendVerificationKey, passwordReset, verify } = require("../controllers/authController");
const { changePassword, getUserCategory, getFollowers } = require("../controllers/userController");
const { addCatogoryDetail, getCategory } = require("../controllers/categoryController");

route.get("/", (req,res)=>{
    res.send("working");
});
route.get('/getcategory', getCategory);


route.post('/login', signIn);
route.post('/register', signUp);
route.post('/sendverify', sendVerificationKey);
route.post('/verify', verify);
route.post('/pass', changePassword);
route.post('/test', passwordReset);
route.post('/addcategory', addCatogoryDetail);
route.post('/getusercategory', getUserCategory);
route.post('/getFollowers', getFollowers);

module.exports = route;