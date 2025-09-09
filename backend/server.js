import express from "express";
import cors from "cors";
import pool from "./db.js"; // Make sure db.js exports mysql2/promise pool

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

// === API endpoint to handle queries ===
app.post("/query", async (req, res) => {
  const { query } = req.body;

  try {
    const sql = buildSQL(query);
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// === Convert custom query string into real SQL safely ===
function buildSQL(query) {
  const base = `SELECT Name, Math, Science, English, Hindi, SocialScience, Marathi, Total, Percentage FROM students`;

  // Match ORDER queries like "Math ORDER DESC LIMIT 5"
  const orderMatch = query.match(/(\w+)\s+ORDER\s+(ASC|DESC)\s+LIMIT\s+(\d+)/i);
  if (orderMatch) {
    const [, field, direction, limit] = orderMatch;
    // Make sure field is valid column to prevent SQL injection
    const validFields = ["Math", "Science", "English", "Hindi", "SocialScience", "Marathi", "Total", "Percentage"];
    if (!validFields.includes(field)) {
      throw new Error("Invalid field in ORDER query");
    }
    return `${base} ORDER BY ${field} ${direction} LIMIT ${limit}`;
  }

  // Match comparison queries like "Math > 80"
  const compareMatch = query.match(/(\w+)\s*(<|>|=)\s*(\d+)/);
  if (compareMatch) {
    const [, field, operator, value] = compareMatch;
    const validFields = ["Math", "Science", "English", "Hindi", "SocialScience", "Marathi", "Total", "Percentage"];
    if (!validFields.includes(field)) {
      throw new Error("Invalid field in WHERE query");
    }
    return `${base} WHERE ${field} ${operator} ${value}`;
  }

  // Default: return all rows
  return base;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
