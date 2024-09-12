import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  likeDeslikeComment,
  createBlogComment,
  getBlogComments,
} from "../controllers/blog.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createBlog);
router.get("/", protectRoute, getBlogs);
router.get("/:id", protectRoute, getBlog);
router.put("/like/:blogId", protectRoute, likeDeslikeComment);
router.post("/comment/:blogId", protectRoute, createBlogComment);
router.get("/comment/:blogId", protectRoute, getBlogComments);

export default router;
