const express = require("express") 
const app = express()
const port = 3000
const postRouter = require("./routes/posts")
const connect = require("./schema") //몽고디비와 연결
require("dotenv").config()
connect() 

app.use(express.urlencoded({extended : false}))
app.use(express.json())
//라우터 사용
app.use("/post",[postRouter])
// ejs 사용
app.set('views',__dirname+'/views')
app.set('view engine','ejs')
//전체 조회(메인)
app.get('/',(req,res)=>{
    res.redirect('/post')
})
//상세조회
app.get('/detail/:id',(req,res)=>{
    let id = req.params
    res.render('detail', {id:id})
})
//게시물생성
app.get('/create',(req,res)=>{
    res.render('create')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})