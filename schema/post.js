const mongoose = require("mongoose")
const autoIdSetter = require('./auto-id-setter');
const Post = mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true,
    },
    date:{
        type:String,
    },
    pw:{
        type:String,
        required:true,
    }
})
autoIdSetter(Post, mongoose, 'Post', 'id');
module.exports = mongoose.model("Post",Post)