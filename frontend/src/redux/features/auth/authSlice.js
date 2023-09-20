import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authAction";


const token=localStorage.getItem("token") ? localStorage.getItem("token"):null;

const initialState={
    loading:false,
    user:null,
   //  forregisteruser:null,
   //  token:token, or
   token,
    error:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    
    extraReducers:(builder)=>{
              
      // login user  
            
             builder.addCase(userLogin.pending,(state)=>{
                state.loading=true;
                state.error=null;
             })

             builder.addCase(userLogin.fulfilled,(state,{payload})=>{
                
               // alert("after than set data in store");
               // console.log(payload);
                state.loading=false;
                state.user=payload.user;
                state.token=payload.token;

             })
             builder.addCase(userLogin.rejected,(state,{payload})=>{
                  //  console.log(payload);
                state.loading=false;
                state.error=payload
             })
             



             ///  Register user
             builder.addCase(userRegister.pending,(state)=>{
               state.loading=true;
               state.error=null;
            })

            builder.addCase(userRegister.fulfilled,(state,{payload})=>{
                  // alert("executed");
               console.log(payload);
               state.loading=false;
               state.user=payload.user;
               // state.forregisteruser=payload.user;
               // alert("again confirmed executed");
               // console.log(state.forregisteruser);
            

            })
            builder.addCase(userRegister.rejected,(state,{payload})=>{
               state.loading=false;
               state.error=payload
            })




            //CURRENT USER
            builder.addCase(getCurrentUser.pending,(state)=>{
                                 state.loading=true;
                                 state.error=null;


            })
            builder.addCase(getCurrentUser.fulfilled,(state,{payload})=>{
                  // console.log(payload);
                state.loading=false;
                state.user=payload.user;
            })
            builder.addCase(getCurrentUser,(state,{payload})=>{
                  state.loading=false;
                  state.error=payload
            })
    }
});


export default authSlice;