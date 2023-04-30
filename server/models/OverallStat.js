// SCHEMA FOR OVERSTAT

import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(

    {
        totalCustomers: Number,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,

        // Array of data
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number,
            },
        ],
        dailyData: [
            {
                date: String,
                totalSales: Number,
                totalUnits: Number,
            },
        ],


        // In Mongoose, maps are how you create a nested document with arbitrary keys.
        // eg:
        // console.log(new User({
        //     socialMediaHandles: {
        //       github: 'vkarpov15',
        //       twitter: '@code_barbarian'
        //     }
        //   }).socialMediaHandles);
       
        // using map key will be string of categories and value will be number    
        salesByCategory: {
            type: Map,
            of: Number,
          },
    },
    // time stamp is imp so we want to know when the OverallStat was created
    { timestamps: true }


);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;