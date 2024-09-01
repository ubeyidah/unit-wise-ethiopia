import User from "../models/user.model.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";
import { enrollSubjects } from "../utils/enrollSubjects.js";
import UserSubjects from "../models/userSubjects.model.js";

export const verifyUser = async (req, res) => {
  try {
    // only for unverify users
    const unverify = req.query.unverify ? true : false;
    const { id } = req.params;
    if (unverify) {
      Promise.all([
        await User.findByIdAndUpdate(id, { isPaid: false, price: 0 }),
        await UserSubjects.deleteMany({ userId: id }),
      ]);
      return res.status(200).json({ message: "User disverify successfully" });
    }

    // for verify user only
    const price = +req.body.price || 0;
    const [updateUser, user] = await Promise.all([
      await User.findByIdAndUpdate(id, { price, isPaid: true }),
      await User.findById(id),
    ]);

    Promise.all([
      await sendWelcomeEmail({ email: user.email, res, name: user.fullName }),
      await enrollSubjects(user.studyType, user._id, res),
    ]);
    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.log("Error: verify users: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(id, { isBlock: !user.isBlock });
    return res.status(200).json({
      message: `${user.userName} ${
        user.isBlock ? "unblocked" : "blocked"
      } successfully.`,
    });
  } catch (error) {
    console.log("Error: verify users: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
