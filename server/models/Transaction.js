// TRANSACTION SCHEMA
// VERY IMP FOR PAGINATION



// we have to follow the schema format whenever data is passed to mongodb

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    
    {
        // foreign key
        userId: String,

        // we just keeping cost as string instead of number for this small project 
        cost: String,
        
        // products is a object consisting of array of object ids
        products: {
            
            type: [mongoose.Types.ObjectId],
            of: Number
        }
        
    },
    // time stamp is imp so we want to know when the Transaction was created
    {timestamps:true}
        

);

const Transaction= mongoose.model("Transaction", TransactionSchema);
export default Transaction;