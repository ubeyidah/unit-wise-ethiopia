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
