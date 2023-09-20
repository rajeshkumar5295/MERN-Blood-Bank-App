import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/Shared/Layout/Layout";
import Modal from "../components/Shared/PopUpModels/Modal";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import { useState, useEffect } from "react";
import API from "../services/API";

const HomePage = () => {


  const [data, setData] = useState([]);

  const { loading, error,user  } = useSelector((state) => state.auth);

  const navigate=useNavigate();

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("api/v1/inventory/get-bloodrecords");
      console.log(data);
      setData(data?.inventory);
      //  console.log(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  console.log(data);
  return (
    <Layout>
      <div className="container">
        <>  
            {user?.role==="admin"&& navigate("/admin")}
          {error && <span> {toast.error(error)} </span>}

          {loading ? (
            <Spinner />
          ) : (
            <>
              <h4
                className="ms-0  "
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fa-solid fa-plus text-success py-4 px-2   "> </i>
                Add Inventory
              </h4>

              <Modal />

              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Blood Group</th>
                    <th scope="col">Inventory type</th>
                    <th scope="col">Quantity (in ml) </th>
                    <th scope="col"> Email </th>
                    <th scope="col"> Time & Date </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((record) => (
                            
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
              
            </>
          )}
        </>
      </div>
    </Layout>
  );
};

export default HomePage;
