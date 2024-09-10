import Blog from "../models/blog.model.js";
import { postSchema } from "../schemas/blog.schema.js";

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
    const blogs = await Blog.find()
      .populate("author", ["_id", "userName", "profileImage"])
      .sort({ updatedAt: -1 });
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
    res.status(200).json(blogToSend);
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
