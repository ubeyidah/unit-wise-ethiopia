import express from "express";
import { config } from "dotenv";
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectDb from "./config/db.js";

config();
const app = express();
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  connectDb();
  console.log(`listening on ${port}`);
});
