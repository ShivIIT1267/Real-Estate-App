// here we keep the api route for the signUp page

import express from "express";

// we import the required res and req data from another file
import {
  google,
  signin,
  signup,
  signout,
} from "../controllers/auth.controller.js";

// creating the router
const router = express.Router();

// here we are keeping the post since this router will
// be sending the data from the website to the server
// while .get will be for displying anything
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);

export default router;
