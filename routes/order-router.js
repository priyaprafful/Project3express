const express= require("express");
const Orders = require("../models/order-model.js");
const Carts = require("../models/cart-model.js");
const router = express.Router();

router.post("/place-order", (req,res,next)=>{
    
    
    const {shippingName,shippingAddress,shippingMobile, orderedProducts}  = req.body;
    const user = req.user;
   if(user!=undefined){
        Orders.create({user,shippingName,shippingAddress,shippingMobile, orderedProducts})
        .then(orderEntry=>{
           Carts.findOne({user:{$eq:user}})
            .then(cartEntry=>{
               cartEntry.products=[]; 
                cartEntry.cartTotal = 0;    
               Carts.updateOne(
                    {user: user},
                    {products: cartEntry.products,
                    cartTotal: cartEntry.cartTotal},
                )
                .then(response => res.json({"orderId": orderEntry._id}))
                .catch(err => next(err))
            })
            .catch(err =>next(err))
        }).catch(err => next(err));
        //res.send("/homePage"); //new thing learned
    }
})

module.exports= router;