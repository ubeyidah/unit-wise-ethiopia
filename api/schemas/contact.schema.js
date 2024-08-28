import joi from "joi";

export const contactSchema = joi.object({
  name: joi.string().required().min(3),
  school: joi.string().required().min(3),
  email: joi.string().required().email(),
  message: joi.string().required().min(10).max(400),
});
