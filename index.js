const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./routes/contact")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",Contact);


const port = 3000;

const connectToDB= async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/contacts',{
        });
        console.log("Connected To mongo")
    }
    catch(error){ 
        console.log(error);
    }
} 

connectToDB();

app.listen(port,()=>{
console.log("Server started succesfully")
});