import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const jwtKey = process.env.JWT_SECRET

const router = express.Router()

const users = [
    { id: 1, username: 'testuser', password: bcrypt.hashSync('code@123',10) },
    { id: 2, username: 'testuser2', password: bcrypt.hashSync('github_12',10) },
]

router.post('/login',async(req,res) => {
    const {username,password} = req.body
    const user = users.find(u =>u.username===username)
    if(!user) return res.status(400).send('invalid username or password')
    
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword) return res.status(400).send('invalid username or password')

    const token = jwt.sign({id:user.id,username:user.username},jwtKey,{expiresIn:'1h'})

    res.send({token}) //will get resposne as token

    
})

export default router