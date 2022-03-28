const express = require("express")
const router = express.Router()
const User = require("../schema/users")
const bcrypt = require("bcrypt")
const membershipForm = require("../middlewares/joi")
const jwt = require("jsonwebtoken")

//회원가입 로그인 양식 미들웨어를 사용해서 유효성 검사를 한다.
router.post('/join',membershipForm, async (req, res) => {
    const {email, nickname, password, confirmpassword} = req.body
    try{
        if(email === password){
            res.status(401).send({
                Message:"Email and password match!!"
            })
            return
        }
        const user = await User.find({email})
        //email에 해당하는 user가 있으면 Message를 보낸다.
        if(user.length){
            res.status(401).send({
                Message:"This user already exists."
            })
            return
        }
        //받은 비밀번호를 암호화 한다.
        const bcryptPassword = bcrypt.hashSync(password,10)
        //유저 생성
        await User.create({email,nickname,password:bcryptPassword})
        res.send({
            Message:"Welcome!"
        })
    }catch(err){
        res.status(401).send({
            Message:"Try again"
        })
    }
})
//로그인
router.post('/login',async (req,res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        const secretKey = process.env.SECRET_KEY
        //받은 email의 유저 비밀번호와 데이터베이스의 비밀번호를 비교한다.
        if(bcrypt.compareSync(password,user.password)){
            //비밀번호가 일치하면 토큰을 만들고 넘겨준다.
            const token =jwt.sign({userId:email},`${secretKey}`)
            res.send({
                token,
                Message:"Welcome!"
            })
        }else{
            res.status(401).send({
                Message:"Try again"
            })
        }
    }catch(err){
        res.status(401).send({
            Message:"Try again"
        })
    } 
})
module.exports = router;