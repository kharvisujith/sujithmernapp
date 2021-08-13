const express = require("express")
const bcrypt = require("bcryptjs")

const app = express()


app.get("/", (req,res)=>{

res.send("hello")
})

app.get("/valid",async(req, res)=>{
    try{
        var password = "keek"
        var pass = "keek"
        console.log(password)
        password = await bcrypt.hash(password, 10)
        console.log(password)

        const valid =await bcrypt.compare(pass,password )
        console.log(valid)
        res.send("keek")
    }
    catch(e){
        console.log(e)
        res.send(e)
    }
})


app.listen(4500, ()=>{
    console.log(`listening to port 4500`)
})