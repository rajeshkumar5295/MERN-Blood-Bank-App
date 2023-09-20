import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'

import {useState,useEffect} from "react";
import moment from 'moment'
import API from "../../services/API";




const Hospital = () => {
      const [data,setData]=useState([]);

      const hospitalRecords=async()=>{  

        try {
               const data= await API.get("api/v1/inventory/get-hospitalrecords");
               
               console.log(data);
              
                  
               setData(data?.data?.hospitals);
            
        } catch (error) {  
            console.log(error);
            
        }
      }

      useEffect(()=>{
        hospitalRecords();
      },[])

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
                                  <td> {record.hospitalName }</td>
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

export default Hospital