import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router'

const About = () => {

    const history = useHistory()
    const [userdata, setuserdata]= useState()

    const userlogin = async()=>{
        try{
        const res = await fetch("/about", {
            method:"GET",
            headers:{
              //  Accept:"application/json",
                "Content-Type":"application/json"
            },
           // Credentials:"include"
        })
        console.log("res is ")
       console.log(res)
       console.log(res.status)
        const data = await res.json()
       // console.log(data)
      //  console.log(data.name)
        
        
        if(res.status === 200){
            setuserdata(data)
            history.push("/about")
        }
        else {
            history.push("/signin")
        }
        }
        catch(err){
            console.log("idar hai error")
            history.push("/signin")
        }
    }
    

    useEffect(()=>{
        //cannot use assyn in useeffect so define funtion outside and call from 
        console.log("about useffect is called")
        userlogin()
    }, [])



    return (
        <>
        {userdata &&
        <div>
        <h1>{`user name is: ${userdata.name}` }</h1>
        <h1>{`user email is: ${userdata.email}` }</h1>
        <h1>{`user phone number is: ${userdata.phone}` }</h1>
        </div>
        
        
    
        }
        </>
    )
}

export default About
