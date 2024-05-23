import Joi from "joi";

export const CategoryJoiSchema = Joi.object({
  name: Joi.string().required(),
});
