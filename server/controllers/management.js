// MANAGEMENT CONTROLLER
// IMP:LOOK AT getUserPeformance FOR AGGREGRATE CALL


import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// FOR GETTING ADMINS
export const getAdmins = async (req, res) => {

    try {
        // grabbing all the admins without their password
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);

    }

    catch (error) {
        res.status(404).json({ message: error.message });
    }
};



// FOR GETTING USER PERFORMANCE
// imp: USE OF AGGREGATE CALL
export const getUserPerformance = async (req, res) => {
    try {
      const { id } = req.params;

        // aggregrate call for AffiliateStat and User
        const userWithStats = await User.aggregate([

            // imp: lookat mongo aggregate doc for match and lookup syntax

            // matching with User data model
            // grabbing id from param and finding the User who has that particular id
            { $match: { _id: new mongoose.Types.ObjectId(id) } },

            // looking up in AffiliateStat data model with that User_id we matched up with id from params
            {
                $lookup: {

                    // collection to join
                    // here: AffiliateStat dataModel
                    from: "affiliatestats",

                    // field from the input documents . here User doc
                    localField: "_id",

                    // foreign field  of compared doc or here AffiliateStats
                    foreignField: "userId",

                    // output array field
                    // it isnot Affiliate datamodel but and new  array field o
                    as: "affiliateStats",
                },

            },

            // $unwind
            // Deconstructs an array field from the input documents to output a document for each element. Each output document is the input document with the value of the array field replaced by the element.
            // imp: look at example what it does in doc of mongo db. easy
            { $unwind: "$affiliateStats" },
        ]);

        // using promise method instead of aggregate call 
        // for affiliate
        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
              return Transaction.findById(id);
            })
          );
          const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
          );
      
          res
            .status(200)
            .json({ user: userWithStats[0], sales: filteredSaleTransactions });
        } catch (error) {
          res.status(404).json({ message: error.message });
        }
      };