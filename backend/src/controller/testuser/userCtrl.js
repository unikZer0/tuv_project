const conn = require('../../setting/connection');
const userQuery = require('./queryUser');
const {errMessage, sucMessage} = require('../../service/messages')

const getAll = async (req,res)=>{
    try{
        const [data] = await conn.query(userQuery.getAllusers);
        res.json({message:sucMessage.seeAll,test:data[0]})
    }
    catch(error){
        console.log('err :',error)
    }   
}
module.exports = {getAll}
