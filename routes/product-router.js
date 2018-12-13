const express = require("express");

const Products = require("../models/product-model.js");

const Router = express.Router();

//Get/product-retrieve the list of product
Router.get("/products", (req, res, next) => {
  Products.find({ isVerified: { $eq: "verified" } })
    //send the query results as a JSON response to the client
    .then(productResults => res.json(productResults))
    .catch(err => next(err));
});
//GEt//product/:id-retieve the details of One product
Router.get("/products/:id", (req, res, next) => {
  const { id } = req.params;
  Products.findById(id)
    .then(productDoc => res.json(productDoc))
    .catch(err => next(err));
});

Router.get("/alltheproducts", (req, res, next) => {
  Products.find()
    //send the query results as a JSON response to the client
    .then(productResults => res.json(productResults))
    .catch(err => next(err));
});

module.exports = Router;
