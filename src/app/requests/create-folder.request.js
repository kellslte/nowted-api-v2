import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(2).required()
});

export const CreateFolderRequest = schema;