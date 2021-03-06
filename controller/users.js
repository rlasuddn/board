const User = require("../schema/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function JoinMembership(req, res) {
  // #swagger.description = "여기는 회원가입을 하는 곳 입니다."
  // #swagger.tags = ["User"]
  // #swagger.summary = "회원가입"
  const { email, nickname, password } = req.body;
  try {
    if (password.search(email) > -1) {
      //패스워드에 이메일 포함되면 Message응답
      console.log(password.search(email));
      res.status(401).json({
        Message: "Email and password match!!",
      });
      return;
    }
    const user = await User.find({ email });
    //email에 해당하는 user가 있으면 Message응답
    if (user.length) {
      res.status(401).json({
        Message: "This user already exists.",
      });
      return;
    }
    //받은 비밀번호를 암호화 한다.
    const bcryptPassword = bcrypt.hashSync(password, 10);
    //유저 생성
    await User.create({ email, nickname, password: bcryptPassword });
    res.status(200).json({
      Message: "Welcome!",
    });
  } catch (err) {
    res.status(401).json({
      Message: "Try again",
    });
  }
}

async function Login(req, res) {
  // #swagger.description = "여기는 로그인을 하는 곳 입니다."
  // #swagger.tags = ["User"]
  // #swagger.summary = "로그인"

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //받은 email의 유저 비밀번호와 데이터베이스의 비밀번호를 비교한다.
    if (bcrypt.compareSync(password, user.password)) {
      //비밀번호가 일치하면 토큰을 만들고 넘겨준다.
      const token = jwt.sign({ userId: email }, `${process.env.SECRET_KEY}`);
      res.status(200).json({
        token,
        Message: "Welcome!",
      });
    } else {
      res.status(401).json({
        Message: "Try again",
      });
    }
  } catch (err) {
    res.status(401).json({
      Message: "Try again",
    });
  }
}

module.exports = { JoinMembership, Login };
