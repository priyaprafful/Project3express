const express= require("express");
const Orders = require("../models/order-model.js");
const Carts = require("../models/cart-model.js");
const router = express.Router();

router.post("/place-order", (req,res,next)=>{
    console.log("req.params in place order  ::::::",req.body);
    const {shippingName,shippingAddress,shippingMobile, orderedProducts}  = req.body;
    const user = req.user;
    console.log("here we start in placing order   ............")
    if(user!=undefined){
        Orders.create({user,shippingName,shippingAddress,shippingMobile, orderedProducts}).
        then(orderEntry=>{
            console.log("order is placed and ordre id is , ",orderEntry._id);

            Carts.findOne({user:{$eq:user}})
            .then(cartEntry=>{
            console.log("cart found in place order");
            //if(cartEntry){
                console.log("cart is",cartEntry);
                cartEntry.products=[]; 
                cartEntry.cartTotal = 0;    
                console.log("cart is",cartEntry);
            //}
            Carts.update({user: user}, {
                products: cartEntry.products,
                cartTotal: cartEntry.cartTotal
            }, function(err, affected, resp) {
               console.log(resp); //copy pasted
            })
        })
        res.json({"orderId": orderEntry._id});
        }).catch(err => next(err));
        //res.send("/homePage"); //new thing learned
    }
})

module.exports= router;