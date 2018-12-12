const express = require("express");
const Carts = require("../models/cart-model.js");

const router = express.Router();

router.post("/addtocart", (req, res, next) => {
  const { key, name, image, price } = req.body;
  const user = req.user;
  if (user != undefined) {
    Carts.findOne({ user: { $eq: user } })
      .then(cartEntry => {
        if (cartEntry) {
          cartEntry.products.push(key + "|" + name + "|" + image + "|" + price);
          cartEntry.cartTotal = cartEntry.cartTotal + price;
          cartEntry.cartTotal = cartEntry.cartTotal.toFixed(2);
          //change here
          Carts.findOneAndUpdate(
            { user: user },
            { products: cartEntry.products, cartTotal: cartEntry.cartTotal },
            { runValidators: true, new: true }
          )
            .then(response => {
              res.json({ response });
            })
            .catch(err => next(err));
        } else {
          Carts.create({
            user,
            product: [key + "|" + name + "|" + image + "|" + price]
          })
            .then(response => res.json({ response }))
            .catch(err => next(err));
        }
      })

      .catch(err => next(err));
  }
});

// router.post("/myproducts", (req, res, next) => {
//   console.log("inside myproducts", req.user);
//   if (req.user != undefined) {
//     Carts.findOne({ user: { $eq: req.user._id } })
//       .then(cart => {
//         var jsonStr = '{"Products":[]}';
//         if (!cart) {
//           res.json({ numbers: 0, products: jsonStr, cartTotal: 0 });
//           return;
//         }

router.post("/myproducts", (req, res, next) => {
  if (req.user != undefined) {
    Carts.findOne({ user: { $eq: req.user } })
      .then(cart => {
        var numberOfProducts = cart.products.length; // this is length of products array from cart table
        var cartProducts = cart.products; //this is an arrayof products from cart table
        var cartTotal = cart.cartTotal;
        // now we need a json object to arrange all prodcts data
        var jsonStr = '{"Products":[]}'; // this is a sttring
        var jsonObj = JSON.parse(jsonStr); // converting sgtring to json
        // below functionality is for arranging eachc and every product in json object
        cartProducts.forEach(product => {
          //product element of cartproducts array
          var id = product.split("|")[0];
          var name = product.split("|")[1];
          var imagePath = product.split("|")[2];
          var price = product.split("|")[3];

          jsonObj["Products"].push({
            id: id,
            name: name,
            imagePath: imagePath,
            price: price
          });
        });
        //converting json onject to string so that in
        //response we can send entire json in one property named as products
        var jsonStr = JSON.stringify(jsonObj);
        res.json({
          numbers: numberOfProducts,
          products: jsonStr,
          cartTotal: cartTotal
        });
      })
      .catch(err => next(err));
  }
});

function arrayRemove(arr, value) {
  var index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return arr;
}
router.post("/removeFromcart", (req, res, next) => {
  const { productString, price } = req.body;
  const user = req.user;

  if (user != undefined) {
    Carts.findOne({ user: { $eq: user } })
      .then(cartEntry => {
        cartEntry.products = arrayRemove(cartEntry.products, productString);
        cartEntry.cartTotal = cartEntry.cartTotal - price;
        cartEntry.cartTotal = cartEntry.cartTotal.toFixed(2);
        Carts.updateOne(
          { user: user },
          { products: cartEntry.products, cartTotal: cartEntry.cartTotal }
        ).catch(err => next(err));
      })
      .catch(err => next(err));
    res.send("/showcart");
  }
});

module.exports = router;
