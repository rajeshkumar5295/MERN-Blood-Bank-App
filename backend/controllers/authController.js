const userModel = require("../modals/userModel")
const bcrypt=require("bcryptjs");
const jwt =require("jsonwebtoken");


const registerController=async(req,res)=>{
     try {   
           const existingUser=await userModel.findOne({email:req.body.email});
           if(existingUser){
            return res.status(200).json({
                message:"Email already exist"
            })
           }
           const hashPassword=await bcrypt.hash(req.body.password,10);
           
           req.body.password=hashPassword;

           const user=new userModel(req.body);
               await user.save();

               res.status(201).json({
                success:true,
                user,
                message:"user Registered successfully",
               })

        
     } catch (error) {
            res.status(500).json({
                success:false,
                message:"Error in Registration",
               error: error.message
            })
     }
}

const loginController=async(req,res)=>{
    try {  
           const user=await userModel.findOne({email:req.body.email});
           if(!user){
            return res.status(404).json({
                message:"Invalid user Creadentials",
                success:false,
            })
           }

           //check role 
           if(user.role !==req.body.role){
            return res.status(500).json({
                success:false,
                message:"role does not matched",
            })
           }

           const comparePassword=await bcrypt.compare(req.body.password,user.password);
           if(!comparePassword){
              return res.status(400).json({
                message:"Invalid user Creadentials password not matched ",
                success:false,
              })
           }

           const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

           res.status(200).json({
            success:true,
            token,
            user,
            message:"Login Successfully",
           })


        
    } catch (error) {  
        res.status(500).json({
            success:false,
            message:"Error in login",
            error:error.message,
        })
        
    }
}

const currentUserContrller=async(req,res)=>{ 
    try {  
            const user =await userModel.findOne({_id:req.body.userId});
            return res.status(200).json({
                success:true,
                message:"User fetched successfully",
                user,
                
            })
        
    } catch (error) {
         res.status(500).json({
            success:false,
            message:"Unable to get current user ",
            error:error.message,
         })
    }

}



module.exports={registerController,loginController ,currentUserContrller}