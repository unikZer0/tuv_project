const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())


const Rusertest = require('./src/router/Rusertest')
app.use('/',Rusertest)


app.listen(port,()=>{
    console.log(`running at http://localhost:${port}`);
    
})
