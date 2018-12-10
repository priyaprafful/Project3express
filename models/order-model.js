const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
        user:{type:Schema.Types.ObjectId, ref:"User",required:true},
        shippingName:{type:String,required:true},
        shippingAddress:{type:String,required:true},
        shippingMobile:{type:Number,required:true}, 
        orderedProducts:[{type:String,required:true}]        
    },{
        timestamps:true,
    });
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;