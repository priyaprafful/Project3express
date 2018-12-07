const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema(
    {
         user:{type:Schema.Types.ObjectId, ref:"User",//tell Mongoose this Id connects to the User Model
              required:true},
        //email:{type:String},
        products:[{type:String}]   
        
    },{
        timestamps:true,
    });

    const Cart = mongoose.model("Cart",cartSchema);

    module.exports = Cart;    
    
        
