const express= require("express");
const Carts = require("../models/cart-model.js");
//const Users = require("../models/user-model.js");
const Products = require("../models/product-model.js");
const router = express.Router();

router.post("/addtocart", (req,res,next)=>{
    console.log("req.params   ::::::",req.body);
    const {key,name,image,price}  = req.body;
    const user = req.user;
    console.log("here we start............")
    if(user!=undefined){
        Carts.findOne({user:{$eq:user}})
        .then(cartEntry=>{
            console.log("cart found");
            if(cartEntry){
                console.log("cart is",cartEntry);
                cartEntry.products.push(key+"|"+name+"|"+image+"|"+price); 
                cartEntry.cartTotal = cartEntry.cartTotal +price;    
                cartEntry.cartTotal = cartEntry.cartTotal.toFixed(2);  
                console.log("cart is",cartEntry);
            }
            Carts.update({user: user}, {
                products: cartEntry.products,
                cartTotal: cartEntry.cartTotal
            }, function(err, affected, resp) {
               console.log(resp);
            })
        })
        .catch(err=>next(err));
        res.send("/showcart");
    }
})


router.post("/myproducts",(req,res,next)=>{
    console.log("inside myproducts", req.user);
    if(req.user!=undefined){
        Carts.findOne({user:{$eq:req.user._id}})
        .then(cart=>{
            var numberOfProducts=cart.products.length;
            var cartProducts = cart.products;
            var cartTotal = cart.cartTotal;
            console.log("cart products----------------------------------", cartProducts);

            console.log("numberOfProduct is :::---------------------------",numberOfProducts);
            //res.locals.numberOfProducts = numberOfProducts;

            var jsonStr = '{"Products":[]}';
            var jsonObj = JSON.parse(jsonStr);

            cartProducts.forEach(product=>{
                var id  = product.split('|')[0];
                console.log("id ::",id);
                var name = product.split('|')[1];
                console.log("name:: ",name);
                var imagePath = product.split('|')[2];
                console.log("imagePath ::",imagePath);
                var price = product.split('|')[3];
                console.log("price ::",price);
                
                jsonObj['Products'].push({"id":id,"name":name, "imagePath":imagePath,"price":price});
                console.log("json object after iteration ::::", jsonObj);
            });

            var jsonStr = JSON.stringify(jsonObj);
            console.log("json str   :::: ",jsonStr);
            res.json({"numbers":numberOfProducts, "products":jsonStr ,"cartTotal":cartTotal});
        })
        .catch(err=>next(err));
    }
})

function arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
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
            if(cartEntry){
                console.log("cart before remove is ::::::",cartEntry);
                cartEntry.products = arrayRemove(cartEntry.products,productString); 
                cartEntry.cartTotal = cartEntry.cartTotal -price;     
                cartEntry.cartTotal = cartEntry.cartTotal.toFixed(2);         
                console.log("cart after deletion is ::::::",cartEntry.products);
            }
            Carts.updateOne({user: user}, {
                products: cartEntry.products,
                cartTotal: cartEntry.cartTotal
            }, function(err, affected, resp) {
               console.log(resp);
            })
            
        })
        .catch(err=>next(err));
        res.send("/showcart");
    }
    //apply redirect to in else
})

module.exports= router;