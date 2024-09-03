import Joi from "joi";

export const subjectMarkSchema = Joi.object({
  chapter: Joi.string().required(),
  value: Joi.boolean().required(),
});

export const subjectsCommentSchema = Joi.object({
  subject: Joi.string().required(),
  comment: Joi.string().required().min(7).max(200),
});

export const subjectReplieSchema = Joi.object({
  reply: Joi.string().required(),
});
