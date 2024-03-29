const mongoose=require("mongoose")


 const connectDb=async()=>{
    try {  
           const conn= await mongoose.connect(process.env.MONGODB_URL);
           console.log(`Database connected to ${conn.connection.host}`);

        
    } catch (error) { 
        console.log(  `Error in connecting database${error}`);
        
    }
 }

 module.exports=connectDb;