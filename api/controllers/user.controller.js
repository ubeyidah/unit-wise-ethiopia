import Source from "../models/source.model.js";
import SubjectComment from "../models/subjectComment.model.js";
import User from "../models/user.model.js";
import { takeInfoSchema } from "../schemas/auth.schema.js";
import { subjectsCommentSchema } from "../schemas/subject.schema.js";

export const takeInfo = async (req, res) => {
  try {
    const {
      studyType,
      gender,
      school,
      phoneNumber,
      status,
      paymentImage,
      source,
      isAccept,
    } = req.body;
    const { error } = takeInfoSchema.validate({
      studyType,
      gender,
      school,
      phoneNumber,
      status,
      paymentImage,
      source,
      isAccept,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (!req.isAuthenticated())
      return res
        .status(401)
        .json({ message: "Unauthorized. You must be logged in first." });
    const userId = req.user._id;

    Promise.all([
      await User.findByIdAndUpdate(userId, {
        studyType,
        gender,
        school,
        phoneNumber,
        status,
        paymentImage,
      }),
      await Source({ userId, source }).save(),
    ]);

    const userToSend = await User.findById(userId);
    if (!userToSend) return res.status(404).json({ message: "user not found" });
    res.status(200).json({ user: userToSend });
  } catch (error) {
    console.log("Error: take info: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const subjectComment = async (req, res) => {
  try {
    const { subject, comment } = req.body;
    const { error } = subjectsCommentSchema.validate({ subject, comment });
    const authorId = req.user._id;
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const subjectCom = await SubjectComment({
      authorId,
      message: comment,
      subject,
    }).save();
    res.status(200).json(subjectCom);
  } catch (error) {
    console.log("Error: subject comment: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getSubjectComments = async (req, res) => {
  const { subject } = req.params;
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 5;
  try {
    const totalComments = await SubjectComment.countDocuments({ subject });
    const totalPages = Math.ceil(totalComments / limit);

    const subjectComments = await SubjectComment.find({ subject })
      .populate("authorId", ["_id", "userName", "profileImage"])
      .populate("replies.userId", ["_id", "userName", "profileImage"])
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      comments: subjectComments,
      totalPages: totalPages || 0,
      currentPage: page,
    });
  } catch (error) {
    console.log("Error: get subject comments: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const likeDeslikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const subjectComment = await SubjectComment.findById(commentId)
      .populate("authorId", ["_id", "userName", "profileImage"])
      .populate("replies.userId", ["_id", "userName", "profileImage"]);
    if (!subjectComment)
      return res.status(404).json({ message: "comment not found" });
    if (subjectComment.likes.includes(userId)) {
      // dislike user
      subjectComment.likes = subjectComment.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
    } else {
      // like user
      subjectComment.likes.push(userId);
    }
    const modified = await subjectComment.save();

    res.status(200).json(modified);
  } catch (error) {
    console.log("Error: subject comments like: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
