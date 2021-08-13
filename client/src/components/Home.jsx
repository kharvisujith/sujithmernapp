import cookieParser from 'cookie-parser'
import React, { useEffect, useState } from 'react'

const Home = () => {

    const [userdata , setuserdata] = useState()


    const getuserdata = async()=>{
        
        const res =await fetch("/getdata", {
            method:"GET",
            headers: {
                Accept:"application/json",  
                "Content-Type":"application/json"
            },
            Credentials:"include"
        })
        console.log("response in home page for getdata is")
        console.log(res)
        console.log(res.status)
        console.log("home is called")
       
    
        if(res.status === 200){
            console.log("inside if")

            //error in this line
            const data = await res.json()
            console.log("data fetched in homepage is ")
            console.log(data)
            setuserdata(data.name)
        }
        else{
            console.log("user is not authenticated")
            console.log(res.status)
            
        }
    
    }


    useEffect(()=>{
        console.log("userdata in homepage is")
        console.log(userdata)
        
        getuserdata()
    },[])
    return (
        <>
        <div className=" row home-page">
            <div className=" col-md-auto col-10 mx-auto home-content">
            <p>welcome</p>
            {userdata?
                <h1>{`${userdata}`}</h1> : <h1>{'Developer Adda'}</h1>
            }
                <p>We will help you to grow </p>
            </div>
        </div>
        </>
    )
}

export default Home
