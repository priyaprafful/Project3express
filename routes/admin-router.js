const express = require("express");
const Products = require("../models/product-model.js");
const User = require("../models/user-model.js");
const Router = express.Router();

Router.get("/adminlistpage", (req, res, next) => {
  Products.find({ isVerified: { $eq: "notverified" } })
    //send the query results as a JSON response to the client
    .then(productResults => {
      res.json(productResults);
      console.log(productResults);
    })
    .catch(err => next(err));
});

Router.get("/all-users", (req, res, next) => {
  User.find()
    .then(userResults => {
      res.json(userResults);
    })
    .catch(err => next(err));
});

Router.put("/user/:id", (req, res, next) => {
  const { id } = req.params;
  const { userRole } = req.body;
  console.log("REQ BODY", req.body);
  User.findByIdAndUpdate(
    id,
    { $set: { role: userRole } },
    { runValidators: true, new: true }
  )
    .then(response => console.log("resp from database after update", response))
    .catch(err => next(err));
});
module.exports = Router;
