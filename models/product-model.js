const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    sku:{type:Number,required:true},
    category:{type:String,required:true},
    subcategory:{type:String,required:true},
    image:{type:String,required:true},
    brand:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    name:{type:String,required:true},
    size:[{type:String,required:true}],
    isFreeShipping:{type:Boolean,required:true}


  },
  {
    timeStamps:true
  }
)

const Products = mongoose.model("Products",productSchema);

module.exports=Products;



