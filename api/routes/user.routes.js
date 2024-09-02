import express from "express";
import { takeInfo, subjectComment } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/take-info", takeInfo);
router.post("/subject-comment", subjectComment);

export default router;
