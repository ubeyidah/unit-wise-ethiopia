import express from "express";
import {
  takeInfo,
  subjectComment,
  getSubjectComments,
  likeDeslikeComment,
  replieComment,
  deleteComment,
  deleteReply,
  followUnfollowUser,
  getProfile,
  getUserBlogs,
  getUserLikedBlogs,
} from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/take-info", takeInfo);
router.get("/:username", protectRoute, getProfile);
router.get("/blog/:username", protectRoute, getUserBlogs);
router.get("/blog/liked/:username", protectRoute, getUserLikedBlogs);
router.post("/subject-comment", protectRoute, subjectComment);
router.get("/subject-comments/:subject", protectRoute, getSubjectComments);
router.get("/comment-like/:commentId", protectRoute, likeDeslikeComment);
router.put("/subject-comment/replie/:commentId", protectRoute, replieComment);
router.delete("/subject-comment/:commentId", protectRoute, deleteComment);
router.put("/subject/replie/:replyId", protectRoute, deleteReply);
router.get("/follow/:id", protectRoute, followUnfollowUser);

export default router;
