const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require("multer"); // Import Multer
const path = require("path"); // Import Path for file extensions
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve images statically

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Change if needed
  password: "", // Change if needed
  database: "ecommerce_db",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed!", err);
  } else {
    console.log("Connected to MySQL Database");
  }
});
// Payment API Endpoint
app.post("/api/payments", (req, res) => {
  const { name, cardNumber, expiry, cvv, totalAmount } = req.body;
  
  if (!name || !cardNumber || !expiry || !cvv || !totalAmount) {
    return res.status(400).json({ success: false, error: "All fields are required" });
  }
  
  const orderId = Math.floor(Math.random() * 1000000);
  const transactionId = `TXN${Date.now()}`;

  const sql = `INSERT INTO payment_details (order_id, total_amount, cardholder_name, payment_method, payment_status, transaction_id) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.query(sql, [orderId, totalAmount, name, "Card", "Success", transactionId], (err) => {
    if (err) {
      console.error("Payment error:", err);
      return res.status(500).json({ success: false, error: "Database error" });
    }
    res.json({ success: true, message: "Payment successful", transactionId });
  });
});



// 🟢 Simple Customer Signup Endpoint
app.post("/customers/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Insert customer into the database
  const sql = "INSERT INTO customers (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("❌ Error inserting customer:", err);
      return res.status(500).json({ success: false, message: "Database error." });
    }
    res.status(201).json({ success: true, message: "Signup successful", id: result.insertId });
  });
});

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: "uploads/", // Image save location
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename image
  },
});
const upload = multer({ storage: storage });

// Add Product with Image Upload
app.post("/products/add", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = "INSERT INTO products (name, price, image) VALUES (?, ?, ?)";
  db.query(sql, [name, price, image], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ id: result.insertId, name, price, image });
  });
});

// Get All Products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Update Product with Image Upload
app.put("/products/update/:id", upload.single("image"), (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.existingImage;

  const sql = "UPDATE products SET name=?, price=?, image=? WHERE id=?";
  db.query(sql, [name, price, image, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Product updated successfully" });
  });
});

// Delete Product
app.delete("/products/delete/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Product deleted successfully" });
  });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
