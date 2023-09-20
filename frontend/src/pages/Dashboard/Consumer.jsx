import React from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import API from '../../services/API';

import {useState,useEffect} from "react"

import moment from "moment";

import {useSelector} from "react-redux"

const Consumer = () => {
    const [data,setData]=useState([]); 

    const {user} =useSelector(state=>state.auth);
    console.log('hi')
    console.log(user?._id);
      

    const getDonars=async()=>{
      try {   
             const {data}=await API.post("api/v1/inventory/get-inventory-hospital" ,{filters:{ inventoryType:"out"}} );

             console.log(data)
             setData(data?.inventory);
          
      } catch (error) {

          console.log(error);
      }
    }

    useEffect(()=>{
        getDonars();
    },[])

    console.log(data);
      
return (
  <Layout>
    <>
        
    <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type </th>
                  <th scope="col"> Quantity </th>
                  <th scope="col">Email </th>
                  <th scope="col">Date </th>
                  
                </tr>
              </thead>
              <tbody>
                {data?.map((record) => (
                          
                          <tr key={record._id} >
                             <td> {record.bloodGroup  }</td>
                            <td> {record.inventoryType} </td>
                            <td> {record.quantity} </td>
                            <td> {record.email} </td>
                            
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



export default Consumer