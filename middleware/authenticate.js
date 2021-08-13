const jwt = require("jsonwebtoken")
const User  = require("../models/UserSchema")



const authenticate = async(req, res, next)=>{
    try{
    /*     console.log('authenticate') */
        const token =req.cookies.jwtoken
     //   console.log(token)
        const verifyuser = jwt.verify(token, process.env.KEY)
      //  console.log(verifyuser)
        const rootUser = await User.findOne({_id:verifyuser.id})

        if(!rootUser){
            res.status(400).send("unauthorised user")
        }

        req.token = token
        req.rootUser = rootUser
        req.userid = rootUser._id
    /*     console.log("rootuser is ")
        console.log(rootUser)
        console.log("req.rootuser is ")
        console.log(req.rootUser)
        
 */
        console.log("beforenext")
        next()
    }
    catch(e){
        res.status(401).send("Unauthorized: No token provided")
    }
}

module.exports = authenticate