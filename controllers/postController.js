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
    const image = req.body.image;
    const user = req.body.user;
    const category = req.body.category;
    const postHeading = req.body.postHeading;
    const textPost = req.body.textPost;

    const buffImg = image.toString();

    const post = new posts({
        userid : user,
        post : [{
            title : postHeading,
            category : category,
            image : buffImg,
            text : textPost,
        }]
    });
    post.save().then(()=>{
        res.json({result : "success"});
    })
}

module.exports.getPosts = (req,res)=>{
    posts.find({}).then(result=>{
        res.json({result : result});
    });
}