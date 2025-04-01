const mysql2 = require('mysql2/promise');

const host = '100.91.194.104' //or '100.75.106.34'
const user = 'Admin'
const password = 'admin123'
const database = 'tuv_test'
const conn = mysql2.createPool({
    host,
    user,
    password,
    database
})
module.exports = conn;
