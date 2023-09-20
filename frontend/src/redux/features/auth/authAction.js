// import  {createAsyncThunk} from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";


/// for login (think as reducer action)
export const userLogin =createAsyncThunk("auth/login", 
      async({role,email,password},{rejectWithValue})=>{
        try {  
               // this is an axios api request using API interceptor as we have made this but you can use previous method also to fetch data
               const {data}=await API.post("/api/v1/auth/login",{role,email,password}); 
                  
              //  alert("first move to home page ")

               // store token
               if(data.success){
                localStorage.setItem("token",data.token)

                toast.success(data.message);
                window.location.replace("/");
               }
              return data;
        } catch (error) {  
              if(error.response && error.response.data.message){
                // console.log(error) 
                // console.log(error.response.data.message)
                return rejectWithValue(error.response.data.message);
              }
              else{
                return rejectWithValue(error.message);
                 
              }
            
        }
      }
)

// register
    export const userRegister=createAsyncThunk("auth/register",
               async({ name,  email,role,password,phone,organisationName,address,hospitalName,website },{rejectWithValue})=>{
                try {  
                     const {data}=await API.post("/api/v1/auth/register" ,{name, email,role,password,phone,organisationName,address,hospitalName,website});
                        
                        
                     if(data.success){
                        alert("Executed successfully");
                      toast.success(data.message);
                      window.location.replace("/login");
                     }  


                  return data;
                  
                } catch (error) {  
                  if(error.response && error.response.data.message){
                    return rejectWithValue(error.response.data.message);
                  }
                  else{
                    return rejectWithValue(error.message);
                     
                  }
                  
                }
               } 
             

    )

/// action for current user
          
      export const getCurrentUser=createAsyncThunk("auth/currentUser",
            async({rejectWithValue})=>{
              try {  
                     const res=await API.get("/api/v1/auth/current-user");
                    //  console.log('Again confirmed')

                     if(res?.data) {
                      return res?.data;
                     }
                
              } catch (error) {
                if(error.response && error.response.data.message){
                  return rejectWithValue(error.response.data.message);
                }
                else{
                  return rejectWithValue(error.message);
                   
                }
              }
            }
        )