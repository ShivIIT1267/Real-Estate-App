// here we will keep all the api routes

import express from "express";

// we import the required res and req data from another file
import {
  getUserListings,
  deleteUser,
  test,
  updateUser,
  getUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";
import { get } from "mongoose";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListings);
router.get('/:id',verifyToken,getUser)
export default router;
