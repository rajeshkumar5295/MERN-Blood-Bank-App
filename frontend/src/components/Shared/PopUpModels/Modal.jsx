import React from "react";
import { useState } from "react";
import InputType from "../Form/InputType";
import API from "../../../../src/services/API";
import {useSelector} from "react-redux";

const Modal = () => {
  const [InventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");


     const {user} =useSelector((state)=>state.auth);

    //  console.log(InventoryType);

  const handleModelSubmit=async()=>{
    try {
         if(!bloodGroup||!quantity){
           return alert("Please Provide All Fields");

         }
           
          const {data}=await API.post("api/v1/inventory/create-inventory", { email ,organisation:user?._id,inventoryType:InventoryType,bloodGroup,quantity })
           
          // alert("api hit")
          // console.log(data)
          if(data?.success){
            alert("New Record Created");
            window.location.reload();

          }

      
    } catch (error) {   

        alert(error.response.data.message);
      console.log(error)
      // window.location.reload();
      
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex px-2 ">
                Blood Type: &nbsp;
                <div className="form-check ms-2 ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inRadio"
                    Checked
                    id="flexCheckDefault"
                    value={"in"}
                    onChange={(e) => {
                      setInventoryType(e.target.value);
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    in
                  </label>
                </div>
                <div className="form-check ms-2  ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inRadio"
                    id="flexCheckDefaultout"
                    value={"out"}
                    onChange={(e) => {
                      setInventoryType(e.target.value);
                    }}
                  />
                  <label
                    className="form-check-label "
                    htmlFor="flexCheckDefaultout"
                  >
                    out
                  </label>
                </div>
              </div>
            </div>

            <select className="form-select mt-2" aria-label="Default select example"  
               onChange={(e)=>{setBloodGroup(e.target.value)}}
            >
              <option selected>Select the Blood Group</option>
              <option value={"O+"}>O+</option>
              <option value={"O-"}>O-</option>
              <option value={"AB+"}>AB+</option>
              <option value={"AB-"}>AB-</option>
              <option value={"A+"}>A+</option>
              <option value={"A-"}>A-</option>
              <option value={"B-"}>B+</option>
              <option value={"B-"}>B-</option>
              
            </select>

          <InputType  
               labelText={" Email :"}
               labelFor={"Email"}
               inputType={"email"}
               value={email}
               onChange={(e)=>setEmail(e.target.value)}

          />  
             <InputType  
               labelText={"Quantity (in ml) :"}
               labelFor={"quantity"}
               inputType={"Number"}
               value={quantity}
               onChange={(e)=>setQuantity(e.target.value)}

          />

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary"  onClick={handleModelSubmit}     >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
