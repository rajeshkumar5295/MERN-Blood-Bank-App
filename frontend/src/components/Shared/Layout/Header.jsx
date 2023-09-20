import React from 'react'

import {BiDonateBlood,BiUserCircle} from "react-icons/bi"
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';



const Header = () => { 
      
    const {user}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    // console.log(user)

    const location=useLocation();

    const handleLogout=()=>{
        localStorage.clear("token");
        toast.success("LogOut Successfully");
        navigate("/login");

    }
         
  return (
       <>
          <nav className='navbar'   >
                <div className="container-fluid">
                    <div className="navbar-brand h1">   <BiDonateBlood style={{color:"red" , fontSize:"23"}} />  Blood Bank App </div> 

                    <ul className="navbar-nav  flex-row "> 
                         <li className="nav-item mx-3 "> <p className="nav-link">  <BiUserCircle style={{color:"blue" ,fontSize:"23px"}} />  Welcome  <span style={{color:"red",textDecoration:"underline"}} > { user?.name ||user?.hospitalName ||user?.organisationName }  </span>  
                         &nbsp;<span className="badge badge-secondary"> {user?.role} </span>   </p>    </li>

                          {
                              ( location.pathname==="/"||  location.pathname==="/donar"||  location.pathname==="/hospital")?(
                                    <li  className='nav-item mx-3' >  
                                        <p  className='nav-link'  >
                                              <Link to="/analytics" > Analatics  </Link>
                                        </p>

                                    </li>
                               ):(
                                <li  className='nav-item mx-3' >  
                                <p  className='nav-link'  >
                                      <Link to="/" > Home  </Link>
                                </p>

                            </li>
                               )
                          }


                          <li className="nav-item mx-3 ">  <button className="btn btn-danger" onClick={handleLogout}  > Logout </button>   </li>
                     </ul>
                </div>
          </nav>
       </>
  )
}

export default Header