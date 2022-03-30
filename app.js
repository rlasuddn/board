const express = require("express");
const app = express();
const port = 3000;
const postRouter = require("./routes/posts");
const UserRouter = require("./routes/user");
const CommentRouter = require("./routes/comments");
const helmet = require("helmet");
const connect = require("./schema"); //몽고디비와 연결
require("dotenv").config();
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//x-powered-by 숨기기
app.disable("x-powered-by");
//라우터 사용
app.use("/", [postRouter, UserRouter, CommentRouter]);
// ejs 사용
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
//전체 조회(메인)
app.get("/", (req, res) => {
  res.redirect("/post");
});
//상세조회
app.get("/detail/:id", (req, res) => {
  let id = req.params;
  res.render("detail", { id });
});
//게시물생성
app.get("/create", (req, res) => {
  res.render("create");
});
//회원가입
app.get("/join", (req, res) => {
  res.render("join");
});
//로그인
app.get("/login", (req, res) => {
  res.render("login");
});

module.exports = app;
