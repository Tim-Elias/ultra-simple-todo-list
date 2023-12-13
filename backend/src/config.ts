import {Pool} from "pg";
import dotenv from "dotenv";

dotenv.config({path:__dirname+'/./../../.env'});

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

