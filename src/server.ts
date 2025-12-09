import dotenv from "dotenv";
import express, { Request, Response } from "express"
import { Pool} from "pg"
// import { Query } from './../node_modules/@types/pg/index.d';






const app = express()
const port = 5000

const pool = new Pool({connectionString: `postgresql://neondb_owner:npg_d9tShvXJDMw7@ep-polished-cherry-advljdxs-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

})

const initDB = async ()=> {
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
    )

    await pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(220) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMEsTAMP DEFAULT NOW()

      )  
        `)

}

initDB()
// parser
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post("/", (req: Request, res: Response)=> {

    console.log(req.body)
    res.status(201).json({success: true, message: "API is working"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



dotenv.config();
require("dotenv").config();
console.log(process.env.PORT);