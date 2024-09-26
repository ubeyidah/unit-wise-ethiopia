import Joi from "joi";

export const signinSchema = Joi.object({
  fullName: Joi.string().min(3).max(300),
  userName: Joi.string().min(3).max(227),
  email: Joi.string().email().required(),
  profileImage: Joi.string().uri(),
});

export const takeInfoSchema = Joi.object({
  studyType: Joi.string().valid("natural", "social").required(),
  gender: Joi.string().valid("male", "female").required(),
  school: Joi.string().required(),
  phoneNumber: Joi.string().min(10).max(14),
  status: Joi.string().valid("student", "teacher").required(),
  // paymentImage: Joi.string().uri().required(),
  source: Joi.string().required(),
  isAccept: Joi.boolean().valid(true).required().messages({
    "any.only": "You must accept the terms and conditions to proceed.",
  }),
});
