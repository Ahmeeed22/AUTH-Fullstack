const {StatusCodes}=require("http-status-codes");

var validationRequest=(schema)=>{
    return(req,res,next)=>{
        const validateArr=[];
        const validateResult=schema.body.validate(req.body);

        if(validateResult.error){
            validateArr.push(validateResult.error.details[0].message)
        }
        if(validateArr.length){
            res.status(StatusCodes.BAD_REQUEST).json({message:validateArr.join()})
        }else{
            next(); 
        }
    }

}

module.exports=validationRequest