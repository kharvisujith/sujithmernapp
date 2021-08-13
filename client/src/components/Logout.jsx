import React, {useReducer,useContext} from 'react'
import { useHistory } from 'react-router'
import { usercontext } from '../App'

export const Logout = () => {

    const history = useHistory()
    
    const {state, dispatch } = useContext(usercontext)

    

    const logoutuser = async()=>{
       
            const res = await fetch("/logout", {
                method:"GET",
                headers:{
                    Accept:"application/json",                  
                    "Content-Type":"application/json"
                },
                Credentials:"include"
            })
            console.log(res.status)
            if(res.status === 200 || res.status ===401){
                dispatch({type:"USER", payload:false})
                history.push("/signin")
            }
          /*   else if(res.status === 401){
                history.push("/signin")
            } */
          
        
            
        }
    logoutuser()

    return (
        <>
     
           
        </>
    )
}

export default Logout;
