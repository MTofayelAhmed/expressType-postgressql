import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });


const config = {
    connection_str: process.env.CONNECTION_STRING,
    port:process.env.PORT
}

export default config;