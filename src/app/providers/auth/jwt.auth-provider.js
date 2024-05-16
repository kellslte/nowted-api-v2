import jwt from 'jsonwebtoken'
import appConfig from '../../../lib/config/app.config.js'
import { UnauthorizedError } from '../../../lib/utils/errorDefinitions.util.js'

const {secret, expiresIn} = appConfig.jwt

const createToken = (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn })
    return token;
}

const verifyToken = (token) => {
    return jwt.verify(token, secret, (err, decoded) => {
        if(err) throw new UnauthorizedError(err.message);
        return decoded;
    })
}

export {
    createToken,
    verifyToken
}