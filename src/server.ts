
import express, { NextFunction, Request, Response } from "express";


import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./module/user/user.routes";

const app = express();
const port = config.port;

// initializing DB
initDB();
// parser
app.use(express.json());
app.use(express.urlencoded());
// middleware


app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

// users CRUD
app.use("/users", userRoutes)



// get api for single users 
app.get("/users", userRoutes )



   
app.put("/user/:id", userRoutes )



// DELETE API
app.delete("/user/:id", async (req: Request, res: Response)=> {
  try {
const result = await pool.query(`DELETE FROM users WHERE id= $1 `, [req.params.id])
 
if(result.rowCount == 0){
  res.status(404).json({
    message: "data not found"
  })
}
else {
  res.status(200).json({
    success: true,
    message: "Delete single data successfully",
  
  })
}
  }
  catch(err: any){
     res.status(500).json({
      success: false,
      message: err.message,
    });
  }
})

// not found route 
app.use((req, res)=> {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
