import express from "express";
import { config } from "dotenv";
import contactRoutes from "./routes/contact.routes.js";
import authRoutes from "./routes/auth.routes.js";
import connectDb from "./config/db.js";
import passport from "./passport/google.js";
import session from "express-session";

config();
const app = express();
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 20 days in milliseconds
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  connectDb();
  console.log(`listening on ${port}`);
});
