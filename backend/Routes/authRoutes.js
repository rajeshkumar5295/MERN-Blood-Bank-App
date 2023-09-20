const express=require( "express");
const { registerController, loginController, currentUserContrller } = require("../controllers/authController");
const authMiddlware = require("../middlewares/authMiddlware");

const router=express.Router();

router.post("/register" ,registerController);

router.post("/login",loginController);


//for current user
router.get("/current-user",   authMiddlware  ,  currentUserContrller);


module.exports=router;