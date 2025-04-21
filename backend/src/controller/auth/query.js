//Login
const loginQuery = `SELECT * FROM users WHERE Email = ? OR Phone = ? LIMIT 1`;

//register
const registerQuery = `INSERT INTO users SET ?`
const checkExist = `SELECT * FROM users WHRER Email =?`

module.exports = {loginQuery,registerQuery,checkExist}
