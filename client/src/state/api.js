// USING REDUX query FOR API CALLS (setting up configuration for api call)

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const api = createApi({
    
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    // tagtype is for identification 
    tagTypes: [ "User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance",
    "Dashboard",],

    // endpoints for our api call
    endpoints: (build) => ({

        // for User endpoint
        getUser: build.query({
            // setting our path
            // we send id as paramter to backend 
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),

        // for Product endpoint
        getProducts: build.query({

            query:()=> `client/products`,
            providesTags: ["Products"],
        }),

        // for Customers endpoint
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),


        // For getting Transaction endpoin
        // as we need to send lots of paramters(params) to backend for sorting and searching , format is alittle different
        getTransactions:build.query({
            query:({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: {page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"]

        }),

        // FOR GETTING THE GEOPGRAPHY
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),

        // FOR GETTING THE SALES
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),

        // FOR GETTING THE ADMINS
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),

        // FOR GETTING THE PERFORMANCE
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],

        }),    
        // FOR DASHBOARD PAGE
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
          }),

        
    })
})


export const {

    // imp:
    // In below useGetUserQuery GetUser is from getUser of above in endpoints and just add use and Query in front and back
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetDashboardQuery,
    useGetUserPerformanceQuery
}=api;


// NOTE:
// imp: redux query can be used to cache the api data so , we dont have to make multiple api call all the time