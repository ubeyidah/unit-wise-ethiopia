import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  likeDeslikeComment,
} from "../controllers/blog.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createBlog);
router.get("/", protectRoute, getBlogs);
router.get("/:id", protectRoute, getBlog);
router.put("/like/:blogId", protectRoute, likeDeslikeComment);

export default router;
