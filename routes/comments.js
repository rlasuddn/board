const express = require("express");
const router = express.Router();
const LoginCheck = require("../middlewares/login-check");
const Controller = require("../controller/comments");

//댓글 조회
router.get("/comments/:postid", Controller.ShowComments);
//댓글 작성
router.post("/comments/:postid", LoginCheck, Controller.WriteComments);
//댓글 삭제
router.delete("/comments", Controller.DeleteComments);
//댓글 수정
router.patch("/comments", Controller.UpdateComments);

//로그인 체크
router.get("/user/check", LoginCheck, Controller.FindUserName);

module.exports = router;
