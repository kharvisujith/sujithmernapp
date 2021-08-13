import React, {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom'

export const Contact = () => {


    const [userdata, setuserdata] = useState({
        name:"",
        email:"",
        phone:"",
        message:""
    })

    const history = useHistory()

    const getuserdata = async ()=>{
        try{
            console.log("getuserdata called")
            const res = await fetch("/getdata" , {
                method:"GET",
                headers:{
                    "Contnet-Type":"application/json"
                }
            })

            const data = await res.json()
            setuserdata({name:data.name, email:data.email, phone:data.phone})
    
        }
        catch(e){
            console.log(e)

        }
    }


    const getinputdata = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setuserdata({...userdata, [name]:value})
    }
    console.log(userdata)


    useEffect(()=>{

        getuserdata()
    },[])


    const postContactdata = async(e)=>{
        try{
        console.log("post contact data called")

        e.preventDefault()
        const {name, email, phone, message} = userdata
        console.log("message is ")
        console.log(message)

        const res = await fetch("/contact", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, phone, message
                
            })
        })
        console.log("res is ")
        console.log(res)
        if(res.status === 400){
            window.alert("Please fill all fileds")
           
        }
        else if(res.status === 401){
            window.alert("please login before contacting us")
            history.push("/signin")
        }
        else{
            const data =await res.json()
            console.log("post dta is ")
            console.log(data)
            window.alert("Your message has been received")
            setuserdata({message:""})
        }

    }
  
    catch(e){
        window.alert("You need to signin to contact us")
        history.push("/signin")
        console.log(e)
    }

    }


    return (
        <>
        
        <div className="container mt-5 contact-div">
        <form method="POST">
        <div className="row">

        
        <div className="col-md-4 col-12 mx-auto">
        <div className="contact-box">
        <div>
        <label>
        <i className="zmdi zmdi-account"></i>
        </label>
        <input type="text" placeholder="Enter Name" name="name" value={userdata.name} onChange={getinputdata} autoComplete="off" required />
        </div>
        </div>
        </div>

       


        <div className="col-md-4 col-12 mx-auto">
        <div className="contact-box">
        <div>
        <label >
        <i className="zmdi zmdi-email"></i>
        </label>
        <input type="text" placeholder="Enter Email" name="email" value={userdata.email} onChange={getinputdata} autoComplete="off" required />
        </div>
        </div>
        </div>

        <div className="col-md-4 col-12 mx-auto">
        <div className="contact-box">
        <div>
        <label>
        <i className="zmdi zmdi-phone"></i>
        </label>
        <input type="text" placeholder="Enter Phone Number" name="phone" value={userdata.phone} onChange={getinputdata} autoComplete="off" required />
        </div>
        </div>
        </div>


        <div className="col-md-12 col-12 mx-auto contact-message">
        <div className="mx-auto message-box">
            <textarea placeholder="Enter Your Message Here" name="message"  value={userdata.message} onChange={getinputdata} autoComplete="off" required />
        </div>
        </div>

        <div className="col-12 my-3">
        <div className="text-center">
            <button className="btn btn-primary px-5"  onClick={postContactdata}>submit</button>
        </div>
        </div>
        
       

      
       
        </div>
        </form>
        </div>

  
     

        
            
        </>
    )
}

export default Contact