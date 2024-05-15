const inputValidator = (schema, request) => {
    const { error } = schema.validate(request, { abortEarly: false });
    const errors = {};

    if (error) {
        error.details.forEach((error) => {
            errors[error.context['key']] = error.message;
        })

        return errors;
    }
    return null;
}