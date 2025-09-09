import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user: "db_user",
    password: "OzKeTn!6",
    database: "web_interests_db"
});