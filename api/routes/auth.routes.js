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

router.get("/logout", (req, res) => {
  req.session.distroy((error) => {
    if (error)
      return res
        .status(400)
        .json({ message: "unable to logout please try agin later." });
    res.status(200).json({ message: "Logout successfully completed" });
  });
});

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(200).json({ user: null });
  }
});
export default router;
