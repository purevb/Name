const mongoose = require("mongoose");

const contactSchema  = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Fisrt name is required"],
        minLength:3,
        maxLength:20,
        trim:true,
        validate:{
            validator: function(value){
                const nameRegex = /^[a-zA-Z\s]*$/;
                return nameRegex.test(value);
            },
            message : "first name must container only alphabetic characters"
        }
        
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"]
    },
    emailAddress:{
        type:String,
        required: [true,"email is required"] 
    }
});
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;