const userModel = require("../modals/userModel")


exports.getgetDonarListController=async(req,res)=>{
    try {  
          const donarData=await userModel.find({role:"donar"}).sort({createdAt:-1});

          return res.status(200).json({
             success:true,
             Totalcount:donarData.length,
             message:"Donar list get successfully",
             donarData,
          })
        
    } catch (error) {  

        res.satatus(500).json({
             success:false,
             message:"Error in Donar List API",
             error,
        })
        
    }
}


exports.getHospitaladminController=async(req,res)=>{
    try {  
          const hospitalData=await userModel.find({role:"hospital"}).sort({createdAt:-1});

          return res.status(200).json({
             success:true,
             Totalcount:hospitalData.length,
             message:"Hospital list get successfully",
             hospitalData,
          })
        
    } catch (error) {  

        res.satatus(500).json({
             success:false,
             message:"Error in Hospital List API",
             error,
        })
        
    }
}


exports.getOrgListController=async(req,res)=>{
    try {  
          const OrgData=await userModel.find({role:"organisation"}).sort({createdAt:-1});

          return res.status(200).json({
             success:true,
             Totalcount:OrgData.length,
             message:"Donar list get successfully",
             OrgData,
          })
        
    } catch (error) {  

        res.satatus(500).json({
             success:false,
             message:"Error in Donar List API",
             error,
        })
        
    }
}

exports.deleteDonarController=async(req,res)=>{
    try {    
          await userModel.findByIdAndDelete(req.params.id);
          
          return res.status(200).json({
            success:true,
            message:"Donar Record deleted successfully",
          })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
             success:fase,
             message:"Error while deleting donar",
             error,
        })
        
    }
}


