import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
// routes => controller => service 

const router = express.Router()

router.post("/", userController.createUser )
// for get Routes
router.get("/", auth(), userController.getUser)

// get single users 

router.get("/:id", userController.getSingleUser)
router.put("/:id", userController.updateSingleUser )

export const userRoutes = router