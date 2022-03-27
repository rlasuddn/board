const express = require("express")
const router = express.Router()
const Comment = require("../schema/comment")
const LoginCheck = require("../middlewares/login-check")

router.get('/comments/:postid',async(req,res)=>{
    
    const{postid} = req.params
    const comments = await Comment.find({postid}).sort({id:-1})
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
            Message:"Please enter it."
        })
    }
})

router.delete('/comments',async(req,res)=>{
    try{
        const{id} = req.body
        await Comment.deleteOne({id})
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
        const{id, comment} = req.body
        if(comment === ""){
            res.send({
                Message:"Please enter it."
            })
            return
        }
        const comments = await Comment.findOne({id})

        if(comments){
            await Comment.updateOne({id},{$set:{comment}})
        
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