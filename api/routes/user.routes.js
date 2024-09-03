import express from "express";
import {
  takeInfo,
  subjectComment,
  getSubjectComments,
  likeDeslikeComment,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/take-info", takeInfo);
router.post("/subject-comment", protectRoute, subjectComment);
router.get("/subject-comments/:subject", protectRoute, getSubjectComments);
router.get("/comment-like/:commentId", likeDeslikeComment);

export default router;
