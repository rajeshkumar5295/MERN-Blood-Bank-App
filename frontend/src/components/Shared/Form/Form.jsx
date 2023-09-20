import React from "react";
import InputType from "./InputType";
import { useState } from "react";
import {Link} from 'react-router-dom'
import { handleLogin, handleRegister } from "../../../services/authServices";

const Form = ({ submitBtn, formTitle, formType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

 

  return (

          
    <div>
      <form  
           onSubmit={(e)=>{
            if(formType==="login") 
            return handleLogin(e,email,password,role);

            else if(formType==='register')
            return handleRegister(e,name,email,role,password,phone,organisationName,address,hospitalName,website)
           }}
      >
        <h1 className="text-center">{formTitle} </h1>
        <hr />
            
            {/* radios button  */}  
                <div  className="d-flex mb-3" >
                  <div className="form-check ms-2">
                      <input 
                        type="radio" 
                         className="form-check-input"
                         name="role"
                         id="donarRadio"
                         value={"donar"}
                         onChange={(e)=>setRole(e.target.value)}
                         defaultChecked

                      />
                      <label htmlFor="donarRadio">  Donar </label>
                  </div>  

                  <div className="form-check  ms-2">
                      <input 
                        type="radio" 
                         className="form-check-input"
                         name="role"
                         id="adminRadio"
                         value={"admin"}
                         onChange={(e)=>setRole(e.target.value)}
                         

                      />
                      <label htmlFor="adminRadio"> Admin </label>
                  </div>
                  <div className="form-check  ms-2">
                      <input 
                        type="radio" 
                         className="form-check-input"
                         name="role"
                         id="hospitalRadio"
                         value={"hospital"}
                         onChange={(e)=>setRole(e.target.value)}
                         

                      />
                      <label htmlFor="hospitalRadio"> Hospiital </label>
                  </div>
                  <div className="form-check ms-2 ">
                      <input 
                        type="radio" 
                         className="form-check-input"
                         name="role"
                         id="organisationRadio"
                         value={"organisation"}
                         onChange={(e)=>setRole(e.target.value)}
                         

                      />
                      <label htmlFor="organisationRadio"> Organisation </label>
                  </div>

                </div>
                
        {/* can be use switch statement or if else */}

        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelFor={"email"}
                    labelText={"Enter Your Email:"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <InputType
                    labelFor={"password"}
                    labelText={"Enter Your Password:"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </>
              );
            }

            case formType === "register": {
              return (
                <>
                
                  
                  {
                    (role==="admin" ||  role==="donar") && ( 
                      <InputType
                      labelFor={"Name"}
                      labelText={"Enter Your Name:"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    ) 
                     

                    
                  }

                    {role==="organisation" &&(
                       <InputType
                       labelFor={"organisationName"}
                       labelText={"Organisation Name"}
                       inputType={"text"}
                       name={"organisationName"}
                       value={organisationName}
                       onChange={(e) => {
                         setOrganisationName(e.target.value);
                       }}
                     />
                    )}
                       
                      {
                        role==="hospital" &&(
                          <InputType
                          labelFor={"hopitalName"}
                          labelText={"Hospital Name:"}
                          inputType={"text"}
                          name={"hospitalName"}
                          value={hospitalName}
                          onChange={(e) => {
                            setHospitalName(e.target.value);
                          }}
                        />
                        )
                      }

                    <InputType
                    labelFor={"email"}
                    labelText={"Enter Your Email:"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  <InputType
                    labelFor={"password"}
                    labelText={"Enter Your Password:"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputType
                    labelFor={"website"}
                    labelText={"Website Name"}
                    inputType={"tesx"}
                    name={"website"}
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                    }}
                  />
                  <InputType
                    labelFor={"address"}
                    labelText={"Your address"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                  <InputType
                    labelFor={"phone"}
                    labelText={"Phone No."}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-column m-2 ">  
        

          <button className="btn btn-primary" type="submit"  >
            {submitBtn}
          </button>

          {
          formType==="login"?(  
            <p>
              Not Have an Account ? Register <Link to={"/signup"}>Here! </Link>
            </p>
          ):( 
            <p>
            Already  Register ? Please <Link to={"/login"}>Login! </Link>
          </p>
          )
        }
        </div>
      </form>
    </div>
  );
};

export default Form;
