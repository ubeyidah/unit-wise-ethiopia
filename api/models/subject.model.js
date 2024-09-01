import mongoose from "mongoose";

const topicsSchema = new mongoose.Schema({
  chapter: {
    type: number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  from: {
    type: {
      grade: number,
      unit: number,
    },
  },
});

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  topics: {
    type: [topicsSchema],
    required: true,
  },
});

const Subjects = mongoose.model("Subject", subjectSchema);
export default Subjects;
