import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  likeDeslikeBlog,
  createBlogComment,
  getBlogComments,
  likeDeslikeComments,
  replieBlogComment,
  deleteBlogComment,
  deleteReply,
} from "../controllers/blog.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createBlog);
router.get("/", protectRoute, getBlogs);
router.get("/:id", protectRoute, getBlog);
router.put("/like/:blogId", protectRoute, likeDeslikeBlog);
router.post("/comment/:blogId", protectRoute, createBlogComment);
router.get("/comment/:blogId", protectRoute, getBlogComments);
router.put("/comment/like/:commentId", protectRoute, likeDeslikeComments);
router.put("/comment/reply/:commentId", protectRoute, replieBlogComment);
router.delete("/comment/reply/:replyId", protectRoute, deleteReply);
router.delete("/comment/:commentId", protectRoute, deleteBlogComment);

export default router;
