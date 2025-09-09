import mysql from "mysql2/promise";

// create a connection pool 
const pool = mysql.createPool({
  host: "localhost",     // your MySQL host
  user: "root",          // your MySQL username
  password: "Chai_2006",  // your MySQL password
  database: "school_db", // your DB name
});
console.log("Connected to MySQL database");


export default pool;