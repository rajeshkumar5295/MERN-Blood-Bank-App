import React from "react";
import Header from "../../components/Shared/Layout/Header";

import { useState, useEffect } from "react";
import API from "../../../src/services/API";
import moment from "moment"

const Analytics = () => {


  const [data, setData] = useState([]);

  const [recentInventory,setrecentInventory]=useState([]);

  // get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/api/v1/analytics/analytics-bloodRecord");
      //  console.log(data);
      setData(data?.bloodGroupData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);





  // console.log(data);


  const colors=[
         "#884A39",
         "#C38154",
         "#FFC26F",
         "#4F708C",
         "#4942E4",
         "#0079FF",
         "#FF0060",
         "#22A699",
  ]


  const getrecentBloodRecords = async () => {
    try {
      const { data } = await API.get("api/v1/inventory/get-recent-bloodrecords");
      console.log(data);
      setrecentInventory(data?.inventory);
      //  console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getrecentBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record,i ) => ( 

          <div  key={record._id} className="card m-2 p-1 " style={{ width: "18rem"  ,backgroundColor:`${colors[i]}` }}>
          
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3 "> {record.bloodGroup} </h1>
              <p className="card-text">
                 Total In : <b> {record.totalIn} </b>(ML)
              </p>

              <p className="card-text  ">
                 Total Out : <b> {record.totalOut} </b>(ML)
              </p>
              
             
            </div>
            <div className="card-footer  text-light bg-dark text-center "> <b> {record.availabelBlood}  (ML)  </b>  </div>
          </div>

        ))}

      </div >
         

             <div className="container mt-3">  

             <h1> Recent Blood Transaction </h1>
                      
             <table className="table mt-3 ">

            
<thead>
  <tr>
    <th scope="col">Blood Group</th>
    <th scope="col">Inventory type</th>
    <th scope="col">Quantity (in ml) </th>
    <th scope="col">Donar Email </th>
    <th scope="col"> Time & Date </th>
  </tr>
</thead>
<tbody>
  {recentInventory?.map((record) => (
            
            <tr key={record._id} >
              <td> {record.bloodGroup} </td>
              <td> {record.inventoryType} </td>
              <td> {record.quantity} </td>
              <td> {record.email} </td>
              <td> { moment(record.createdAt).format("DD/MM/YYYY hh:mm A")  } </td>
            </tr>
          
  )
   
  )}
</tbody>
</table>

                      
             </div>


    </>
  );
};

export default Analytics;
