const express = require("express");
const route = express.Router();
const { signIn, signUp, sendVerificationKey, passwordReset, verify } = require("../controllers/authController");
const { changePassword, getUserCategory, getFollowers, getUserDetails, getUserDetailsCheck, setDP, follow } = require("../controllers/userController");
const { addCatogoryDetail, getCategory } = require("../controllers/categoryController");
const { quickPost, post, getPosts, getSpecificPosts, setStar, getPost, comment } = require("../controllers/postController"); 
const { getNotifications } = require("../controllers/notificationController");

route.get("/", (req,res)=>{
    res.send("working");
});
route.get('/getcategory', getCategory);
route.get('/posts', getPosts)
route.get('/user/:id', getUserDetails);
route.get('/userdetails/:id', getUserDetailsCheck);
route.get('/getnotifications/:id', getNotifications);
route.get('/getpost/:id', getSpecificPosts);
route.get('/post/:id', getPost);

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
route.post('/setdp', setDP);
route.post('/addStar', setStar);
route.post('/follow', follow);
route.post('/comment', comment);

module.exports = route;