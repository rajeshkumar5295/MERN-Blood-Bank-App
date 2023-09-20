const express=require("express");

const authMiddlware =require("../middlewares/authMiddlware");
const { getgetDonarListController,getHospitaladminController,getOrgListController,deleteDonarController } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router=express.Router();

router.get("/donar-list" , authMiddlware,adminMiddleware,  getgetDonarListController);

router.get("/hospital-list",authMiddlware,adminMiddleware,getHospitaladminController);

router.get("/organisation-list",authMiddlware,adminMiddleware,getOrgListController);


router.delete("/delete-donar/:id",authMiddlware,adminMiddleware,deleteDonarController);

module.exports=router;
