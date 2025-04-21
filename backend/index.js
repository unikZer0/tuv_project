const express = require('express')

const bodyParser = require('body-parser')
const cookiesParser = require('cookie-parser')
const app = express()
const port = 3000
//call route
const authRoute = require('./src/router/auth')

app.use(bodyParser.json())
app.use(cookiesParser())

app.use('/auth',authRoute)

//test api
const Rusertest = require('./src/router/Rusertest')
app.use('/',Rusertest)


app.listen(port,()=>{
    console.log(`running at http://localhost:${port}`);
    
})
