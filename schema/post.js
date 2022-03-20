const mongoose = require("mongoose")
const Schema = mongoose.Schema({
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

module.exports = mongoose.model("Post",Schema)