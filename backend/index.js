const express = require('express')

const bodyParser = require('body-parser')
const cookiesParser = require('cookie-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cookiesParser())

const Rusertest = require('./src/router/Rusertest')
app.use('/',Rusertest)


app.listen(port,()=>{
    console.log(`running at http://localhost:${port}`);
    
})
