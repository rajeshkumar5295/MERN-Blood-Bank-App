const express=require( "express");
const authMiddlware = require("../middlewares/authMiddlware");
const { createInventoryController, getBloodRecordController, getDonarController, getHospitalController, getOrganisationController,getOrganisationHospitalController, getInventoryHospitalController, getRecentInventoryController } = require("../controllers/inventoryController");

const router=express.Router();


// ADD INVENTORY 
 router.post("/create-inventory",authMiddlware,createInventoryController);

 /// GET BLOOD RECORDS
 router.get("/get-bloodrecords",authMiddlware,getBloodRecordController);

 // get recent blood records 
 router.get("/get-recent-bloodrecords",authMiddlware,getRecentInventoryController)

 // get donar records
 router.get("/get-donarrecords",authMiddlware,getDonarController)


//  get hospital records
router.get("/get-hospitalrecords" ,authMiddlware,getHospitalController);

router.get("/get-organisation",authMiddlware,getOrganisationController);

router.get("/get-organisation-for-hospital",authMiddlware,getOrganisationHospitalController);
 

//get hospital blood records 
router.post("/get-inventory-hospital", authMiddlware,getInventoryHospitalController);


module.exports=router;