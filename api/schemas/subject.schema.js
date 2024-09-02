import Joi from "joi";

export const subjectMarkSchema = Joi.object({
  chapter: Joi.string().required(),
  value: Joi.boolean().required(),
});
