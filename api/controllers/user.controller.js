import Blog from "../models/blog.model.js";
import Source from "../models/source.model.js";
import SubjectComment from "../models/subjectComment.model.js";
import User from "../models/user.model.js";
import { takeInfoSchema } from "../schemas/auth.schema.js";
import {
  subjectReplieSchema,
  subjectsCommentSchema,
} from "../schemas/subject.schema.js";
import { enrollSubjects } from "../utils/enrollSubjects.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";

export const takeInfo = async (req, res) => {
  try {
    const {
      studyType,
      gender,
      school,
      phoneNumber,
      status,
      // paymentImage,
      source,
      isAccept,
    } = req.body;
    const { error } = takeInfoSchema.validate({
      studyType,
      gender,
      school,
      phoneNumber,
      status,
      // paymentImage,
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

    await Promise.all([
      User.findByIdAndUpdate(userId, {
        studyType,
        gender,
        school,
        phoneNumber,
        status,
        isPaid: true,
      }),
      Source({ userId, source }).save(),
    ]);

    const userToSend = await User.findById(userId);

    await Promise.all([
//      sendWelcomeEmail({
//        email: userToSend.email,
//        res,
//       name: userToSend.fullName,
//      }),
      enrollSubjects(userToSend.studyType, userToSend._id, res),
    ]);
    return res.status(200).json({ message: "welcome" });
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

export const replieComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;
    const { reply } = req.body;
    const { error } = subjectReplieSchema.validate({ reply });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const subjectComment = await SubjectComment.findById(commentId);
    subjectComment.replies.push({ userId, replie: reply });

    const [_, modified] = await Promise.all([
      await subjectComment.save(),
      await SubjectComment.findById(commentId)
        .populate("authorId", ["_id", "userName", "profileImage"])
        .populate("replies.userId", ["_id", "userName", "profileImage"]),
    ]);
    res.status(200).json(modified);
  } catch (error) {
    console.log("Error: replie subject comments: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const authorId = req.user._id.toString();
    const deletedComment = await SubjectComment.findOneAndDelete({
      _id: commentId,
      authorId,
    });
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not deleted " });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log("Error: deleteing subject comments: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const userId = req.user._id;
    const { commentId } = req.body;
    if (!commentId)
      return res.status(400).json({ message: "commentID is required" });
    const modifiedComment = await SubjectComment.findByIdAndUpdate(commentId, {
      $pull: { replies: { _id: replyId, userId } },
    });
    if (!modifiedComment)
      return res.status(400).json({ message: "comment not found" });

    res.status(200).json(modifiedComment);
  } catch (error) {
    console.log("Error: replie subject comments delete: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const myId = req.user._id;
    if (id.toString() === myId.toString())
      return res.status(400).json({ message: "you can not follow your self" });

    const [user, currentUser] = await Promise.all([
      await User.findById(id),
      await User.findById(myId),
    ]);
    if (!user) return res.status(404).json({ message: "comment not found" });

    if (user.followers.includes(myId)) {
      // unlike user
      user.followers = user.followers.filter(
        (followerId) => followerId.toString() !== myId.toString()
      );
      currentUser.following = currentUser.following.filter(
        (followerId) => followerId.toString() !== id.toString()
      );
    } else {
      // like user
      user.followers.push(myId);
      currentUser.following.push(id);
    }
    const [finallUser, _] = await Promise.all([
      user.save(),
      currentUser.save(),
    ]);
    res.status(200).json(finallUser.followers);
  } catch (error) {
    console.log("Error: follow unfollow user: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(400).json({ message: "User not found" });
    const postsCount = await Blog.countDocuments({ author: user._id });
    res.status(200).json({
      user: {
        _id: user._id,
        profileImage: user.profileImage,
        userName: user.userName,
        fullName: user.fullName,
        status: user.status,
        following: user.following,
        followers: user.followers,
        school: user.school,
      },
      postsCount,
    });
  } catch (error) {
    console.log("Error: user profile: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 8; // Limit to 8 posts per page
    const skip = (page - 1) * limit;
    const user = await User.findOne({ userName: username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const blogs = await Blog.find({ author: user._id })
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(limit);
    const totalPosts = await Blog.countDocuments({ author: user._id });
    const blogToSend = blogs.map((blog) => {
      return {
        _id: blog._id,
        title: blog.title,
        coverImage: blog.coverImage,
        createdAt: blog.createdAt,
        likes: blog.likes,
        authorId: blog.author,
      };
    });
    res.status(200).json({
      blogs: blogToSend,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log("Error: get user blogs: ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const getUserLikedBlogs = async (req, res) => {
  try {
    const { username } = req.params;
    const userId = req.user._id;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 8; // Limit to 8 posts per page
    const skip = (page - 1) * limit;

    const user = await User.findOne({ userName: username });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (userId.toString() !== user._id.toString())
      return res.status(401).json({ message: "it is not your profile" });

    const blogs = await Blog.find({ likes: { $in: [user._id] } })
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(limit);
    const totalPosts = await Blog.countDocuments({
      likes: { $in: [user._id] },
    });
    const blogToSend = blogs.map((blog) => {
      return {
        _id: blog._id,
        title: blog.title,
        coverImage: blog.coverImage,
        createdAt: blog.createdAt,
        likes: blog.likes,
        authorId: blog.author,
      };
    });
    res.status(200).json({
      blogs: blogToSend,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log("Error: get user blogs: ", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
