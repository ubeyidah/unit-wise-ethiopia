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
    failureRedirect:
      process.env.CLIENT_URL + "/signin?message=Unexpected error. Try again",
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + "/dashboard");
  }
);

router.get("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out." });
      }
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Failed to destroy session." });
        }
        res.clearCookie("connect.sid"); // clear session cookie
        return res.status(200).json({ success: true });
      });
    });
  } catch (error) {
    console.log("error while logout", error.message);
  }
});

router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ user: req.user });
  } else {
    return res.status(200).json({ user: null });
  }
});
export default router;
