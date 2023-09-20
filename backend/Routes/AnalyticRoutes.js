const express=require("express");

const router=express.Router();

const authMiddlware=require("../middlewares/authMiddlware");
const { analyticBloodController } = require("../controllers/AnalyticController");

router.get("/analytics-bloodRecord",authMiddlware,analyticBloodController);



module.exports=router;





