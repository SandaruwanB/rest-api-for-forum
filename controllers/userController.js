const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const users = require('../models/userModel');
const userDetails = require('../models/userDetals');
const posts = require('../models/postDetails');

dotenv.config({path : '../config.env'});

module.exports.changePassword = (req,res)=>{
    const email = req.body.email;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;

    users.findOne({email : email}).then(user=>{
        bcrypt.compare(oldPass, user.password).then(result=>{
            if(result){
                bcrypt.genSalt(10, ((err,salt)=>{
                    bcrypt.hash(newPass, salt, (err, hashPass)=>{
                        users.findOneAndUpdate({email : email}, {$set : {password : hashPass}}).then(()=>{
                            res.json({result : 'success'});
                        })
                    })
                }))
            }
            else{
                res.json({result : 'pass'});
            }
        })
    })
}

module.exports.getUserCategory = (req,res)=>{
    const email = req.body.email;
    
    users.findOne({email : email}).then(user=>{
        try{
            userDetails.find({id : user._id}).then(details=>{
                res.json({details});
            })
        }
        catch(e){
            res.json({result : 'notFound'});
        }
    });
}

module.exports.getFollowers = (req,res)=>{
    const email = req.body.email;
    
    users.findOne({email : email}).then(user=>{
        try {
            userDetails.findOne({id : user._id}).then(details=>{
                res.json({followers : details.followers})
            }).catch(err=>{
                res.json({result : "notFound"});
            })

        } catch (error) {
            res.json({result : "notFound"});
        }
    })
}

module.exports.getUserDetails = (req,res)=>{
    const email = req.params.id.replace(':', '');
    
    users.findOne({email : email}).then(user=>{
        try {
            userDetails.findOne({id : user.email}).then(details=>{
                res.json({details : details, user : user})
            });

        } catch (error) {
            res.json({details : "notFound", user : user});
        }
    })
}


module.exports.getUserDetailsCheck = (req,res)=>{
    const email = req.params.id.replace(':', '');
    userDetails.findOne({id : email}).then(user=>{
        posts.find({userid : email}).sort({postDate : 'desc'}).then(posts=>{
            res.json({user : user, posts : posts});
            console.log(posts);
        })
    })
}

module.exports.setDP = (req,res)=>{
    const image = req.body.image;
    const user = req.body.user;
    const bufImage = image.toString();
    userDetails.findOneAndUpdate({id : user}, {$set : {image : bufImage}}).then(()=>{
        res.send({result : "success"});
        console.log("updated");
    });
}

module.exports.follow = (req,res)=>{
    const followers = req.body.followed;
    const user = req.body.user;
    const follower = req.body.follower;

    userDetails.findOneAndUpdate({id : user}, {$set : {followers : followers}}).then(()=>{
        userDetails.findOneAndUpdate({id : follower}, {$push : {following : user}}).then(()=>{
            res.json({result : 'success'});
        })
    })
    console.log(followers);
}