import express from "express";
import {
  takeInfo,
  subjectComment,
  getSubjectComments,
  likeDeslikeComment,
  replieComment,
  deleteComment,
  deleteReply,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/take-info", takeInfo);
router.post("/subject-comment", protectRoute, subjectComment);
router.get("/subject-comments/:subject", protectRoute, getSubjectComments);
router.get("/comment-like/:commentId", protectRoute, likeDeslikeComment);
router.put("/subject-comment/replie/:commentId", protectRoute, replieComment);
router.delete("/subject-comment/:commentId", protectRoute, deleteComment);
router.put("/subject/replie/:replyId", protectRoute, deleteReply);

export default router;
