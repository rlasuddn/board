const jwt = require("jsonwebtoken")
const User = require("../schema/users")

module.exports =async (req,res,next)=>{
    const {authorization} = req.headers
    const [tokenType,tokenValue] = authorization.split(" ")

    if(tokenType !== 'Bearer'){
        res.status(401).send({
            Message:'Login first!'
        })
        return
    }
    try{
        const secretKey = process.env.SECRET_KEY
        const {userId} = jwt.verify(tokenValue,`${secretKey}`)
        const user = await User.findOne({email:userId})
        res.locals.user = user
        next()
    }catch(err){
        res.status(401).send({
            Message:'Login first!'
        })
        return
    }
}
