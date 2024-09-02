import express from "express";
import {
  getSubject,
  getSubjects,
  makeCompleteChapters,
} from "../controllers/subject.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getSubjects);
router.get("/:subject", protectRoute, getSubject);
router.put("/:subject", protectRoute, makeCompleteChapters);
export default router;
