const sequelize = require("../../configrations/sequelize");
const createTable=()=>{
    sequelize.sync().then((result)=>{
        console.log("connection success");
    }).catch((err)=>{
        console.log("connection err"); 

    })
}
module.exports=createTable; 