import express from "express";
import session from "express-session";
import { config } from "dotenv";
import passport from "./passport/google.js";
import connectDb from "./config/db.js";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import adminVerifyRoutes from "./routes/adminVerify.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import blogRoutes from "./routes/blog.routes.js";

config();
const app = express();
app.use(express.json());
const __dirname = path.resolve();

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
app.use("/api/user", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/blog", blogRoutes);

// admin only routes
app.use("/api/admin", adminVerifyRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
const port = process.env.PORT || 8080;
app.listen(port, () => {
  connectDb();
  console.log(`listening on ${port}`);
});
