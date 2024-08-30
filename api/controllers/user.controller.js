import Source from "../models/source.model.js";
import User from "../models/user.model.js";
import { takeInfoSchema } from "../schemas/auth.schema.js";

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
