const express= require("express");
const Carts = require("../models/cart-model.js");

const router = express.Router();

router.post("/addtocart", (req,res,next)=>{
    const {key,name,image,price}  = req.body;
    const user = req.user;
    console.log(user)
    if(user!=undefined){
        Carts.findOne({user:{$eq:user}})
        .then(cartEntry=>{
            if (cartEntry){
                console.log("1. cart entry at start after finding cart in table", cartEntry)
                    cartEntry.products.push(key+"|"+name+"|"+image+"|"+price); 
                    console.log("2. cart products", cartEntry.products)

                    cartEntry.cartTotal = cartEntry.cartTotal + price;
                    console.log("3. cart total is ", cartEntry.cartTotal)    
                    cartEntry.cartTotal = cartEntry.cartTotal.toFixed(2);  
                    console.log("4. after change cart is",cartEntry)
                    //change here
                Carts.updateOne(
                    {user: user},
                    {products: cartEntry.products,
                    cartTotal: cartEntry.cartTotal}, {new : true}
                )
                .then(response => {
                    console.log("5.response after addition in cart   :::: ", response);
                    res.json({response})
                })
                .catch(err => next(err))
            } else {
                Carts.create({user, product: [key+"|"+name+"|"+image+"|"+price]})
                .then(response =>
                    res.json({response})
                    )
                .catch(err => next(err))
            }
            //console.log("CARTENTRY", cartEntry)
                
          


        })

        .catch(err=>next(err));
    }
})


router.post("/myproducts",(req,res,next)=>{
    console.log("inside myproducts", req.user);
    if(req.user!=undefined){
        Carts.findOne({user:{$eq:req.user}})
        .then(cart=>{
            var numberOfProducts=cart.products.length;// this is length of products array from cart table
            var cartProducts = cart.products;//this is an arrayof products from cart table
            var cartTotal = cart.cartTotal;
            // now we need a json object to arrange all prodcts data
            var jsonStr = '{"Products":[]}';// this is a sttring
            var jsonObj = JSON.parse(jsonStr); // converting sgtring to json
            // below functionality is for arranging eachc and every product in json object
            cartProducts.forEach(product=>{
                //product element of cartproducts array
                var id  = product.split('|')[0];
                //console.log("id ::",id);
                var name = product.split('|')[1];
                //console.log("name:: ",name);
                var imagePath = product.split('|')[2];
                //console.log("imagePath ::",imagePath);
                var price = product.split('|')[3];
                //console.log("price ::",price);
        
                jsonObj['Products'].push({"id":id,"name":name, "imagePath":imagePath,"price":price});
                console.log("json object after iteration ::::", jsonObj);
            });
                //converting json onject to string so that in 
                //response we can send entire json in one property named as products
            var jsonStr = JSON.stringify(jsonObj);
            console.log("json str   :::: ",jsonStr);
            res.json({"numbers":numberOfProducts, "products":jsonStr ,"cartTotal":cartTotal});
        })
        .catch(err=>next(err));
    }
})


function arrayRemove(arr, value) {
    var index = arr.indexOf(value); 
    //console.log("---------------------------index ", index);   
    if (index !== -1) {
         arr.splice(index, 1);
        } 
    return arr;
 }
router.post("/removeFromcart", (req,res,next)=>{

    console.log("inside remove from cart");
    console.log("req.params   ::::::",req.body);
    const {productString,price}  = req.body;
    const user = req.user;
    console.log("here we start to remove ............")
    if(user!=undefined){
        Carts.findOne({user:{$eq:user}})
        .then(cartEntry=>{
            console.log("cart found");
            //if(cartEntry){
                console.log("cart before remove is ::::::",cartEntry);
                cartEntry.products = arrayRemove(cartEntry.products,productString); 
                cartEntry.cartTotal = cartEntry.cartTotal -price;     
                cartEntry.cartTotal = cartEntry.cartTotal.toFixed(2);         
                console.log("cart after deletion is ::::::",cartEntry.products);
            //}
            Carts.updateOne(
                {user: user},
                {products: cartEntry.products,
                cartTotal: cartEntry.cartTotal},
            )
            .catch(err => next(err))
            
        })
        .catch(err=>next(err));
         res.send("/showcart");
    }
    //apply redirect to in else
})

module.exports= router;