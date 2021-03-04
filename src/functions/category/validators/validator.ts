const Joi = require('joi')
export const createCategorySchema = {
    name: Joi.string().required()
}
export const updateCategorySchema = {
    name: Joi.string().required(),
    pathParameters: Joi.object({
        id: Joi.string().required()
    })
}
export const deleteCategorySchema = {
    pathParameters: Joi.object({
        id: Joi.string().required()
    })
}