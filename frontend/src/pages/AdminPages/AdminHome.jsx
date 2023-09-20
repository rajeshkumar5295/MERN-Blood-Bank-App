import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import {useSelector} from "react-redux";

const AdminHome = () => {  
        
        const {user}=useSelector((state)=>state.auth) 
        
  return (
       <Layout>
                
               <div className="container">
                    <div className="d-flex flex-column mt-4">

                        <h1> Welcome Admin <i  className='text-success'  >  {user?.name} </i>  </h1>
                        <h3> Manage Blood Bank App  </h3>
                        <hr />

                        <p>  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero distinctio molestias aperiam minima quod repellat sint aliquid reiciendis excepturi eos est commodi temporibus expedita, eveniet sed? Iure voluptatem totam tempore quos adipisci quaerat libero enim?f </p>
                           
                    </div>
               </div>
                   
       </Layout>
  )
}

export default AdminHome