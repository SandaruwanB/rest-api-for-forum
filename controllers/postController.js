const posts = require("../models/postDetails");
const userDetails = require('../models/userDetals');
const category = require('../models/categories');

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
    });
}

module.exports.getPosts = (req,res)=>{
    posts.find({}).sort({postDate : 'desc'}).then(result=>{
        userDetails.find({}).then(users=>{
            res.json({posts : result, users : users});
        })
    });
}

module.exports.getSpecificPosts = (req,res)=>{
    const email = req.params.id.replace(':', '');
    posts.find({userid : email}).sort({postDate : 'desc'}).then(posts=>{
        res.json({posts : posts});
    });
}


module.exports.setStar = (req,res)=>{
    const starred = req.body.starred;
    const post = req.body.post;

    posts.findByIdAndUpdate(post, {$set : { starred : starred}}).then(result=>{
        res.json({result : result});
    })
}

module.exports.getPost = (req,res)=>{
    const postid = req.params.id.replace(':', '');

    posts.findById(postid).then(result=>{
        userDetails.findOne({id : result.userid}).then(user=>{
            res.json({post : result, user : user});
        });
    });    
}

module.exports.comment = (req,res)=>{
    const comment = req.body.comment;
    const by = req.body.by;
    const post = req.body.post;

    userDetails.findOne({id : by}).then(user=>{
        posts.findByIdAndUpdate(post, {$push : {comments : {commenterId : by, comment : comment, userName : user.name}}}).then(()=>{
            res.json({result : "success"});
        })
    })
}

module.exports.removePost = (req,res)=>{
    const id = req.body.id;
    posts.findByIdAndDelete(id).then(()=>{
        res.json({result : "success"});
    })
}