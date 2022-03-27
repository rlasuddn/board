const express = require("express")
const router = express.Router()
const User = require("../schema/users")
const bcrypt = require("bcrypt")
const membershipForm = require("../middlewares/joi")
const jwt = require("jsonwebtoken")

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
        if(user.length){
            res.status(401).send({
                Message:"This user already exists."
            })
            return
        }
        const bcryptPassword = bcrypt.hashSync(password,10)

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

router.post('/login',async (req,res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        const secretKey = process.env.SECRET_KEY
        if(bcrypt.compareSync(password,user.password)){
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

router.get("/users",async(req,res)=>{
    const user = await User.find({})
    res.send(user)
})

module.exports = router;