import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" })); // allow React frontend
app.use(express.json()); // parse JSON bodies

// === API endpoint to handle queries ===
app.post("/query", async (req, res) => {
  const { query } = req.body; // e.g. "Math ORDER DESC LIMIT 5"

  try {
    // convert custom query syntax into SQL
    let sql = buildSQL(query);

    const [rows] = await pool.query(sql); // run query
    res.json(rows); // send results to frontend
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// === Convert custom query string into real SQL ===
function buildSQL(query) {
  
  // Example: "Math ORDER DESC LIMIT 5"
  // → "SELECT name, Math FROM students ORDER BY Math DESC LIMIT 5"

  let base = "SELECT name, Math, Science, English, Hindi, SocialScience, Marathi, Total, Percentage FROM students";

  if (query.includes("ORDER")) {
    const [field, , direction, , limit] = query.split(" ");
    return `${base} ORDER BY ${field} ${direction} LIMIT ${limit}`;
  }

  if (query.includes("<") || query.includes(">") || query.includes("=")) {
    return `${base} WHERE ${query}`;
  }

  return base; // default: show all
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});