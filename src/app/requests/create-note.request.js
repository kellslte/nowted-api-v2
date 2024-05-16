import Joi from "joi"

const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().min(2).max(10000).required(),
    favourite: Joi.boolean().optional(),
    trashed: Joi.boolean().optional(),
    archived: Joi.boolean().optional(),
    author: Joi.string().required()
})

export const CreateNoteRequest = schema;