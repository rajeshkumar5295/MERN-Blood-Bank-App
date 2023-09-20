import React from 'react'

import { useEffect  } from 'react';
import {Navigate} from "react-router-dom"
import API from '../../services/API';
import { getCurrentUser } from '../../redux/features/auth/authAction';

import {toast} from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'

const ProtectedRoute = ({children}) => {
        
         const dispatch=useDispatch();

         // get current user
         const getUser=async()=>{
            try {  
                const {data}=await API.get("api/v1/auth/current-user");
               //  console.log("current user fetching");
               //  console.log(data);
                if(data?.success){
                   toast.success(data.messaage);
                  //   alert("fetch successfully")
                  //   console.log(data);
                    dispatch(getCurrentUser(data));

                }
                
            } catch (error) { 
                localStorage.clear();
                console.log(error);
                
            }
         }

         useEffect(()=>{
            getUser();
         },[])

 if(localStorage.getItem('token')){
    return children;
 }
 else{
    return <Navigate to="/login"/>
 }
}

export default ProtectedRoute