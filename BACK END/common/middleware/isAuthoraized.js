const { StatusCodes } = require("http-status-codes");
const jwt=require("jsonwebtoken")
const rbac = require('../rbac/rbac');
module.exports=(endpoint)=>{
    return async (req,res,next)=>{ 
       
        const token = req.headers.authorization.split(' ')[1];
        const data=jwt.verify(token,"shhhhh"); 
        const role=data.role;
        req.role=role;
        const isAllowed=await rbac.can(role,endpoint)
        console.log(isAllowed)
        if(isAllowed){
            next() 
        }else{
            res.status(StatusCodes.UNAUTHORIZED).json({message:"UnAuth"})
    }

    }
} 