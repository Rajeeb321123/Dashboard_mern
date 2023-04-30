// SCHEMA FOR USER 
// it is also useful for geography we have country value in user model. we dont another separate model for geography

// we have to follow the schema format whenever data is passed to mongodb

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    
        {
            name: {
              type: String,
              required: true,
              min: 2,
              max: 100,
            },
            email: {
              type: String,
              required: true,
              max: 50,
              unique: true,
            },
            password: {
              type: String,
              required: true,
              min: 5,
            },
            city: String,
            state: String,
            country: String,
            occupation: String,
            phoneNumber: String,
            transactions: Array,
            role: {
                type:String,
                // enum means role can be only one of given 3 values , no other than these values
                enum:["user","admin","superadmin"],
                default:"admin",
            },
            
    },
    {timestamps:true}

);

const User= mongoose.model("User", UserSchema);
export default User;