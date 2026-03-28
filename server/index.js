const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const PORT = Number(process.env.PORT || 4000);

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_NAME = process.env.DB_NAME || "webdb";

async function createPool() {
  return mysql.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

async function main() {
  const app = express();
  const pool = await createPool();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", async (_req, res) => {
    try {
      await pool.query("SELECT 1");
      res.json({ status: "ok" });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({ status: "error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    const { first_name, last_name, email, contact_number } = req.body || {};

    if (
      !first_name ||
      !last_name ||
      !email ||
      !contact_number ||
      typeof first_name !== "string" ||
      typeof last_name !== "string" ||
      typeof email !== "string" ||
      typeof contact_number !== "string"
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required." });
    }

    try {
      const [result] = await pool.execute(
        `INSERT INTO users (first_name, last_name, email, contact_number) VALUES (?, ?, ?, ?)`,
        [first_name.trim(), last_name.trim(), email.trim(), contact_number.trim()]
      );

      res.status(201).json({
        status: "ok",
        user_id: result.insertId,
      });
    } catch (error) {
      console.error("Error inserting user:", error);

      if (error && error.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          status: "error",
          message: "A user with this email already exists.",
        });
      }

      res.status(500).json({
        status: "error",
        message: "Failed to save user details.",
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
    console.log(
      `Connected to MySQL at ${DB_HOST}:${DB_PORT}, database "${DB_NAME}"`
    );
  });
}

main().catch((error) => {
  console.error("Failed to start backend server:", error);
  process.exit(1);
});

