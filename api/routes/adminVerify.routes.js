import express from "express";
import { verifyUser } from "../controllers/adminVerify.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import adminRoutes from "../middleware/adminRoute.js";
const router = express.Router();

router.put("/verify-user/:id", verifyUser);

export default router;
