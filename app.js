const dotenv = require("dotenv").config()
const express = require("express")
require("./db/conn")
const router = require("./routes/auth")
const path = require("path")

var cookieParser = require('cookie-parser');


const app  = express()

const port = process.env.PORT || 8000


app.use(cookieParser());
//middlware for post request from postman
app.use(express.json())


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) // relative path
    })
  }
    
//middlweare for routers
app.use(router)


//for hosting
/* if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/client/build')))
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} */





app.listen(`${port}`, ()=>{
    console.log(`listening to port ${port}`)
})