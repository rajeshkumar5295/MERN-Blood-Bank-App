import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import moment from "moment"
import {useState,useEffect} from 'react';
import API from '../../services/API';

import {useSelector} from 'react-redux';

const Organisation = () => {  

  const [data,setData]=useState([]);  

   const {user}=useSelector(state=>state.auth);

  const OrganisationRecords=async()=>{  

    try {
          if(user?.role==="donar"){
            const data= await API.get("api/v1/inventory/get-organisation");
           
            console.log(data);
           
               
            setData(data?.data?.organisations);
          }
          if(user?.role==="hospital"){
          
              const data= await API.get("api/v1/inventory/get-organisation-for-hospital");
             
              console.log(data);
             
                 
              setData(data?.data?.organisations);

          }
        
    } catch (error) {  
        console.log(error);
        
    }
  }

  useEffect(()=>{
    OrganisationRecords();
  },[user])

  console.log(data);
  return (
    <Layout>
    <>
     
     <table className="table">
               <thead>
                 <tr>
                   <th scope="col">Name</th>
                   <th scope="col">Email</th>
                   <th scope="col">Phone </th>
                   <th scope='col' > Address  </th>
                   <th scope="col">Date </th>
                   
                 </tr>
               </thead>
               <tbody>
                 {data?.map((record) => (
                           
                           <tr key={record._id} >
                             <td> {record.organisationName }</td>
                             <td> {record.email} </td>
                             <td> {record.phone} </td>
                             <td> {record.address} </td>
                             
                             <td> { moment(record.createdAt).format("DD/MM/YYYY hh:mm A")  } </td>
                           </tr>
                         
                 )
                  
                 )}
               </tbody>
             </table>  
   
     </>
</Layout>
  )
}

export default Organisation