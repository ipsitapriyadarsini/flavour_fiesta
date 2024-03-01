import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import next from "next";
import mongoose from "mongoose";
import recipeRouter from "./routes/recipes";

dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const mongoDbUrl: string = process.env.MONGODB_URL as string;
  mongoose.connect(mongoDbUrl);
  const db = mongoose.connection;

  db.on("open", () => {
    console.log("connected...");
  });

  // Handle MongoDB connection error
  db.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  // Body parser middleware
  server.use(express.json());

  // Import API routes
  server.use("/recipes", recipeRouter);

  // Next.js page handling
  server.get("*", (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    // if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log("server started");
  });
});
