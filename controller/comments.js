const Comment = require("../schema/comment");

async function ShowComments(req, res) {
  const { postid } = req.params;
  //해당 포스트에 적힌 댓글을 찾는다.
  const comments = await Comment.find({ postid });
  res.send({
    comments,
  });
}

async function WriteComments(req, res) {
  try {
    //로그인검사 미들웨어를 사용하여 locals에 user정보를 받아온다.
    const { user } = res.locals;
    const { comment } = req.body;
    const { postid } = req.params;
    //로그인한 유저의 이름과 해당 포스트의 id를 같이 생성한다.
    await Comment.create({ postid, comment, name: user.nickname });
    res.send({
      Message: "success",
    });
  } catch (e) {
    console.log(e);
    res.status(401).send({
      Message: "Please enter it.",
    });
  }
}

async function DeleteComments(req, res) {
  try {
    const { id } = req.body;
    await Comment.deleteOne({ id });
    res.send({
      Message: "success",
    });
  } catch (err) {
    res.send({
      Message: "error",
    });
  }
}

async function UpdateComments(req, res) {
  const { id, comment } = req.body;
  //내용이 없으면 수정이 불가능 하다.
  if (comment === "") {
    res.send({
      Message: "Please enter it.",
    });
    return;
  }
  //댓글의 id를 찾는다.
  const comments = await Comment.findOne({ id });
  //댓글이 있으면 해당 댓글id의 comment를 변경한다.
  if (comments) {
    await Comment.updateOne({ id }, { $set: { comment } });
    res.send({
      Message: "success",
    });
  }
}

async function FindUserName(req, res) {
  const { user } = res.locals;
  res.send({
    nickname: user.nickname,
  });
}

module.exports = { ShowComments, WriteComments, DeleteComments, UpdateComments, FindUserName };
