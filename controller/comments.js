const Comment = require("../schema/comment");

async function ShowComments(req, res) {
  // #swagger.description = "여기는 코멘트를 보여주는 곳 입니다."
  // #swagger.tags = ["Comment"]
  // #swagger.summary = "댓글 조회"
  try {
    const { postid } = req.params;
    //해당 포스트에 적힌 댓글을 찾는다.
    const comments = await Comment.find({ postid });
    res.status(200).json({
      comments,
    });
  } catch (err) {
    res.status(404).send({ result: "fail" });
  }
}

async function WriteComments(req, res) {
  // #swagger.description = "여기는 코멘트를 작성하는 곳 입니다."
  // #swagger.tags = ["Comment"]
  // #swagger.summary = "게시물 작성"
  try {
    //로그인검사 미들웨어를 사용하여 locals에 user정보를 받아온다.
    const { user } = res.locals;
    const { comment } = req.body;
    const { postid } = req.params;
    //로그인한 유저의 이름과 해당 포스트의 id를 같이 생성한다.
    await Comment.create({ postid, comment, name: user.nickname });
    res.status(200).json({
      Message: "success",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      Message: "Please enter it.",
    });
  }
}

async function DeleteComments(req, res) {
  // #swagger.description = "여기는 코멘트를 삭제하는 곳 입니다."
  // #swagger.tags = ["Comment"]
  // #swagger.summary = "댓글 삭제"
  try {
    const { id } = req.body;
    await Comment.deleteOne({ id });
    res.status(200).json({
      Message: "success",
    });
  } catch (err) {
    res.status(400).json({
      Message: "error",
    });
  }
}

async function UpdateComments(req, res) {
  // #swagger.description = "여기는 코멘트를 수정하는 곳 입니다."
  // #swagger.tags = ["Comment"]
  // #swagger.summary = "댓글 수정"

  const { id, comment } = req.body;
  //내용이 없으면 수정이 불가능 하다.
  if (comment === "") {
    res.status(200).json({
      Message: "Please enter it.",
    });
    return;
  }
  try {
    //댓글의 id를 찾는다.
    const comments = await Comment.findOne({ id });
    //댓글이 있으면 해당 댓글id의 comment를 변경한다.
    if (comments) {
      await Comment.updateOne({ id }, { $set: { comment } });
      res.status(200).send({
        Message: "success",
      });
    }
  } catch (err) {
    res.status(404).send({ result: "fail" });
  }
}

async function FindUserName(req, res) {
  // #swagger.description = "여기는 코멘트의 유저를 찾는 곳 입니다."
  // #swagger.tags = ["Comment"]
  // #swagger.summary = "댓글 유저 찾기"
  try {
    const { user } = res.locals;
    res.status(200).json({
      nickname: user.nickname,
    });
  } catch (err) {
    res.status(404).send({ result: "fail" });
  }
}

module.exports = { ShowComments, WriteComments, DeleteComments, UpdateComments, FindUserName };
