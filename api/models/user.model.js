import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    profileImage: {
      type: String,
      required: true,
      trim: true,
    },
    studyType: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["social", "natural", ""],
      default: "",
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female", ""],
      default: "",
    },
    school: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    followers: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [],
    },
    following: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      default: [],
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
