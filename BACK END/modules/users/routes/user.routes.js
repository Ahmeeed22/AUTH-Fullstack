const userRoutes= require("express").Router();
const {addUserSchema, signinSchema}=require("../../users/joi/userValidation");
const validationRequest = require("../../../common/middleware/validationRequest");
const { updateUser, register, getSingleUser, signIn ,verifyUser} = require("../controllers/user.controller");
const catchingErr= require("../../../middlewares/catchingerr")



userRoutes.post('/addUser',validationRequest(addUserSchema),catchingErr(register));
userRoutes.post('/login',validationRequest(signinSchema),catchingErr(signIn))
userRoutes.put('/updateUser/:id',catchingErr(updateUser));
userRoutes.get('/verify/:token',catchingErr(verifyUser))

userRoutes.get('/getSingleUser/:id',catchingErr(getSingleUser))

   



module.exports=userRoutes;
