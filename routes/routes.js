const express = require("express");
const route = express.Router();
const { signIn, signUp, sendVerificationKey, passwordReset, verify } = require("../controllers/authController");
const { changePassword, getUserCategory, getFollowers } = require("../controllers/userController");
const { addCatogoryDetail, getCategory } = require("../controllers/categoryController");
const { quickPost, post, getPosts } = require("../controllers/postController"); 

route.get("/", (req,res)=>{
    res.send("working");
});
route.get('/getcategory', getCategory);
route.get('/posts', getPosts)

route.post('/login', signIn);
route.post('/register', signUp);
route.post('/sendverify', sendVerificationKey);
route.post('/verify', verify);
route.post('/pass', changePassword);
route.post('/test', passwordReset);
route.post('/addcategory', addCatogoryDetail);
route.post('/getusercategory', getUserCategory);
route.post('/getFollowers', getFollowers);
route.post('/quickPost', quickPost);
route.post('/post', post);

module.exports = route;