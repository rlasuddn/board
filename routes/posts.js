const express = require("express");
const router = express.Router();
const LoginCheck = require("../middlewares/login-check");
const Controller = require("../controller/posts");

//전체 조회
router.get("/", Controller.ShowPost);
//게시글생성
router.post("/create", LoginCheck, Controller.CreatePost);
//상세조회
router.get("/views/:id", Controller.DetailPost);
//게시글수정
router.patch("/update/:id", Controller.UpdatePost);
//게시글 삭제
router.delete("/delete/:id", Controller.DeletePost);

module.exports = router;
