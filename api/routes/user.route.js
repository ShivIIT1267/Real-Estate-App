// here we will keep all the api routes

import express from "express";

// we import the required res and req data from another file
import { test } from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/test", test);

export default router;
