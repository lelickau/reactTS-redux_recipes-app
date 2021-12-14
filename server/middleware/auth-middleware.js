const ApiError = require('../exeptions/api-error');
const tokenService = require('../service/token-service');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]; //"Bearer TOKEN"
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userDate = tokenService.validateAccessToken(token);
        if (!userDate) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userDate;
        next();
    } catch (err) {
        return next(ApiError.UnauthorizedError());
    }
}