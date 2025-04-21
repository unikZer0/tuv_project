const conn = require('../../setting/connection')
const jwt = require('jsonwebtoken')
const {loginQuery,registerQuery,checkExist} = require('./query')
const {sucMessage,errMessage} = require('../../service/messages')
const bcrypt = require('bcrypt')
const secret = 'mysecret'
const loginCtrl = async (req,res)=>{
    try {
        const {identifier,password} = req.body
        const [results] = await conn.query(loginQuery,[identifier,identifier])
        if (!identifier || !password) {
            return res.status(400).json({ message: "Missing identifier or password" });
          }
        if(results.length === 0) {
            return res.status(401).json({message :errMessage.login});
        }
        const user = results[0]
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(401).json(errMessage.notMatch);
        }
        const token = jwt.sign({userId: user.id,role: user.role,},secret,{
            expiresIn:'1m'
        })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 1000
        });
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = {loginCtrl}
