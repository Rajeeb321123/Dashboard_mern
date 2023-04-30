//ProductStatSchema 

// we have to follow the schema format whenever data is passed to mongodb

import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
    
    {
        productId: String,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,

        // nesting :object inside the array 
        monthlyData: [
            {
                // for bigger we have to elaborate the info as we need sales figure and many other figure
                // but as this is a small project we dont need many
                month: String,
                totalSales: Number,
                totalUnits: Number,
            }
        ],

        dailyData: [
            {
              date: String,
              totalSales: Number,
              totalUnits: Number,
            },
        ],
    },
    // time stamp is imp so we want to know when the ProductStat was created
    {timestamps:true}
        

);

const ProductStat= mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;