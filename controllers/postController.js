const posts = require("../models/postDetails");

module.exports.quickPost = (req,res)=>{
    const postText = req.body.postContent;
    const user = req.body.user;
    const category = req.body.category;

    const quickPost = new posts({
        userid : user,
        post : [{
            text : postText,
            category : category,
        }]
    });
    quickPost.save().then(()=>{
        res.json({result : "success"});
    });
}

module.exports.post = (req,res)=>{
    console.log(req.body);
}