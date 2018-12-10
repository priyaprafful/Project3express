const express = require("express");

const Products = require("../models/product-model.js");

const Router = express.Router();

// POST /phones - Create a new phone (add to the list)
router.post("/phones", (req, res, next) => {
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
    isFreeShipping
  })

    .then(productsDoc => res.json(productsDoc))
    .catch(err => next(err));
});
