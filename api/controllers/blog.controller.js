import { postSchema } from "../schemas/blog.schema.js";

export const createBlog = (req, res) => {
  try {
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
  } catch (error) {
    console.log("Error: creating blogs: ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
