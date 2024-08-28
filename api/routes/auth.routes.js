import express from "express";
import passport from "../passport/google.js";
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL + "/signin",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + "/dashboard");
  }
);
export default router;
