import React from "react";
import { useState,useEffect } from "react";
import InputType from "../../components/Shared/Form/InputType";
import Form from "../../components/Shared/Form/Form";

import {useSelector} from 'react-redux';
import Spinner from "../../components/Shared/Spinner";
import { toast } from "react-toastify";


const Login = () => {
         
    const {loading,error}=useSelector((state)=>state.auth);

                  console.log(error);
        
  return (
      
     <> 
         {error && <spn> {toast.error(error)}  </spn>}
     {
      loading ? (<Spinner/> ):(
        <div className="row g-0 "> 
        <div className="col-md-8  form-banner">
          <img src="./images/ddd.jpg" alt="" />
        </div>
  
        <div className="col-md-4  form-container ">
          
          <Form formTitle={"Login" } submitBtn={"Click for Login"} formType={"login"}  />
          
        </div>
      </div>
      )
     }
     
  
     </>
    
  );
};

export default Login;
