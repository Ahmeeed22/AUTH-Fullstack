const User = require("../model/user.model");
const bcrypt=require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const jwt=require("jsonwebtoken")
const nodeMailer=require("nodeMailer");
const fs = require("fs");
const path = require("path");

// send mail configration
let transPorter=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        
        user:"routeacademycairo3@gmail.com",
        pass:"Routeegypt20110100"
    }
  })


// register user
const register=async(req,res)=>{
   
    let {name,email,password,age,role}=req.body;

    bcrypt.hash(password,7,async(err,hash)=>{
        if (err) throw err;            
            const user=   await User.findOne({where:{email}});
            if (user) {
                res.json({message:"email is already exist"})
            }
            else{
                const token = jwt.sign({ email}, "shhhhh");
            let info=await transPorter.sendMail({
                from:'"Node Test Sendmail Project" <foo@example.com>', // sender address
                to:`${email}`,//list of receivers
                subject:"Hello from node",
                html:`<div><h2 style='color:red;'>hello from zezo</h2><a href='http://localhost:3003/verify/${token}' >verify</a><div>`
        
            })
            
            let user=await User.create({name,email,password:hash,age,role})
                res.status(StatusCodes.CREATED).json({message:"success",user})
            }
})
 
}

// verifyUser
const verifyUser=async(req,res)=>{
    let token=req.params.token;
    let decode=jwt.verify(token,"shhhhh");
    let user=await User.findOne({where:{email:decode.email}});
    if(!user){
      res.status(StatusCodes.BAD_REQUEST).json({message:"invalid email"})
    }else{
      await User.update({verified:true},{where:{email: decode.email}})

    let file = fs.readFileSync(path.join(__dirname,'../../../text.html'))
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    res.write(file)
    res.end()
    }
    
  }
// sing in 
const signIn=async(req,res)=>{
    const {email,password}=req.body;

    
        let user=await User.findOne({where:{email}});
        if(!user){
            res.json({message:"email not exist"})
        }
        else{
            const match =await bcrypt.compare(password,user.password);
           if(match){ 
            const token= jwt.sign({id:user.id,role: user.role,name: user.name,age:user.age,emai:user.email},"shhhhh")
            // console.log(token)
            res.status(StatusCodes.OK).json({message:"success",token:token,name: user.name,email:user.email,age:user.age,password:user.password,id:user.id})


            }else{   

            res.json({message:"password wrong"}) 

           }

        }
}


// update user

const updateUser=async(req,res)=>{
    let id=req.params.id;
    let {name,email,age}=req.body;
   
        let user=await User.findOne({where:{id}});
        if(!user){
            res.json({message:"this user not exist"})
        }
        else{
            const token= jwt.sign({id:user.id,role: user.role,name:name,age:age,emai:email},"shhhhh")
            await User.update({name,email,age},{where:{id}})
            res.json({message:"success",token:token,id:user.id,role: user.role,name:name,age:age,emai:email})
       }
}


// get single user
const getSingleUser=async(req,res)=>{
    let id=req.params.id;
   let user=await User.findOne({where:{id}});
   res.json({message:"success",user});
}

module.exports={verifyUser,register,signIn,updateUser,getSingleUser}