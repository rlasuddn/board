const express = require("express")
const router = express.Router()
const Comment = require("../schema/comment")
const LoginCheck = require("../middlewares/login-check")

router.get('/comments/:postid',async(req,res)=>{
    
    const{postid} = req.params
    const comments = await Comment.find({postid})
    res.send({
        comments
    })
})

router.post('/comments/:postid',LoginCheck,async(req,res)=>{
    try{
        const{user} = res.locals
        const{comment} = req.body
        const {postid} = req.params
        await Comment.create({postid,comment,name:user.nickname})
        res.send({
            Message:"success"
        }) 
    }catch(err){
        res.status(401).send({
            Message:"create"
        })
    }
})

router.delete('/comments',async(req,res)=>{
    try{
        const{commentid} = req.body
        await Comment.deleteOne({id:commentid})
        res.send({
            Message:"success"
        })
    }
    catch(err){
        res.send({
            Message:"error"
        })
    }   
})

router.patch('/comments',async(req,res)=>{
    try{
        const{commentid, comment} = req.body
        const comments = await Comment.findOne({commentid})

        console.log(commentid,comment)
        if(comments){
            await Comment.updateOne({id:commentid},{$set:{comment:comment}})
        
        res.send({
            Message:"success"
        })
    }
    }catch(err){
        res.send({
            Message:"error"
        })
    }   
})

router.get('/user/check',LoginCheck,async(req,res)=>{
    const{user} = res.locals
    
    res.send({user})
})

module.exports = router