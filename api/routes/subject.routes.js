import express from "express";
import { getSubjects } from "../controllers/subject.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getSubjects);
export default router;
