import express from "express";
import {
  takeInfo,
  subjectComment,
  getSubjectComments,
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/take-info", takeInfo);
router.post("/subject-comment", subjectComment);
router.get("/subject-comments/:subject", getSubjectComments);

export default router;
