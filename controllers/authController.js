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
            res.json({result : "found"});
        }
        else{
            res.json({result : "notfound"});
        }
    });
}


module.exports.signUp = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    users.findOne({email : email}).then(result=>{   
        if(result === null){
            bcrypt.genSalt(10, ((err,salt)=>{
                bcrypt.hash(password, salt, (err, hash)=>{
                    const user = new users({
                        email : email,
                        password : hash,
                        verified : false,
                        authToken : "",
                        role : "user",
                    });
                    user.save().then(()=>{
                        res.json({result : "success"});
                    })
                });
            }));
        }
        else{
            res.json({result : 'available'});
        }
    })
}


module.exports.passwordReset = (req,res)=>{

}


module.exports.sendVerificationKey = (req,res)=>{
    console.log(req.body);
}