// SALES ROUTES


import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();

// routes or endpoint
// for sales in frontend all 4 pages uses same endpoint as they work on same data 
router.get("/sales",getSales)


export default router;