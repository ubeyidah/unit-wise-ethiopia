import Joi from "joi";
import Blog from "../models/blog.model.js";
import { postSchema } from "../schemas/blog.schema.js";
import BlogComment from "../models/blogComment.model.js";
import mongoose from "mongoose";
import { subjectReplieSchema } from "../schemas/subject.schema.js";

export const createBlog = async (req, res) => {
  try {
    const authorId = req.user._id;
    const { title, description, content, tags, coverImage } = req.body;
    const { error } = postSchema.validate({
      title,
      description,
      content,
      tags,
      coverImage,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    await Blog({
      author: authorId,
      title,
      description,
      content,
      tags,
      coverImage,
    }).save();
    res.status(201).json({ message: "blog created successfully" });
  } catch (error) {
    console.log("Error: creating blogs: ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 8; // Limit to 8 posts per page
    const skip = (page - 1) * limit;
    const { search } = req.query;

    const filterCondition = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive search on title
            { tags: { $regex: search, $options: "i" } }, // Case-insensitive search on tags
          ],
        }
      : {};

    const blogs = await Blog.find(filterCondition)
      .populate("author", ["_id", "userName", "profileImage"])
      .skip(skip)
      .sort({ updatedAt: -1 })
      .limit(limit);
    const totalPosts = await Blog.countDocuments(filterCondition);
    const blogToSend = blogs.map((blog) => {
      return {
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        coverImage: blog.coverImage,
        updatedAt: blog.updatedAt,
        author: blog.author,
        likes: blog.likes,
      };
    });
    res.status(200).json({
      blogs: blogToSend,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log("Error: get blogs: ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", [
      "_id",
      "userName",
      "profileImage",
    ]);
    res.status(200).json(blog);
  } catch (error) {
    console.log("Error: get blogs: ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const likeDeslikeComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user._id;
    const blog = await Blog.findById(blogId).populate("author", [
      "_id",
      "userName",
      "profileImage",
    ]);
    if (!blog) return res.status(404).json({ message: "blog not found" });
    if (blog.likes.includes(userId)) {
      // dislike user
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    } else {
      // like user
      blog.likes.push(userId);
    }
    const modified = await blog.save();

    res.status(200).json(modified.likes);
  } catch (error) {
    console.log("Error: blog like: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const createBlogComment = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { comment } = req.body;
    const authorId = req.user._id;
    const { error } = Joi.string().required().max(700).validate(comment);

    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const blogCom = await BlogComment({
      authorId,
      message: comment,
      blogId,
    }).save();
    res.status(200).json(blogCom);
  } catch (error) {
    console.log("Error: create comment: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getBlogComments = async (req, res) => {
  const { blogId } = req.params;
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 5;
  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(404).json({ message: "invalid id" }); //
    }
    const totalComments = await BlogComment.countDocuments({ blogId });
    const totalPages = Math.ceil(totalComments / limit);

    const comments = await BlogComment.find({ blogId })
      .populate("authorId", ["_id", "userName", "profileImage"])
      .populate("replies.userId", ["_id", "userName", "profileImage"])
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      comments: comments,
      totalPages: totalPages || 0,
      currentPage: page,
    });
  } catch (error) {
    console.log("Error: get blog comments: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const likeDeslikeComments = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const comment = await BlogComment.findById(commentId)
      .populate("authorId", ["_id", "userName", "profileImage"])
      .populate("replies.userId", ["_id", "userName", "profileImage"]);
    if (!comment) return res.status(404).json({ message: "comment not found" });
    if (comment.likes.includes(userId)) {
      // dislike user
      comment.likes = comment.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    } else {
      // like user
      comment.likes.push(userId);
    }
    const modified = await comment.save();

    res.status(200).json(modified);
  } catch (error) {
    console.log("Error: blog comments like: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const replieBlogComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const { reply } = req.body;
    const { error } = subjectReplieSchema.validate({ reply });
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const comment = await BlogComment.findById(commentId);
    comment.replies.push({ userId, replie: reply });

    const [_, modified] = await Promise.all([
      await comment.save(),
      await BlogComment.findById(commentId)
        .populate("authorId", ["_id", "userName", "profileImage"])
        .populate("replies.userId", ["_id", "userName", "profileImage"]),
    ]);
    res.status(200).json(modified);
  } catch (error) {
    console.log("Error: replie blog comments: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteBlogComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const authorId = req.user._id.toString();
    const deletedComment = await BlogComment.findOneAndDelete({
      _id: commentId,
      authorId,
    });
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not deleted " });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error: deleteing blog comments: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
