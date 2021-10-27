const sequelize = require("../../../configrations/sequelize");
const Sequelize=require("sequelize");
const User=sequelize.define("usser",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      } ,
      role:{
        type:Sequelize.STRING,
        defaultValue: "user"
      },
      verified:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

}) 
module.exports=User;