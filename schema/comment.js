const mongoose = require("mongoose")
const autoIdSetter = require('./auto-id-setter');
const Schema = new mongoose.Schema({
    postid:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
})
autoIdSetter(Schema, mongoose, 'Schema', 'id'); //Schema 의 id를 만들어준다.
module.exports = mongoose.model("Comment",Schema)