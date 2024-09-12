import mongoose from "mongoose";
const repliesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  replie: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogComment = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    likes: {
      type: [],
      default: [],
    },
    replies: {
      type: [repliesSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const BlogComment = mongoose.model("BlogComment", blogComment);
export default BlogComment;
