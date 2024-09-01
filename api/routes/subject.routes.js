import express from "express";
import { getSubject, getSubjects } from "../controllers/subject.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getSubjects);
router.get("/:subject", protectRoute, getSubject);
export default router;
