const express=require("express")
const dotenv=require( "dotenv")
const connectDb=require("./config/db");
const cors=require("cors");
const morgan = require("morgan");


const app=express();
dotenv.config();

//database connection 
connectDb();

//middleware 
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//Routes  
 
app.use("/api/v1/auth",require("./Routes/authRoutes"));
app.use("/api/v1/inventory",require("./Routes/inventoryRoutes"));
app.use("/api/v1/analytics",require("./Routes/AnalyticRoutes"));
app.use("/api/v1/admin" ,require("./Routes/adminRoute"));

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"This is my new project"
    });
})



const port=process.env.PORT||8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})








