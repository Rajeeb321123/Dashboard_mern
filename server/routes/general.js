// GENERAL ROUTES

import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = express.Router();

// getUser is function from controllers
// "/user/:id" is route. so in frontend we have to send like this route. id will be parameter to our getUser function in controller
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;