const express = require("express");

const Products = require("../models/product-model.js");
const User = require("../models/user-model.js");

const Router = express.Router();

// POST /phones - Create a new phone (add to the list)
Router.post("/seller-form", (req, res, next) => {
  const {
    sku,
    category,
    subcategory,
    image,
    brand,
    price,
    description,
    name,
    size,
    isFreeShipping
  } = req.body;

  Products.create({
    sku,
    category,
    subcategory,
    image,
    brand,
    price,
    description,
    name,
    size,
    isFreeShipping,
    productOwner: req.user._id,
    isVerified: req.user.isVerified
  })

    .then(productsDoc => res.json(productsDoc))
    .catch(err => next(err));
});

//GEt//product/:id-retieve the details of One Seller
Router.get("/products/:id", (req, res, next) => {
  const { id } = req.params;
  Products.findById(id)
    .then(productDoc => {
      res.json(productDoc);
    })
    .catch(err => next(err));
});

Router.put("/products/:id/accept", (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    next(new Error("Not an admin"));
    return;
  }

  const { id } = req.params;

  Products.findByIdAndUpdate(
    id,
    { $set: { isVerified: "verified" } },
    { runValidators: true, new: true }
  )
    .then(productDoc => {
      User.findByIdAndUpdate(
        productDoc.productOwner,
        { $set: { isVerified: "verified" } },
        { runValidators: true, new: true }
      )
        .then(() => res.json(productDoc))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

Router.put("/products/:id/reject", (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    next(new Error("Not an admin"));
    return;
  }

  const { id } = req.params;

  Products.findByIdAndUpdate(
    id,
    { $set: { isVerified: "refused" } },
    { runValidators: true, new: true }
  )
    .then(productDoc => res.json(productDoc))
    .catch(err => next(err));
});

Router.get("/see-products", (req, res, next) => {
  const id = req.user._id;
  const { isVerified } = req.body;

  console.log(id, "hihihihihihiihiihihihihih");
  Products.find({
    productOwner: { $eq: id },
    isVerified: { $eq: "verified" }
  })
    .then(productDoc => {
      console.log(productDoc, "gggggggggggggggggggggggggggggggg");
      res.json(productDoc);
    })
    .catch(err => next(err));
});

module.exports = Router;
