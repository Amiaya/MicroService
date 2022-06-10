import Joi from 'joi'


export const smsValidator = Joi.object({
    from: Joi.string().min(6).max(16).required(),
    to: Joi.string().min(6).max(16).required(),
    text: Joi.string().min(1).max(120).required()
})