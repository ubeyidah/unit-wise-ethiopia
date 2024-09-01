import Joi from "joi";
import User from "../models/user.model.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";

const verifySchema = Joi.object({
  price: Joi.number().optional(),
  isPaid: Joi.boolean().required(),
});
export const verifyUser = async (req, res) => {
  try {
    let { price, isPaid } = req.body;
    const { id } = req.params;
    const isToggle = req.query.isToggle ? true : false;
    const { error } = verifySchema.validate({ price, isPaid });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (isToggle) {
      await User.findByIdAndUpdate(id, { isPaid: false, price: 0 });
      return res.status(200).json({ message: "User updated successfully" });
    }
    if (isPaid) {
      price = price || 0;
      const [updateUser, user] = await Promise.all([
        await User.findByIdAndUpdate(id, { price, isPaid }),
        await User.findById(id),
      ]);

      await sendWelcomeEmail({ email: user.email, res, name: user.fullName }),
        // settup subject todo
        res.json({ m: "good to go" });
    }
  } catch (error) {
    console.log("Error: verify users: =>", error.message);
    return res.status(error.status || 500).json({ message: error.message });
  }
};
