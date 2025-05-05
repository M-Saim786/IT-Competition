const Joi = require("joi");

const userValidation = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    // image: Joi.string().optional(),
    course: Joi.string().min(2).max(100).required(),
    fees: Joi.string().min(2).max(100).required(),
    gender: Joi.string().valid('Male', 'Female',"Other").required(),    // isAvailable: Joi.boolean().default(true),
    // restaurantId: Joi.string().hex().length(24).required(),
});

module.exports = userValidation;
