const Joi = require("joi");

const schema = {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
};

module.exports = schema;
