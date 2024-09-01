import mongoose from "mongoose";

const userSubjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    subjectProgress: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

const UserSubjects = mongoose.model("UserSubject", userSubjectSchema);
export default UserSubjects;
