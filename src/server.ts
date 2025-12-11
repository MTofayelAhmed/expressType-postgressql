
import express, { NextFunction, Request, Response } from "express";


import config from "./config";
import initDB, { pool } from "./config/db";



const app = express();
const port = config.port;

// initializing DB
initDB();
// parser
app.use(express.json());
app.use(express.urlencoded());
// middleware

const logger = (req: Request, res: Response, next: NextFunction)=> {
  console.log(`[${new Date().toISOString()}] ${req.method}${req.path}`)
  next()
}



app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello World!");
});

// users api post
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name,email])
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

  
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

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
});

// get api for single users 

app.get("/user/:id", async (req: Request, res: Response)=> {
  try {
const result = await pool.query(`SELECT * FROM users WHERE id= $1 `, [req.params.id])
 
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
})
app.put("/user/:id", async (req: Request, res: Response)=> {
const {name, email} = req.body

  try {
const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING * `, [name, email,req.params.id])
 
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
})



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
