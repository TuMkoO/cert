const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      // console.log("auth.middleware error 1");
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      // console.log("auth.middleware error 2");
      return next(ApiError.UnauthorizedError());
    }

    // console.log("auth.middleware/accessToken::: ", accessToken); // токен приходит
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      // console.log("auth.middleware error 3");
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    // console.log("auth.middleware error 4");
    return next(ApiError.UnauthorizedError());
  }
};
