import React, {useState, useContext} from 'react'
import { useHistory} from 'react-router'
import { usercontext } from '../App'




const Signin = () => {
 

    const [user, setuser] = useState({
        email:"",
        password:""
    })

    const history = useHistory()

    const {state, dispatch} = useContext(usercontext)
   

    const getinputs = (event)=>{
        const name=event.target.name
        const value = event.target.value
        setuser({...user, [name]:value})

    }
  

    const loginuser = async (e)=>{
        console.log("ueser is")
        console.log(user)

    
        e.preventDefault()
        
        const {email, password} = user

        const res = await fetch("/signin", {
            method:"POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                    email, password
            })
        })
        console.log("res is ")
        console.log(res)
        console.log(res.status)

        if(res.status === 201){
            window.alert("logged in succesfully")
            dispatch({type:"USER", payload:true})
            history.push("/")
        }
        else {
            window.alert("Invalid cred")
           
        }



    }

    return (
       <>
        <div section = "signin">
                <div className="container my-5">
                <div className="row signin-box">
                <div className="col-md-6 col-12  order-2 left-div">
                    <form method="POST" className="signin-form">
                    <h1>Sign In</h1>
                      
                        <div className="form-group">
                            <label for="email">
                            <i className="zmdi zmdi-email"></i>
                            </label>
                            <input type="email" placeholder="Email" id="email" name="email" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                      
                        <div className="form-group">
                            <label for="password">
                            <i className="zmdi zmdi-assignment-alert"></i>
                            </label>
                            <input type="password" placeholder="Password" id="password" name="password" autoComplete="off" required 
                                onChange={getinputs}
                            />
                        </div>
                        <div className="form-group">
                        <input className="btn btn-primary px-3 py-2" type="submit" value="SignIn"
                        onClick={loginuser}
                         />
                        </div>
                        
                    </form>
            
                </div>


                <div className="col-md-6 col-12  order-1 right-div">
                    <img className="img-fluid" src="images/signin.jpg" alt="sigin-image" />
                </div>


                </div>
               
                
                </div>
            </div>
       </>
    )
}

export default Signin
