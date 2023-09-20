const inventoryModel = require("../modals/inventoryModel");
const userModel = require( "../modals/userModel");

const mongoose=require("mongoose");




exports.createInventoryController=async(req,res)=>{
    try {  

          const {email}=req.body;
          // validation
          const user=await userModel.findOne({email});

          if(!user){
                   throw new Error("User not found");
          }
          // if(inventoryType==='in'&& user.role !=='donar'){
          //   throw new Error("not a donar accoutn");
          // }
          // if(inventoryType==='out' && user.role!=='hospital'){
          //   throw new Error("Not a hospital");

          // }

            if(req.body.inventoryType=='out'){
                  const requestedBloodGroup=req.body.bloodGroup;
                  const requestedQuantityOfBlood=req.body.quantity;
                  const organisation=new mongoose.Types.ObjectId(req.body.userId)

                  // calculate in   Blood quantity
                    const totalInOfRequestedBlood=await inventoryModel.aggregate([
                      {
                        $match:{
                          organisation,
                          inventoryType:'in',
                          bloodGroup:requestedBloodGroup
                        }
                      },{
                        $group:{
                          _id:'$bloodGroup',
                          total:{$sum:'$quantity'}
                        }
                      }
                    ])

                    // console.log("Total In " ,totalInOfRequestedBlood )
                    const totalIn=totalInOfRequestedBlood[0]?.total ||0 ;

                    // calculate Out Blood quantity
                    const totalOutRequestedBloodGorup=await inventoryModel.aggregate([
                      {
                          $match:{
                            organisation,
                            inventoryType:'out',
                            bloodGroup:requestedBloodGroup
                          }
                      },

                      {
                         $group:{
                          _id:'$bloodGroup',
                          total:{$sum: '$quantity'}

                         }
                      }
                    ])

                    const totalOut=totalOutRequestedBloodGorup[0]?.total ||0 ;


                    // in & out calculation 
                    const availableQuantityOfBloodGroup=totalIn-totalOut

                    //quantity validation

                    if(availableQuantityOfBloodGroup<requestedQuantityOfBlood){
                      return res.status(500).send({
                        success:false,
                        message:`Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                      })
                    }

                    req.body.hospital=user?._id;

            }
            else{
              req.body.donar=user?._id;
            }
               


          // save record
          const inventory=new inventoryModel(req.body);
          await inventory.save();
          return res.status(201).send({
            success:true,
            message:"New Blood Record Added",
            // inventory,
          })

          
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Create inventory API",
            error:error.message,
        })
        
    }
}

exports.getBloodRecordController=async(req,res)=>{
  try {   
         const inventory=await inventoryModel.find().populate("donar").populate("hospital").sort({createdAt:-1});
         return res.status(200).json({
          success:true,
          message:"get all records successfully",
          inventory,  
         })
    
  } catch (error) {   
    return res.status(500).json({
      success:false,
      message:'Error in getting all  inventory',
      error:error.message
    })
    
  }
}


// Get Donar records

exports.getDonarController=async(req,res)=>{  
    try {    
              const organisation=req.body.userId;
              //find donars 
              const donarId=await inventoryModel.distinct("donar",{organisation,});   
              
              
              console.log(donarId);
              const donars=await userModel.find({_id:{$in:donarId}});

              return res.status(200).send({
                     success:true,
                     message:"Donar Record fetched successfully",
                     donars,
              })

    } catch (error) {  
      console.log(error)
      return res.status(500).json({
        success:false,
        message:'Error in getting donar records',
        error
      })
      
    }

}

// get hospital controller
exports.getHospitalController=async(req,res)=>{
  try {     
        //  const organisation=req.body.userId;
        //  console.log("first Id");
        //  console.log(organisation);
        // //  get hospital id 
        //  const hospitalId=await inventoryModel.distinct("hospital",{organisation});
        //  console.log("second Id");
        //  console.log(hospitalId);
        //  //find hospital
        //  const hospitals=await userModel.find({
        //   _id:{$in:hospitalId},
        //  });
        //  console.log(hospitals);

        //  const hospitals=await userModel.distinct("hospitalName")
        const hospitals =await userModel.find({role:"hospital"});
        //  console.log(hospitals);

      

         return res.status(200).json({
              success:true,
              message:"Hospital Data fetched Successfully",
              hospitals
         })


     } catch (error) {

    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Error in getting hospital records",
      error,
    })
    
  }
}

exports.getOrganisationController=async(req,res)=>{
  try {  
        const donar=req.body.userId;
        // console.log(donar);
        const orgId=await inventoryModel.distinct("organisation",{donar});
      
        // const orgId=await inventoryModel.distinct("organisation");   

        // find org 
        const organisations=await userModel.find({
          _id:{$in:orgId},

        });
         console.log(organisations);
        return res.status(200).json({
            success:true,
            mesage:"Org Data Fetched Successfully",
            organisations
        })
    
  } catch (error) { 
    console.log(error);
    return res.status(500).json({
      success:true,
      message:"Error in ORG API",
      error,
    })

    
  }
}

exports.getOrganisationHospitalController=async(req,res)=>{
  try {
         
       const hospital=req.body.userId;
       const orgId=await inventoryModel.distinct("organisation",{hospital});

       // find org 
       const organisations=await userModel.find({
        _id:{$in:orgId},
       });

       return res.status(200).send({
            success:true,
            messge:"Hospital Org Data Fetched Successfully",
            organisations,

       })

           
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Error in getting Hospital related to Organisation",
      error
    })
    
  }
}


// for consumer
exports.getInventoryHospitalController=async(req,res)=>{
  try {  
         const inventory=await inventoryModel.find(req.body.filters).populate("donar").populate("hospital").populate("organisation").sort({createdAt:-1});
          console.log(inventory);
         return res.status(200).send({
               success:true,
               message:"get hospital consumer records successfully",
               inventory,
         })

    
  } catch (error) {  
    console.log(error)
    return res.status(500).json({
      success:false,
      message:"Error In Getting Consumer Inventory",
      error,
    })
    
  }
}


// get blood record of 3

exports.getRecentInventoryController=async(req,res)=>{
  try {         

    console.log(req.body.userId);
         const inventory=await inventoryModel.find({
                organisation:req.body.userId,
         }).limit(3).sort({createAt:-1});

         return res.status(200).send({
                success:true,
                message:"recent Inventory Data",
                inventory,

         })

      
  } catch (error) {   

       console.log(error);
       return res.status(500).json({
          success:false,
          message:"Error in recent Inventory API",
          API,
       })
      
  }
}