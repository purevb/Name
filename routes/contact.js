//crud 

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/contact", async(req,res)=>{
try{
    const newContact = new Contact(req.body);
    await newContact.save()
    .then((savedContact) =>{
        console.log(savedContact);
        res.status(201).json({msg:"Contact succesfully saved"});
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({msg:"Unable to create new contact"});

    })

}catch(error){
    console.log(error);
    res.status(500).json({msg:"Unable to save new contact"});
}
}
);

router.get('/contact', async (req,res)=>{
    try{
        Contact.find().then((contacts)=>{
            console.log(contacts);
            res.status(200).json({contacts:contacts});
        }).catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"Unable to save new contact"});
            
                })
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Unable to save new contact"});
            
    }
})

router.get("/contact/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        Contact.findById(id).then((contact)=>{
            console.log(contact);
            res.status(200).json({contact: contact});

        }).catch(error=>{
            console.log(error);
            res.status(500).json({json:"unable to get the contact"})

        })

    }catch{
        console.log(error);
        res.status(500).json({msg:"Unable to get the contact"});
    }
})
// search
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const searchRegex = new RegExp(searchTerm, "i");
        const contacts = await Contact.find({
            $or: [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { emailAddress: searchRegex }
            ]
        });
        console.log(contacts);
        res.status(200).json({ contacts: contacts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to find the contact" });
    }
});
// update 
router.get('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedContact = req.body;
         await Contact.findOneAndUpdate({_id:id},updatedContact,{new:true})
         .then((updatedContact)=>{
            console.log(updatedContact);
            res.status(200).json({msg:"Contact succesfully updated", contact: UpdatedContact});
         }).catch((error)=>{
            console.log(contacts);
            res.status(200).json({ contacts: contacts });    
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Unable to find the contact" });
    }
});
// delete 
router.delete('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
         await Contact.findOneAndDelete(id)
         .then((deletedContact)=>{
            console.log(updatedContact);
            res.status(200).json({msg:"Contact succesfully deleted", contact: deletedContact});
         }).catch((error)=>{
            console.log(contacts);
            res.status(500).json({ msg:"unable to delete the contact" });    
         })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "unable to delete the contact" });
    }
});

module.exports= router;