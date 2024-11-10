import React, { useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import  {assignToken} from "../../../js/login"
const LoginEventPage=()=>{
    const {key}=useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        async function setToken(tokenKey){
            await assignToken(tokenKey);
          
        }
        if(key){
            setToken(key)
            
        }
        console.log("12312312")
    },[key])




   return(<>
    <span>Login Fail</span>
   
   </>)
}
export default LoginEventPage
