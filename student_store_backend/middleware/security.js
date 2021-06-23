const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../utils/errors");

// get schema token
const jwtFrom = ({ headers }) => {
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() === "Bearer") {
            return token;
        }
    }
    return undefined;
};

// attach user to res.locals.user
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = jwtFrom(req);

        if (token) {
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return next();
    } catch (err) {
        return next();
    }
};

// expects user in res.locals, if valid email then return next otherwise auth err
const requireAuthenticatedUser = (req, res, next) => {
    try {
        const { user } = res.locals;
        if (!user?.email) {
            throw new UnauthorizedError();
        }
        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    requireAuthenticatedUser,
    extractUserFromJwt,
};
