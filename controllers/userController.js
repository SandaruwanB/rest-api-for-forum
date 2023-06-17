const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const users = require('../models/userModel');
const userDetails = require('../models/userDetals');

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
        userDetails.findOne({id : user.id}).then(details=>{
            if(details){
                res.json(details.category);
            }
            else{
                res.json({result : 'notFound'});
            }
        });
    });
}