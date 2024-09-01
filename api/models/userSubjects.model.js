import mongoose from "mongoose";

const userSubjectSchema = new mongoose.Schema(
  {
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
