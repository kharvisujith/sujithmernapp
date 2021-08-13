const mongoose = require("mongoose")
const bycrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")



const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email : {
            type:String,
            required:true,   
        },
        phone : {
            type:Number,
            required : true
        },
        work : {
            type:String,
            required:true
        },
        password : {
            type:String,
            required:true,
         
        },
        cpassword : {
            type:String,
            required:true,
        
        },
        date: {
            type:Date, 
            default:Date.now
        },
        messages: [
            {
            name:{
                type:String
            },
            email:{
                type:String
            },
            phone:{
                type:String
            },
            message:{
                type:String
            }
            
            }
        ],

        tokens : [
            {
                token : {
                    type:String,
                    required:true
                }
            }
        ]

    }
)


//generating jwt token -- provide unique id and  key
UserSchema.methods.generateAuthToken = async function(){
    try{
    console.log("auth calledd")
    const token = jwt.sign({id:this._id}, process.env.KEY)
    this.tokens = this.tokens.concat({token:token})
    console.log("token is")
    console.log(token)
    await this.save()
    console.log("save working")
    //if you dont include save for online database -- this will not add array of objects
    return token
    }
    catch(e){
        console.log("catchhh")
        res.send(e)
    }
}


UserSchema.methods.addContactData = async function(name, email, phone, message){
    console.log(this.name)
    console.log(this.email)
    console.log(this.messages)
    this.messages =await this.messages.concat({name, email, phone, message})
    console.log("this message is ")
    console.log(this.messages)
    await this.save()
    console.log("save working")
    return this.messages
}


//bycrypt hashing
 UserSchema.pre("save", async function(next){
    //this if codition is must else unanle to login --- because of rehashing due to pre save methods
    if(this.isModified("password")){
  
    this.password = await bycrypt.hash(this.password,10)
    this.cpassword  = await bycrypt.hash(this.cpassword, 10)
    console.log("encrypted password is ")
    console.log(this.password)
    next()
    }

    else {
        next()
    }
    
}) 


const User = new mongoose.model("USER", UserSchema)

module.exports = User