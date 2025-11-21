import { Pool } from "pg";
import databaseConfig from "../config/database.config.js";

const pool = new Pool(databaseConfig);
const query = (text, params) => pool.query(text, params);

export default query;
