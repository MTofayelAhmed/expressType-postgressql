import { Request, Response } from "express";
import { pool } from "../../config/db";
import { serviceUser } from "./user.service";

  const createUser = async (req: Request, res: Response) => {
 
  try {
const result = await serviceUser.createUser(req.body)


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

const getSingleUser =  async (req: Request, res: Response)=> {
  try {
const result = await serviceUser.getSingleUser(req.params.id as string)
 
if(result.rows.length == 0){
  res.status(404).json({
    message: "data not found"
  })
}
else {
  res.status(200).json({
    success: true,
    message: "fetched single data successfully",
    data: result.rows[0]
  })
}
  }
  catch(err: any){
     res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


const updateSingleUser = async (req: Request, res: Response)=> {
const {name, email} = req.body

  try {
const result = await serviceUser.updateSingleUser(name, email, req.params.id as string)
 
if(result.rows.length == 0){
  res.status(404).json({
    message: "data not found"
  })
}
else {
  res.status(200).json({
    success: true,
    message: "data update successfully",
    data: result.rows[0]
  })
}
  }
  catch(err: any){
     res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
export const userController = {
    createUser, getUser, getSingleUser, updateSingleUser
}