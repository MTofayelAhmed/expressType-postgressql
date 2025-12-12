import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
// routes => controller => service 

const router = express.Router()

router.post("/", userController.createUser )
// for get Routes
router.get("/", userController.getUser)

// get single users 

router.get("/:id", userController.getSingleUser)

export const userRoutes = router