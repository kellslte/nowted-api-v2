import * as userService from './user.service.js'
import { ConflictError, NotFoundError, UnauthorizedError } from '../../lib/utils/errorDefinitions.util.js'
import { verifyPassword } from '../providers/auth/password.auth-provider.js';
import { createToken } from '../providers/auth/jwt.auth-provider.js'

const createUser = async (payload) => {
    const existingRecord = await userService.findUserByEmail(payload.email)

    if(existingRecord) throw new ConflictError("This email address has already been used");

    const user = await userService.createUser(payload);
    
    return user;
}

const authenticateUser = async (payload) => {
    const user = await userService.findUserByEmail(payload.email);

    if(!user) throw new NotFoundError("A user with this email address does not exist");

    const isValidPassword = await verifyPassword(payload.password, user.password);

    if(!isValidPassword) throw new UnauthorizedError("Your email or password is not valid please check and try again");

    return createToken({
        sub: user._id,
        email: user.email,
        name: user.name,
        // add the folders the user has and the notes too
        // add a notes object with archived, favourite and trashed notes keys and fetch the appropriate records
    });
}

export {
    createUser,
    authenticateUser,
}