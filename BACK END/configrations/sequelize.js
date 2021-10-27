const Sequelize=require("sequelize");
const sequelize=new Sequelize("sequalize","root","",{
    dialect:"mysql",
    host:"localhost"
})
module.exports=sequelize;