const express = require("express");
const router = express.Router();
const membershipForm = require("../middlewares/joi");
const Controller = require("../controller/users");
//회원가입 로그인 양식 미들웨어를 사용해서 유효성 검사를 한다.
router.post("/join", membershipForm, Controller.JoinMembership);
//로그인
router.post("/login", Controller.Login);
module.exports = router;
