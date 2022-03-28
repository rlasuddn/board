const express = require("express")
const router = express.Router()
const Comment = require("../schema/comment")
const LoginCheck = require("../middlewares/login-check")

//댓글 조회
router.get('/comments/:postid',async(req,res)=>{
    const{postid} = req.params
    //해당 포스트에 적힌 댓글을 찾는다.
    const comments = await Comment.find({postid})
    res.send({
        comments
    })
})
//댓글 작성
router.post('/comments/:postid',LoginCheck,async(req,res)=>{
    try{
        //로그인검사 미들웨어를 사용하여 locals에 user정보를 받아온다.
        const{user} = res.locals
        const{comment} = req.body
        const {postid} = req.params
        //로그인한 유저의 이름과 해당 포스트의 id를 같이 생성한다.
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
//댓글 삭제
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
//댓글 수정
router.patch('/comments',async(req,res)=>{
    
        
        const{id, comment} = req.body
        //내용이 없으면 수정이 불가능 하다.
        if(comment === ""){
            res.send({
                Message:"Please enter it."
            })
            return
        }
        //댓글의 id를 찾는다.
        const comments = await Comment.findOne({id})
        //댓글이 있으면 해당 댓글id의 comment를 변경한다.
        if(comments){
            await Comment.updateOne({id},{$set:{comment}})
        
        res.send({
            Message:"success"
        })
    }
})

//로그인 체크
router.get('/user/check',LoginCheck,async(req,res)=>{
    const{user} = res.locals
    
    res.send({user})
})

module.exports = router