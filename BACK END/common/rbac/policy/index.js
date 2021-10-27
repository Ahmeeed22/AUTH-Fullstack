const userPolicy=require("./userPolicy");
const adminPolicy=require("./adminPolicy");

const roles = require("../../../enum/roles");


const opts={
    [roles.ADMIN]:{
     can:   adminPolicy
    },
    [roles.USER]:{
      can:  userPolicy
    }
}

module.exports=opts;
