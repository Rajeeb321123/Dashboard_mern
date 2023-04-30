//AffiliateStatSchema 

// we have to follow the schema format whenever data is passed to mongodb

import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
    
    {
      userId:{
        // it has to be a type of mongoose objecId
        // one to one relation as one userId for one AffiliateStat model
        type:mongoose.Types.ObjectId,
        // refrence with User model or database model
        
        ref: "User"
      },

      affiliateSales: {
        // one to many reation as one affiliateSales can have ref of many or array of transaction ids
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
      }



    },
    // time stamp is imp so we want to know when the AffiliateStat was created
    {timestamps:true}
        

);

const AffiliateStat= mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;