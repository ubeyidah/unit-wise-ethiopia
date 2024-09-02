import mongoose from "mongoose";
const repliesSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  replie: String,
});

const subjectCommentSchema = new mongoose.Schema(
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
    subject: {
      type: String,
      required: true,
      lowercase: true,
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

const SubjectComment = mongoose.model("SubjectComment", subjectCommentSchema);
export default SubjectComment;
