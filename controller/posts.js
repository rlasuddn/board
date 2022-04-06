const Post = require("../schema/post");
const moment = require("moment");
const bcrypt = require("bcrypt");

async function ShowPost(req, res) {
  // #swagger.description = "여기는 포스트를 보여주는 곳 입니다."
  // #swagger.tags = ["Post"]
  // #swagger.summary = "게시물 조회"

  const post = await Post.find().sort({ date: -1 }); //날짜 내림차순
  res.render("update_index", { post }); // ejs를 렌더링, post를 넘겨준다.
}

async function CreatePost(req, res) {
  // #swagger.description = "여기는 포스트를 생성하는 곳 입니다."
  // #swagger.tags = ["Post"]
  // #swagger.summary = "게시물 생성"
  try {
    const { user } = res.locals;
    const { title, pw, content } = req.body; //body에서 값을 받아온다
    const date = moment().format("YYYY-MM-DD HH:mm:ss"); //날짜를 변경해준다.
    const bcryptPw = bcrypt.hashSync(pw, 10); //비밀번호 암호화
    await Post.create({ title, name: user.nickname, pw: bcryptPw, content, date }); //게시글을 받아온 값으로 생성한다.
    res.status(200).json({ result: "success" }); //응답을 보낸다.
  } catch (err) {
    res.status(400).json({ result: "Please Enter It!!" });
  }
}

async function DetailPost(req, res) {
  // #swagger.description = "여기는 포스트를 삭제하는 곳 입니다."
  // #swagger.tags = ["Post"]
  // #swagger.summary = "게시물 삭제"
  try {
    const { id } = req.params; //파라미터를 받고
    const post = await Post.findOne({ id }); //빋아온 값이 있는 데이터를 찾아온다.
    //응답으로 데이터를 보낸다.
    res.status(200).json({
      post: {
        content: post.content,
        date: post.date,
        name: post.name,
        title: post.title,
      },
    });
  } catch (err) {
    res.status(400).json({ result: "fail" });
  }
}

async function UpdatePost(req, res) {
  // #swagger.description = "여기는 포스트를 수정하는 곳 입니다."
  // #swagger.tags = ["Post"]
  // #swagger.summary = "게시물 수정"
  const { title, pw, content } = req.body; //변경할 내용을 받아온다.
  //수정시 빈값 처리
  if (title === "" || content === "") {
    res.status(200).json({ result: "Please Enter It!!" });
    return;
  }
  try {
    const { id } = req.params; //파라미터에 값을 받아온다.
    const date = moment().format("YYYY-MM-DD HH:mm"); //날짜를 변경해준다.
    const post = await Post.findOne({ id }); //받아온 값이 있는 데이트를 찾아온다.
    if (bcrypt.compareSync(pw, post.pw)) {
      await Post.updateOne({ id }, { $set: { title: title, content: content, date: date } }); //그 데이터를 업데이트해준다.
      res.status(200).json({ result: "success" });
    } else {
      res.status(400).json({ result: "fail" });
    }
  } catch (err) {
    res.status(400).json({ result: "fail" });
  }
}

async function DeletePost(req, res) {
  // #swagger.description = "여기는 포스트를 삭제하는 곳 입니다."
  // #swagger.tags = ["Post"]
  // #swagger.summary = "게시물 삭제"
  try {
    const { id } = req.params;
    const { content, pw } = req.body;
    const post = await Post.findOne({ id, content }); //받아온 값이 있는 데이터를 찾아온다.

    if (bcrypt.compareSync(pw, post.pw)) {
      await Post.deleteOne({ id }); //있다면 해당 데이터를 삭제해준다.
      res.status(200).json({ result: "success" });
    } else {
      res.status(400).json({ result: "fail" });
    }
  } catch (err) {
    res.status(400).json({ result: "fail" });
  }
}

module.exports = { ShowPost, CreatePost, DetailPost, UpdatePost, DeletePost };
