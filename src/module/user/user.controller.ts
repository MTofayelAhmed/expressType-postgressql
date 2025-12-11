import { Request, Response } from "express";
import { pool } from "../../config/db";
import { serviceUser } from "./user.service";

  const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
const result = await serviceUser.createUser(name, email)


res.status(201).json({
      success: true,
      message: "data created successfully",
      data: result.rows[0]
    })


  }
  catch (err: any){
    res.status(500).json({
      success: false,
      message: err.message
    })
  }

  
}


const getUser = async (req: Request, res: Response) => {
  try {
    const result = await serviceUser.getUser()

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result.rows
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export const userController = {
    createUser, getUser
}