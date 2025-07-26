const express=require("express");
const router=express.Router()
const {createClient} =require('../controller/client_controller')

router.route('/').post(createClient)


module.exports=router;