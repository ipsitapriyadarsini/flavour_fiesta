import dotenv from "dotenv";
import express from "express";
import next from "next";
import mongoose from "mongoose";
import { seedRoles } from "./config/dbSeed";
import recipeRouter from "./routes/recipes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const mongoDbUrl = process.env.MONGODB_URL as string;
  // const db = mongoose.connection;
  mongoose
    .connect(mongoDbUrl)
    .then(() => {
      console.log("Successfully connected to DB");
      seedRoles();
    })
    .catch((err) => {
      console.error("Error connecting to DB:", err);
    });

  // Body parser middleware
  server.use(express.json());
  // parse requests of content-type - application/x-www-form-urlencoded
  server.use(express.urlencoded({ extended: true }));

  // Import API routes
  server.use("/api/test", userRouter); // Test routes
  server.use("/api/auth", authRouter);
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
