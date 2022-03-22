const express = require("express")
const Post = require("../schema/post")
const router = express.Router()
const moment = require("moment")

//전체 조회
router.get("/",async(req,res)=>{
    const post = await Post.find().sort({date: -1}) //날짜 내림차순
    res.render('update_index',{post}) // ejs를 렌더링, post를 넘겨준다.
})
//게시글생성
router.post("/create",async(req,res)=>{
    const {title, name, pw, content} = req.body  //body에서 값을 받아온다.
    const date = moment().format("YYYY-MM-DD HH:mm:ss") //날짜를 변경해준다.
    console.log(date)
    const CreatePost = await Post.create({title, name, pw, content, date}) //게시글을 받아온 값으로 생성한다.
    res.json({result : "success"}) //응답을 보낸다.
})
//상세조회
router.get("/views/:_id",async(req,res)=>{
    const {_id} = req.params //파라미터를 받고
    const post = await Post.findOne({_id:_id})//빋아온 값이 있는 데이터를 찾아온다.
    res.json({post}) //응답으로 데이터를 보낸다.
})
//게시글수정
router.patch("/update/:_id",async(req,res)=>{
    const{title,pw,content} = req.body //변경할 내용을 받아온다.
    const{_id} = req.params //파라미터에 값을 받아온다.
    const date = moment().format("YYYY-MM-DD HH:mm") //날짜를 변경해준다.
    const post = await Post.findOne({_id:_id, pw:pw})//받아온 값이 있는 데이트를 찾아온다.
    if(post){ //데이터가 있으면
        await Post.updateOne({_id},{$set:{title:title,content:content,date:date}}) //그 데이터를 업데이트해준다.
        res.json({result:"success"})    
    }else{                              //응답을 보낸다.
        res.json({result:"fail"})
    }
})
//게시글 삭제
router.delete("/delete/:id",async(req,res)=>{
    const{_id} = req.params         
    const{content,pw} = req.body
    const post = await Post.findOne({_id:_id, content:content, pw:pw}) //받아온 값이 있는 데이터를 찾아온다.
    if(post){
        await Post.deleteOne({_id:_id,pw:pw,content:content})   //있다면 해당 데이터를 삭제해준다.
        res.json({result:"success"})
    }else{                          //응답을 보낸다.
        res.json({result:"fail"})
    }
})

module.exports = router;