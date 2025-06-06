import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().required(),
  coverImage: Joi.string().required().uri(),
  content: Joi.required(),
  description: Joi.string().required(),
  tags: Joi.array().required().min(1).max(10),
});
