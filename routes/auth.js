const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("../db/conn")
const User  = require("../models/UserSchema")
const authenticate = require("../middleware/authenticate")



const app = express()
const router = express.Router()




//middleware
/* const middleware = (req, res, next)=>{
    console.log("hi this is middle")
    next()
} */
//middleware for post request from postman


router.get("/", (req, res)=>{
    res.send("welcome to developer adda")
})

router.get("/register", (req, res)=>{
    console.log(req.cookies.test)
    res.send("register")
})

router.get("/signin", (req, res)=>{
    res.send("sign in page ")
})

router.post("/register", async(req, res)=>{

    try{
        console.log("rrrrrr")
    const { name , email, phone, work , password, cpassword} = req.body
    if(password === cpassword){

        const oldUser =await User.findOne({email:email})
        if(oldUser){
            res.status(422).json({eroor :"Email already exists"})
        }
        else {
    //  const data = new User(req.body)
        const data = new User( 
            {
                name:name,
                email:email,
                phone:phone,
                work:work,
                password:password,
                cpassword:cpassword
            }
        )

        //middleware for JWT  generatig token
        const token =await data.generateAuthToken()
        console.log("token in backend")
        console.log(token)

        //adding cookies 
         const cook = res.cookie("jwtoken", token, 
        {
            expires : new Date(Date.now() + 200000),
            httpOnly:true
        }) 

        //password hashing is done here using pre method in schema file
        const done = await data.save()
        res.status(201).json({message:"registered succesfully"})
        }
    }
    else {
        res.status(400).json({error:"passwords do  not match"})
    }
}
    catch(e){
        res.status(401).send(e)
    }
   
  
})

router.post("/signin", async(req, res)=>{
    try{
    const {email , password} = req.body
    console.log(email)
    console.log(password)
    if(!email || !password){
        res.status(400).json({message:"Please fill data"})
    }

    const userdata =await User.findOne({email:email})
    console.log(password)
    console.log("encrypted password from database is ")
    console.log(userdata.password)
    
    //console.log(userdata)
    if(userdata){
        console.log("inside userdata")
       // const valid = await bcrypt.compare(password,userdata.password)
        var valid =await bcrypt.compare(password,userdata.password)
       // const valid=true;
       /*  if(password === userdata.password){ */
       // const valid = true
        console.log("valid is")
        console.log(valid)
        if(valid){
            console.log("its valid")
            //generating tokens
            const token =await userdata.generateAuthToken()
            console.log("after auth funtino")
            console.log(token)

            //adding cookies
            const cook = res.cookie("jwtoken", token, 
            {
                expires : new Date(Date.now() + 20000000),
                httpOnly : true
            })
         

           // console.log(cook)
            
            res.status(201).json({ message: "Logged in successfully"})
        }
        else {
            res.status(401).json({message : "Invalid Cre"})
        } 
    }

    else{
         res.status(300).send("passwor do not match")
    }
    
  //  }
   /*  else {
        res.status(400).send("invalid")
    } */
    }

    catch(e){
        console.log("errroroor rree")
        res.status(401).send("invalid re")
    }
})


//using middleware and next()
router.get("/about", authenticate, (req, res)=>{
  //  console.log(req.rootUser)
    res.send(req.rootUser) 
})

router.get("/getdata", authenticate, (req, res)=>{
    console.log("getdata route is called")
    if(req.rootUser){
    res.status(200).send(req.rootUser)
    }
    else{
        res.status(400).send("no user")
    }
})


router.post("/contact", authenticate, async(req, res)=>{
  try{
    const user_id= req.userid
    const {name, email, phone, message} = req.body
    console.log("message is " + message)
    console.log(message)
    console.log(user_id)
    console.log(req.body)
    if( name  && email && phone && message){
    const user =await User.findOne({_id:user_id})

    if(User){
        const messagedata =await user.addContactData( name, email, phone, message)
        console.log(messagedata)
        await user.save()
        res.status(200).send(messagedata)
    }
    }
    else {
        console.log("empty data")
        res.status(400).send("Please fill all the fields")
    }
  }
  catch(e){
      console.log("error in contact ")
      res.status(401).send(e)
  }
})

router.get("/logout",authenticate, (req, res)=>{
    console.log("loggyyy")
    console.log(req.token)
    res.clearCookie("jwtoken")
    //to logout only from particular device use filter
  /*   req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
        return curelem  !== req.token
    }) */
    //to logout from all device
    req.rootUser.tokens = []
    req.rootUser.save()
    res.status(200).send("loggedout successfully")
})



module.exports = router