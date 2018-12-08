const express= require("express");

const Carts = require("../models/cart-model.js");

const Users = require("../models/user-model.js");

const router = express.Router();

router.post("/addtocart", (req,res,next)=>{
    console.log("req.params   ::::::",req.body);
        const {key,user}  = req.body;
        console.log("key is :::",key);
        console.log("loggedInUser :::",user);
        console.log("here we start............")
        if(user!=undefined){
            Carts.findOne({user:{$eq:user}})
            .then(cart=>{
                console.log("cart found");
                if(cart){
                    console.log("cart is",cart);
                    cart.products.push(key);
                    
                    console.log("cart is",cart);
                }

                Carts.update({user: user}, {
                    products: cart.products
                }, function(err, affected, resp) {
                   console.log(resp);
                })

            })
            .catch(err=>next(err));
           //res.send(req.user)
    }
    //need to get current user id here and will apply search in cart schems for that user id 
    //after that will add product key here
    // const {brand,model,price,image,specs} = req.body;
  
    // Phone.create({brand,model,price,image,specs})
  
    // .then(phoneDoc=>res.json(phoneDoc))
    // .catch(err=>next(err));
  })

  router.post("/myproducts",(req,res,next)=>{
    //console.log("inside myproducts", req.body);
            
      const {loggedInUser} = req.body;
      if(loggedInUser!=undefined){
          Carts.findOne({user:{$eq:loggedInUser}})
          .then(cart=>{
              var numberOfProducts=cart.products.length;
            console.log("numberOfProduct is :::",numberOfProducts);
            //res.locals.numberOfProducts = numberOfProducts;
            
            res.json({"numbers":numberOfProducts});
            res.json({"numbers":10});

        })
          .catch(err=>next(err));

          }
      

})






module.exports= router;