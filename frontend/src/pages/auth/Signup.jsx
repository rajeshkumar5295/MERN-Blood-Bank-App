import React from 'react'
import Form from "../../components/Shared/Form/Form";
import {useSelector} from "react-redux"
import Spinner from '../../components/Shared/Spinner';
import { toast } from 'react-toastify';

const Signup = () => {
          const {loading,error}=useSelector((state)=>state.auth);

  return (
    <>   
        {error && <span> {toast.error(error)} </span>}

         {loading?( <Spinner/> ) :(
           <div className="row g-0 ">
           <div className="col-md-8  form-banner">
             <img src="./images/ddd.jpg" alt="" />
           </div>
     
           <div className="col-md-4  form-container ">
             
             <Form formTitle={"Signup" } submitBtn={"Click for Signup"} formType={"register"} />
           </div>
         </div>
         )}
           
        
    
    </>
  )
}

export default Signup