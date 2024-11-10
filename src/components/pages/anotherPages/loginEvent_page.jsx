import React, { useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import  {assignToken} from "../../../js/login"
const LoginEventPage=()=>{
    const {key}=useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        if(key){
            assignToken(key)
            navigate("/")
        }
    },[key])




   return(<>
    <span>Login Fail</span>
   
   </>)
}
export default LoginEventPage