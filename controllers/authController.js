const users = require('../models/userModel');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

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
            res.json({result : "found"});
        }
        else{
            res.json({result : "notfound"});
        }
    });
}


module.exports.signUp = (req,res)=>{
    mailConfig.sendMail({
        from : mailAddress,
        to : 'sandaruwanbandara.dev@gmail.com',
        subject : 'test2',
        text : 'this is test mail',
    }, (err, info)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(info);
        }
    })
}


module.exports.passwordReset = (req,res)=>{

}


module.exports.resendVerificationKey = (req,res)=>{

}