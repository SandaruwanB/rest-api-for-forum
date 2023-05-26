const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const users = require('../models/userModel');

dotenv.config({path : '../config.env'});

const mailAddress = process.env.PROJECT_EMAIL;
const mailPassword = process.env.EMAIL_PASSWORD;
const mailConfig = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : mailAddress,
        pass : mailPassword,
    }
});


module.exports.signIn = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    users.findOne({email : email}).then(result=>{
        if(result){
            if(result.verified === true){
                bcrypt.compare(password, result.password).then((final)=>{
                    if(final){
                        if(result.role === "user"){
                            res.json({result : "user"});
                        }
                        else{
                            res.json({result : "admin"});
                        }
                    }
                    else{
                        res.json({result : 'password'});
                    }
                });
            }
            else{
                res.json({result : "notfound"});
            }
        }
        else{
            res.json({result : "notfound"});
        }
    });
}


module.exports.signUp = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const value = Math.floor(Math.random()*90000) + 10000;

    users.findOne({email : email}).then(result=>{   
        if(result === null){
            bcrypt.genSalt(10, ((err,salt)=>{
                bcrypt.hash(password, salt, (err, hashpass)=>{                    
                    const user = new users({
                        email : email,
                        password : hashpass,
                        verified : false,
                        verification : value,
                        role : "user",
                    });   
                    sendMail(email, value);                 
                    user.save().then(()=>{
                        res.json({result : "success"});
                    })
                });
            }));
        }
        else{
            if(result.verified === false){
                bcrypt.genSalt(10, ((err, salt)=>{
                    bcrypt.hash(password, salt, (err, hashpass)=>{
                        sendMail(email, value);
                        users.findOneAndUpdate({email : email},{$set : {password : hashpass, verification : value}}).then(()=>{
                            res.json({result : "success"});
                        })
                    })
                }))
            }
            else{
                res.json({result : "available"});
            }
        }
    })
}

module.exports.verify = (req,res)=>{
    const user = req.body.user;
    const token = req.body.token;

    users.findOne({email : user}).then(result=>{
        if(result.verification === token){
            users.findOneAndUpdate({email : user}, {$set : {verified : true}}).then(()=>{
                res.json({result : 'correct'});
            });
        }
        else{
            res.json({result : "invalid"});
        }
    })
}


module.exports.passwordReset = (req,res)=>{
    const value = Math.floor(Math.random()*90000) + 10000;
    res.json({value : value});
}


module.exports.sendVerificationKey = (req,res)=>{
    console.log(req.body);
}



const sendMail = async (email, token)=>{
    await mailConfig.sendMail({
        from : '"EduPro" <edupro.org@gmail.com>',
        to : email,
        subject : "Verification Key",
        text : "Verification key is " + token,
        headers : {
            'X-Entity-Ref-ID': 'readonlyemail',
            'Content-Type': 'message/rfc822',
            'Content-Disposition': 'inline',
            'Content-Transfer-Encoding': '7bit',
        }
    })
}