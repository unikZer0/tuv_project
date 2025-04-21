const conn = require('../../setting/connection');
const getAllusers = require('./queryUser');
const {errMessage, sucMessage} = require('../../service/messages')

const getAll = async (req,res)=>{
    try{
        const [data] = await conn.query(getAllusers);
        res.json({message:sucMessage.seeAll,test:data})
    }
    catch(error){
        console.log('err :',error)
    }   
}
module.exports = {getAll}
