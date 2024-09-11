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
