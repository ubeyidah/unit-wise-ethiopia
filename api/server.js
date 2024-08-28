import express from "express";
import { config } from "dotenv";
import contactRoutes from "./routes/contact.routes.js";

config();
const app = express();
app.use(express.json());

// routes
app.use("/api/contact", contactRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
