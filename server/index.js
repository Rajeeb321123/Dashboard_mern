// MAIN INDEX JS for server

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// OUR CREATED PAGES, COMPONENTS , STATES, THEME
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"

// import data
import User from './models/User.js';
import Transaction from './models/Transaction.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';

import { dataUser,dataProduct,dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from  "./data/index.js";








// CONFIGURATION: just boilerplate for middleware
// --------------

// so we can setup our environment variable
dotenv.config();

// EXPRESS
const app = express();
// invoking express.json
app.use(express.json());
app.use(helmet());

// allows us to cors origin sharing request
// it is something we need for api call from other server
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

//body-parser 
app.use(bodyParser.json());
//  The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



// ROUTES
// ------

// we have to import clientRoutes, generalRoutes, managementRoutes, salesRoutes
// how we split the api?

// for client pages in app
app.use("/client", clientRoutes);
// for general purpose api: Getting the user and Dashboard
// in generalRoutes of routes folder we have router.get("/user/:id",getUser) so, at end endpoin will be "BaseUrl/general/user/Passed id from frontend"
app.use("/general", generalRoutes);
// for management pages of app
app.use("/management", managementRoutes)
// for sales Pages of app
app.use("/sales", salesRoutes);





// MONGOOSE SETUP
// --------------

const PORT = process.env.PORT || 9000;
// connecting mongoose with MONGO_URL in env
mongoose
  .connect(process.env.MONGO_URL, {
    // setting our parameters
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    // success and error messagenpm
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));


    //INSERTING FAKE DATA IN DATABASE 
    // : once done comment it out so, data isnot passed every time code is run
    // User.insertMany(data) insert data to User folder in database
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);

}).catch((error) => console.log(`${error} did not connect`));


// IMP: 2 most important topic of project 
// aggragete call: management.js of controller
// pagination: client.js of controller




