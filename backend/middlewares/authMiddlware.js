const jwt=require("jsonwebtoken")


module.exports=async(req,res,next)=>{
    try{   
        
        const token = req.headers["authorization"].split(" ")[1];


        //  const token=req.headers["authorization"].split(" ")][1];
        // const token=req.headers.authorization
         jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).json({
                    success:false,
                    message:"Auth failed",
                    err,
                });
            }else{
                req.body.userId=decode.userId; 
                next();
            }
         })
   
    }
    catch(error){
        return res.status(401).json({
            success:false,
            error,
            message:"Auth failed",
        })
    }
}