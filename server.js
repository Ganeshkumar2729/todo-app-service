import express from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import posts from './routes/posts.js'; // Make sure .js extension is used in ES Modules
import cors from 'cors'
dotenv.config();

const app = express();
const port = 8000;

const client = new MongoClient(process.env.ATLAS_URI || "");
app.use(cors());

let db;

(async () => {
  try {
    await client.connect();
    db = client.db("todo-app"); // or your database name
    console.log("✅ Connected to MongoDB Atlas");

    // Middleware
    app.use(express.json());

    // Pass db to routes (if needed)
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    app.use('/api/posts', posts); // Route handler

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e);
  }
})();
