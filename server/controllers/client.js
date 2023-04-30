// CONTROLLER FOR CLIENT
// in getProducts: we didnot use  aggregrate call which is most imp topic of this whole project but we used slow method promise
// looke at manangement .js for aggregrate call
// IMP: LOOK AT getTransaction FOR PAGINATION 

import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";



// FOR GETTING THE PRODUCTS 
export const getProducts = async (req, res) => {
    try {

        // finding all products
        const products = await Product.find();

        // grabbing each product to get all info if it
        // promise is merging multiple api calls ,in case of combining responses , comparing datas and many more uses
        const productsWithStats = await Promise.all(



            // mapping through products
            products.map(async (product) => {

                // very imp: we also want productStat which is separate than product in database
                // we have to ask mongodb for each product's productStat

                 
                // MOST IMP TOPIC OF THIS PROJECT : AGGREGRATE CALL IN MONGODB but we donot use it here but we used it in management.js in controller
                // this query is slow method. In real project we can combine 2 database like JOINT in sql databases. we use aggregate type functions (similar to JOINT, UNION  in sql) for mongodb in real project
                // finding ProductStat of product by compoaring _id from product and productId in ProductStat
                // using foreign key  in ProductStat which point to _id in Product 
                const stat = await ProductStat.find({

                    productId: product._id
                })

                // returning a array of object with stat
                return {
                    // while using mongo db we use syntax like below.
                    // we dont know why we use ._doc
                    ...product._doc,
                    stat,
                }
            })

        );

        res.status(200).json(productsWithStats);



    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// FOR GETTING CUSTOMERS
export const getCustomers = async (req, res) => {
    try {

        // role user: will be our customer
        // role admin : can access
        // role super admin : can access and manage
        // we use -password to elimnate the password of users here
        const customers = await User.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};



// FOR GETTING TRANSACTION
// imp: we are doing some server side pagination here
export const getTransactions = async (req, res) => {

    try {

        // grabbing some value from our query from our front end
        // sort should look like this : { "field": "userId", "sort":"desc"}
        // destructing page , pageSize ,sort serach from frontend . their value below are just default values
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        // the way we want to format 
        // formatted sort should look like { userId: -1 }
        // making generateSort function for this purpose
        const generateSort = () => {

            // parsing the sort we got from frontend 
            // JSON parsing is the process of converting a JSON object in text format to a Javascript object that can be used inside a program
            const sortParsed = JSON.parse(sort);


            const sortFormatted = {

                // 1 is for ascending in mongodb and -1 is for descending in mongodb
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };

            return sortFormatted;
        }

        // we run generateSort() only if sort exist
        // Boolean(sort) checks sort exist or not
        const sortFormatted = Boolean(sort) ? generateSort() : {};


        const transactions = await Transaction.find({

            // $or allow multiple search
            // search value is from frontend and we set it up here
            // we can search for userId and cost
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }

            ],

            // .sort provide sorting along side serach
        })
            .sort(sortFormatted)
            // helps to skip to the required page
            .skip(page * pageSize)
            // setting our pageSize
            .limit(pageSize);

        // for total no of all documents in mongo db for the 
        // for that we need another query
        // we have differently than taught by Edroh in youtube because it was showing 0 every time for total
        const total = await Transaction.countDocuments({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } }

            ],
        });

        res.status(200).json({
            transactions,
            total,
        });

    }

    catch (error) {
        res.status(404).json({ message: error.message });
    }
};


// FOR GETTING THE GEOGRAPHY
export const getGeography = async (req, res) => {

    try {

        const users = await User.find();

        // formatting the users into way the nivo chart can understand
        // in our fake data for dataUser we have country: "PH" but nivo chart chloropeth need  id:"AGO" for countries
        // so we will we using npm i country-iso-2-to-3 for changing country with 2 symbol to 3 symbol

        // reduce() works on array, return single value(accumulated value), donot work on empty value, donot change original arrray
        // acc or accumulater is a empty object . we put value to acc for each item  as we go on in array od users with country
        // learn how reduce() work from figure from khan academy
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = getCountryIso3(country);

            // if acc for that country donot exist we create the acc[country] and set value = 0 initially
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }

            // we will be increasing t he value with each time we get that country
            acc[countryISO3]++;

            // we will be returning acc
            return acc;
        },
            //   initial empty object  or value
            {});
        //   at the end : key will be country and value will be no ou user for that country . we will be returning a single object
        // value of mapped location will be like {IDN:35, PER:3,} 
        

        // as we know from docs of nivo chloropeth we need [{id:"AGI","value":24},{"id":"CHN", "value":8}]

        // The entries() method returns a new array iterator object that contains the key/value pairs for each index in the array

        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            // country: key and count is value 
            // [] means their array 
            
            // formatted for  nivo chloropeth
            return { id: country, value: count }
        }
        );

        res.status(200).json(formattedLocations);

    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
