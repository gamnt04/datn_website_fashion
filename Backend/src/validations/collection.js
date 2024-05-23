import Joi from "joi";

export const collectionValidator = Joi.object({
  name: Joi.string().required().min(1).max(255),
  category: Joi.array().required().min(1).max(255),
});
