import Joi from "joi";

export const signinSchema = Joi.object({
  fullName: Joi.string().min(3).max(300),
  userName: Joi.string().min(3).max(227),
  email: Joi.string().email().required(),
  profileImage: Joi.string().uri(),
});
