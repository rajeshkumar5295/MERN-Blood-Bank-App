const mongoose=require("mongoose");
const inventoryModel = require("../modals/inventoryModel");

exports.analyticBloodController=async(req,res)=>{
    try { 
            const bloodGroups=['O+','O-','AB-','AB+',"A+",'A-','B+','B-'];
            const bloodGroupData=[]
            const organisation=new mongoose.Types.ObjectId(req.body.userId);

            //get single blood group
            await Promise.all( 
                   bloodGroups.map(async(bloodGroup)=>{
                      
                    // count total in 
                     const totalIn=await inventoryModel.aggregate([
                        {
                            $match:{
                                bloodGroup:bloodGroup,
                                inventoryType:"in",
                                // organisation,
    
                            }
                          },

                          {
                            $group:{
                                _id:null,
                                total:{$sum:"$quantity"},
                            }
                          }
                     ]);
                     
                     // count total out
                     const totalOut=await inventoryModel.aggregate([

                           {
                              $match:{
                                bloodGroup:bloodGroup,
                                inventoryType:"out",
                                // organisation,
                              },
                           },

                           {
                            $group:{
                                _id:null,
                                total:{$sum:"quantity"},
                            },
                           }
                     ])
                    
                     // calculate total
                     const availabelBlood=(totalIn[0]?.total||0)-(totalOut[0]?.total || 0)

                    
                     // Push Data
                     bloodGroupData.push({
                        bloodGroup,
                        totalIn:totalIn[0]?.total||0,
                        totalOut:totalOut[0]?.total || 0 ,
                        availabelBlood      
                    
                    })



                   })
            );

            return res.status(200).json({
                success:true,
                message:"Blood Group Data Fetch Successfully",
                bloodGroupData,

            })


            
    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Error in Bloodgroup Data Analytics API",
            error,
        })
        
    }
}


