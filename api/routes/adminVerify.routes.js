import express from "express";
import {
  blockUser,
  verifyUser,
} from "../controllers/adminVerify.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import adminRoutes from "../middleware/adminRoute.js";
const router = express.Router();

// later convert them to admin protect
router.put("/verify-user/:id", verifyUser);
router.put("/block-user/:id", blockUser);

export default router;
