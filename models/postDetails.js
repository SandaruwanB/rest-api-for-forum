const mongoose = require("mongoose");
const dbConnection = require('../database/connection');

const postSchema = new mongoose.Schema({
    userid : {
        type : String,
        require : true,
    },
    visibility : {
        type : String,
        require : true,
        default : true,
    },
    post : [{
        title : {
            type : String,
        },
        image : {
            type : String,
        },
        text : {
            type : String,
        },
        category : {
            type : String,
            require : true,
        },
        postDate : {
            type : Date,
            default : Date.now,
        },
        starred : [],
        comments : [{
            commenterId : {
                type : String,
                required : true,
            },
            comment : {
                type : String,
                required : true,
            },
            commentDate : {
                type : Date,
                default : Date.now,
            },
            replyComment : [{
                replyCommentorId : {
                    type : String,
                    require : true,
                },
                replyComment : {
                    type : String,
                    require : true,
                },
                replyCommentDate : {
                    type : Date,
                    default : Date.now,
                }
            }]
        }]
    }],
    postDate : {
        type : Date,
        default : Date.now,
    }
});

const posts = mongoose.model("posts", postSchema);
module.exports = posts;