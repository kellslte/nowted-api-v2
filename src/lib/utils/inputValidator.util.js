const inputValidator = (schema, request) => {
    const errors = {};
     const {error, value } = schema.validate(request, { abortEarly: false});

    if(error){
        error.details.forEach(err => {
            errors[err.context.key] = String(err.message).replaceAll('\"', '');
        });

        return errors;
    }

    return;
}

export default inputValidator;