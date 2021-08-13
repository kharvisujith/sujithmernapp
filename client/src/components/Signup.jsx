import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {


    const [userdata, setuserdata] = useState( {
        name:"", email:"", phone:"", work:"", password:"",cpassword:""
    })

    const history = useHistory()

    const getinputs = (event)=>{
        const name=event.target.name
        console.log(name)
        const value = event.target.value
        setuserdata( {...userdata, [name]:value})
    }
   

    const postdata = async (e)=>{
       try{
        e.preventDefault()

        const {name, email, phone, work, password, cpassword} = userdata

        const res =await fetch("/register", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"

                },
                body: JSON.stringify(
                    { name, email, phone, work, password, cpassword}
                )
        })
        console.log("res is ")
        console.log(res)
        console.log(res.status)
        //const data = res.json()

        if(res.status === 201 ){
            window.alert("registration succesfull")
            console.log("registration success")
            history.push("/signin")
        }
        else {
            window.alert("invalid ")
            //after register redirect to login page using useHIstory
           
        }
        }
        catch(err){
            console.log(e)
        }

    }




    return (
        <>
            <div section = "signup">
                <div className="container my-5">
                <div className="row signup-box">
                <div className="col-md-6 col-12 order-md-1 order-2 left-div">
                <form method="POST" className="signup-form">
                    <h1>Sign Up</h1>
                        <div className="form-group">
                            <label htmlFor="name">
                                <i className="zmdi zmdi-account"></i>
                            </label>
                            <input type="text" placeholder="Name" id="name"  name="name" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">
                            <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" placeholder="Email" id="email"  name="email" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">
                            <i className="zmdi zmdi-phone"></i>
                            </label>
                            <input type="number" placeholder="Mobile Number" id="phone"  name="phone" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profession">
                            <i className="zmdi zmdi-assignment-account"></i>
                            </label>
                            <input type="text" placeholder="Profession" id="profession"  name="work" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">
                            <i className="zmdi zmdi-assignment-alert"></i>
                            </label>
                            <input type="password" placeholder="Password" id="password"  name="password" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmpassword">
                            <i className="zmdi zmdi-assignment-alert"></i>
                            </label>
                            <input type="password" placeholder="Confirm Password" id="confirmpassword"  name="cpassword" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                        <input className="btn btn-primary px-3 py-2" type="submit" value="SignUp"
                            onClick={postdata}
                         />
                        </div>
    
                        
                        
                    </form>
            
                </div>


                <div className="col-md-6 col-12 order-md-2 order-1 right-div">
                    <img className="img-fluid" src="images/signup.jpg" alt="signup-image" />
                </div>


                </div>
               
                
                </div>
            </div>
                    
              
            
        </>
    )
}

export default Signup
