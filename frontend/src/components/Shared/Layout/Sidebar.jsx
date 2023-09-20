import React from "react";
import { useLocation, Link } from "react-router-dom";
// import { userMenu } from './Menus/userMenu';
import { useSelector } from "react-redux";

import "../../../styles/Layout.css";
const Sidebar = () => {
  const location = useLocation();
  //  console.log(location)

  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="sidebar">
        <div className="menu">

          {/* role organisation  */}
          {user?.role === "organisation" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"> </i>
                <Link to="/"> Inventory </Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
              >
                <i className="fa-hand-holding-medical"> </i>
                <Link to="/donar"> Donar </Link>
              </div>
              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"> </i>
                <Link to="/hospital"> Hospital </Link>
              </div>
            </>
          )}


        {/* role donar or hospital  */}
          {(user?.role === "donar" || user?.role === "hospital") && (
            <div
              className={`menu-item ${
                location.pathname === "/organisation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"> </i>
              <Link to="/organisation"> Organisation </Link>
            </div>
          )}


          {/* role hospital  */}
           {user?.role === "hospital"  && (
            <div
              className={`menu-item ${
                location.pathname === "/consumer" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"> </i>
              <Link to="/consumer"> Consumer </Link>
            </div>
          )}

        {/* role donar  */}
          {user?.role === "donar"  && (
            <div
              className={`menu-item ${
                location.pathname === "/donation" && "active"
              }`}
            >
              <i className="fa-sharp fa-solid fa-building-ngo"> </i>
              <Link to="/donation"> Donation  </Link>
            </div>
          )}


             {/* role organisation  */}
             {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/donar-list" && "active"}`}
              >
                <i className="fa-solid fa-warehouse"> </i>
                <Link to="/donar-list"> Donar List  </Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
              >


                <i className="fa-solid fa-house-medical-circle-check"> </i>
                <Link to="/hospital-list"> Hospital List </Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
              >
                <i className="fa-solid fa-hospital"> </i>
                <Link to="/org-list"> Organisation List </Link>
              </div>
            </>
          )}

               
                 


          {/* {
                           userMenu.map((menu)=>{
                               const isActive=location.pathname===menu.path;
                               return (
                                    <div  className={`menu-item ${isActive && "active"}`} >  
                                          <i className={menu.icon} > </i>
                                          <Link to={menu.path} > {menu.name} </Link>
                                    </div>

                               )
                           })
                     } */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
