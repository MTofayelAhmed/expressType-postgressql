import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { Pool } from "pg";

dotenv.config({ path: path.join(process.cwd(), "/src/.env") });

const app = express();
const port = 5000;

const pool = new Pool({ connectionString: `${process.env.CONNECTION_STRING}` });

const initDB = async () => {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users(
        id  SERIAL PRIMARY KEY ,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        age INT,
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()


        
        )`
  );

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(220) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      )  
        `);
};

initDB();
// parser
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
