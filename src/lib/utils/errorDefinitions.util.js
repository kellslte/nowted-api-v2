export class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = 'NotFoundError';
        this.statuscode = 404;
    }
}

export class BadRequestError extends Error{
    constructor(message){
        super(message);
        this.name = 'BadRequestError';
        this.statuscode = 400;
    }
}

export class UnauthorizedError extends Error {
    constructor(message){
        super(message);
        this.name = 'UnauthorizedError';
        this.statuscode = 403;
    }
}

export class UnauthenticatedError extends Error {
    constructor(message){
        super(message);
        this.name = 'UnauthenticatedError';
        this.statuscode = 401;
    }
}

export class ConflictError extends Error {
    constructor(message){
        super(message);
        this.name = 'ConflictError';
        this.statuscode = 409;
    }
}

export class InternalServerError extends Error {
    constructor(message){
        super(message);
        this.name = 'InternalServerError';
        this.statuscode = 500;
    }
}

export class ValidationError extends Error {
    constructor(message, errors){
        super(message);
        this.name = 'ValidationError';
        this.statuscode = 422;
        this.errors = errors;
    }
}