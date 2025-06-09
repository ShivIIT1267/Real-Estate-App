// here we will keep all the api routes

import express from "express";

// we import the required res and req data from another file
import { test } from "../controllers/user.controllers.js";

const router = express.Router();

// we will keep this file in every folder, and
// like here it has /test and many others, we will
// the router will see which among all such links and do
// message accordingly

router.get("/test", test);

export default router;
