import { toast } from "react-toastify";
import store from '../redux/store';
import { userLogin, userRegister } from "../redux/features/auth/authAction";

export const handleLogin=(e,email,password,role)=>{   
    
    e.preventDefault();
    console.log(e,role,email,password)
    try {  

        if(!role||!email||!password){
            return toast.error("Please provide all field")
        }
        store.dispatch(userLogin({email,password,role}))
        
            
        
    } catch (error) {  

        console.log(error)
        
    }

}

export const handleRegister=(e,name,  email,role,password,phone,organisationName,address,hospitalName,website)=>{

    e.preventDefault();
    try {   
              store.dispatch(userRegister({name, email,role,password,phone,organisationName,address,hospitalName,website}))
        
    } catch (error) {
        console.log(error);
    }

}