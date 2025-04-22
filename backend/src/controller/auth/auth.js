const conn = require('../../setting/connection')
const jwt = require('jsonwebtoken')
const {loginQuery,registerQuery,checkExist} = require('./query')
const {sucMessage,errMessage} = require('../../service/messages')
const bcrypt = require('bcrypt')
const secret = 'mysecret'
const validator = require('validator')
const loginCtrl = async (req,res)=>{
    try {
        const {identifier,Password} = req.body
        if (!identifier || !Password) {
            return res.status(400).json({ message: "Missing identifier or Password" });
          }
          const [results] = await conn.query(loginQuery,[identifier,identifier])
        if(results.length === 0) {
            return res.status(401).json({message :errMessage.login});
        }
        const user = results[0]
        const match = await bcrypt.compare(Password,user.Password)
        if(!match){
            return res.status(401).json(errMessage.notMatch);
        }
        const token = jwt.sign({userId: user.User_ID,role: user.Role_id,},secret,{
            expiresIn:'1m'
        })
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 1000
        });
        return res.status(200).json({
            message: sucMessage.login || "Login successful",
            token
          });
    } catch (error) {
        console.log(error);
        
    }
}
const regitserCtrl = async(req,res)=>{
    try {
//required
        const {
            FirstName,
            LastName,
            Email,
            Phone,
            Datebirth,
            Sex,
            Password,
            Images
          } = req.body;
          
          if (!FirstName || !LastName || !Email || ! Phone || !Datebirth || !Sex || !Password  ) {
            return res.status(400).json({message: errMessage.requireField})
          }
//isEmail
          if (!validator.isEmail(Email)) {
            res.status(401).json({message:errMessage.invEmail})
          }
//check existing Password
          const [exists] = await conn.query(checkExist,[Email,Phone])
          if(exists.length > 0){
            res.status(400).json({message:errMessage.exists})
          }
//hash Password
          const salt = await bcrypt.genSalt(10)
          const hashPwd = await bcrypt.hash(Password , salt)
//free field 
          const RegistrationDate = new Date();
          const Role_id = 1
//insert
          const userData = await conn.query(registerQuery,[FirstName,LastName,Email,Phone,Datebirth,Sex,hashPwd,Images || null ,RegistrationDate,Role_id])
          console.log(userData);
          
          return res.status(201).json({message:sucMessage.insert , users:userData})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: errMessage.server });
    } 
}
module.exports = {loginCtrl,regitserCtrl}
