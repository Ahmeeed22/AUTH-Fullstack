const express= require("express");
const cors = require("cors"); 
require("dotenv").config();
const createTable = require("./modules/users");
const userRoutes = require("./modules/users/routes/user.routes");
const fs = require("fs");
const path = require("path");
const app =express();
const port= process.env.PORT;
app.use(express.json());
app.use(cors());


createTable();
// function to read file of errors logs
const userErrDb = () => {
    const data = fs.readFileSync(path.join(__dirname, "./modules/users/dbErrors/dbErrors.txt"),'utf-8');
    // const parsedData = JSON.parse(data);
    return data;
  };


app.use(userRoutes);

app.use((req, res, next) => {
        res.status === 404
        res.send({
            status: 404,
            error: "not found"
     })
})
//middleware to catch any exception in server and write it in notepad
app.use(function (err, req, res, next) {
    console.error(err.stack)
    let errorsdb=userErrDb();
    let date=new Date();

    fs.writeFileSync(path.join(__dirname,"./modules/users/dbErrors/dbErrors.txt"),`${errorsdb}\n at :- ${JSON.stringify(date)} ${JSON.stringify(err.stack)} `,function(err){
        if(err){
            console.log("err")
        }else{
            console.log("added error to logs")
        }
    })
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});








