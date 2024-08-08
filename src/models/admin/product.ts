import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please enter product name"],
  },
  productCode: {
    type: String,
    required: [true, "Please enter product code"],
  },
  model: {
    type: String,
    required: [true, "Please enter model"],
  },
  brand: {
    type: String,
    required: [true, "Please enter brand"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  costprice:{
    type:String,
    required:[true,"Please Enter the Cost Price"]
  },
  Sellingprice:{
    type:String,
    required:[true,"Please Enter the Selling Price"]
  }
});

export const Product = model("Product", ProductSchema);
