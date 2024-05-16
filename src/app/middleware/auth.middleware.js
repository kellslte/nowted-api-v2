import { verifyToken } from "../providers/auth/jwt.auth-provider.js";
import { UnauthenticatedError } from "../../lib/utils/errorDefinitions.util.js";

const authMiddleware = (req, res, next) => {
    try{
        if(!req.headers.authorization) throw new UnauthenticatedError("Invalid token or token missing from request headers");
        
        const token = req.headers.authorization.split(" ")[1];

        if(!token) throw new UnauthenticatedError("Invalid token or token missing from request headers");

        const payload = verifyToken(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch(err){
        next(err);
    }
}

export default authMiddleware;