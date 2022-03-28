const Joi = require("joi")
const userId_pattern = /^[a-z|A-Z|0-9]+$/

module.exports = async(req,res,next)=>{
    const PostUserSchema = Joi.object({
        email: Joi.string().min(3).pattern(new RegExp(userId_pattern)).required(),
        nickname: Joi.string().required(),
        password: Joi.string().min(4).required(),
        confirmPassword: Joi.ref('password')
    })
    try{
        await PostUserSchema.validateAsync(req.body)
        next()
    }catch(err){
        res.status(401).send({
            Message: "회원가입 양식을 지켜주세요"
        })
        return
    }
}