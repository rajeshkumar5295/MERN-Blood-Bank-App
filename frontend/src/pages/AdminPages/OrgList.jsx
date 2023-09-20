import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import {useState,useEffect} from "react";

import moment from "moment"
import API from '../../services/API';


const OrgList = () => {
       
  const [data,setData]=useState([]);
      

  const getOrgList=async()=>{
    try {   
           const {data}=await API.get("api/v1/admin/organisation-list");
        //    console.log(data)
           setData(data?.OrgData)
        
    } catch (error) {

        console.log(error);
    }
  }

  useEffect(()=>{
    getOrgList();
  },[])

//   console.log(data);
    
const handleDelete=async(id)=>{
  try {     
    let answer=window.prompt("Are Your Sure want to delete"  ,"Sure" );
       
       if(!answer) return ;
           
         const {data}=await API.delete(`api/v1/admin/delete-donar/${id}`);
         alert(data?.message);
         window.location.reload();

    
  } catch (error) {  
      console.log(error);
    
  }
}

return (
<Layout>
  <>
      
  <table className="table">
            <thead>
              <tr>
                <th scope="col">OrganisationName</th>
                <th scope="col">Email</th>
                <th scope="col">Phone </th>
                <th scope="col">Date </th>
                <th scope="col">Action  </th>

                
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                        
                        <tr key={record._id} >
                           <td> {record.organisationName }</td>
                          <td> {record.email} </td>
                          <td> {record.phone} </td>
                          
                          <td> { moment(record.createdAt).format("DD/MM/YYYY hh:mm A")  } </td>

                          <td> 
                              <button className='btn btn-danger'  onClick={()=>handleDelete(record._id)} > Delete  </button>
                             </td>
                        </tr>
                      
              )
               
              )}
            </tbody>
          </table>  

  </>
    
</Layout>
)
  
}

export default OrgList