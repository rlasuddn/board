const jwt = require("jsonwebtoken")
const User = require("../schema/users")

// 로그인 검사 미들웨어
module.exports =async (req,res,next)=>{
    //헤더에서 authorization 을 받아온다.
    const {authorization} = req.headers
    //토큰타입과 값을 authorization에서 공백을 기준으로 나눈다.
    const [tokenType,tokenValue] = authorization.split(" ")

    if(tokenType !== 'Bearer'){
        res.status(401).send({
            Message:'Login first!'
        })
        return
    }
    try{
        const secretKey = process.env.SECRET_KEY
        //토큰값과 시크릿키로 복호화를 한다.
        const {userId} = jwt.verify(tokenValue,`${secretKey}`)
        //복호화한 값으로 데이터베이스에서 해당 유저를 찾는다. 
        const user = await User.findOne({email:userId})
        //해당 유저의 정보를 locals 변수에 저장 한다.
        res.locals.user = user
        next()
    }catch(err){
        res.status(401).send({
            Message:'Login first!'
        })
        return
    }
}
