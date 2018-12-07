const express= require("express");

const Carts = require("../models/cart-model.js");

const Users = require("../models/user-model.js");

const router = express.Router();


router.get("/addtocart/:key", (req,res,next)=>{
    console.log("current user in cart router ", req.user);
    res.send(req.user)

    
    //need to get current user id here and will apply search in cart schems for that user id 
    //after that will add product key here
    // const {brand,model,price,image,specs} = req.body;
  
    // Phone.create({brand,model,price,image,specs})
  
    // .then(phoneDoc=>res.json(phoneDoc))
    // .catch(err=>next(err));
  })





module.exports= router;