//ProductSchema 

// we have to follow the schema format whenever data is passed to mongodb

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    
    {
        // in real life project we have to make them required but for now in small project we dont need to do that
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        supply: Number,
    },
    // time stamp is imp so we want to know when the product was created
    {timestamps:true}
        

);

const Product= mongoose.model("Product", ProductSchema);
export default Product;