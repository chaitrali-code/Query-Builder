import mysql from "mysql2/promise";

// create a connection pool 
const pool = mysql.createPool({
  host: "localhost",     
  user: "root",          
  password: "Chai_2006",  
  database: "school_db", 
});
console.log("Connected to MySQL database");


export default pool;
