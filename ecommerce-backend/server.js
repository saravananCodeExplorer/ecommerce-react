const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change to your MySQL username
  password: "", // Change to your MySQL password
  database: "ecommerce_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed!", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// Route to get products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    