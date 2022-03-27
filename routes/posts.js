const express = require("express")
const Post = require("../schema/post")
const router = express.Router()
const moment = require("moment")
const bcrypt = require("bcrypt")
const LoginCheck = require("../middlewares/login-check")


//전체 조회
router.get("/post",async(req,res)=>{
    const post = await Post.find().sort({date: -1}) //날짜 내림차순
    res.render('update_index',{post}) // ejs를 렌더링, post를 넘겨준다.
})
//게시글생성
router.post("/create",LoginCheck,async(req,res)=>{
    const {user} = res.locals
    const {title,pw,content} = req.body  //body에서 값을 받아온다.
    const date = moment().format("YYYY-MM-DD HH:mm:ss") //날짜를 변경해준다.
    const bcryptPw = bcrypt.hashSync(pw,10)
    const CreatePost = await Post.create({title, name:user.nickname, pw:bcryptPw, content, date}) //게시글을 받아온 값으로 생성한다.
    res.json({result : "success"}) //응답을 보낸다.
})
//상세조회
router.get("/views/:id",async(req,res)=>{
    const {id} = req.params //파라미터를 받고
    const post = await Post.findOne({id})//빋아온 값이 있는 데이터를 찾아온다.
    res.json({post:{
        content:post.content,
        date:post.date,
        name:post.name,
        title:post.title
    }}) //응답으로 데이터를 보낸다.
})
//게시글수정
router.patch("/update/:id",async(req,res)=>{
    const{title,pw,content} = req.body //변경할 내용을 받아온다.
    const{id} = req.params //파라미터에 값을 받아온다.
    const date = moment().format("YYYY-MM-DD HH:mm") //날짜를 변경해준다.
    const post = await Post.findOne({id:id})//받아온 값이 있는 데이트를 찾아온다.
    if(bcrypt.compareSync(pw,post.pw)){
        await Post.updateOne({id},{$set:{title:title,content:content,date:date}}) //그 데이터를 업데이트해준다.
        res.json({result:"success"})   
        }else{
            res.status(400).json({result:"fail"})
        }
})
//게시글 삭제
router.delete("/delete/:id",async(req,res)=>{
    const{id} = req.params         
    const{content,pw} = req.body
    const post = await Post.findOne({id,content}) //받아온 값이 있는 데이터를 찾아온다.

    if(bcrypt.compareSync(pw,post.pw)){
        await Post.deleteOne({id})   //있다면 해당 데이터를 삭제해준다.
        res.json({result:"success"})
    }else{
        res.json({result:"fail"})
    }
})

module.exports = router;