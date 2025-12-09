import dotenv from "dotenv";
import express, { Request, Response } from "express"






const app = express()
const port = 5000

// parser
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.post("/", (req: Request, res: Response)=> {
    res.status(201).json({success: true, message: "API is working"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



dotenv.config();
require("dotenv").config();
console.log(process.env.PORT);