import ApiError from "../Exceptions/apiErrors.js";
import tokenService from "../Service/tokenService.js";

export default async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(ApiError.UnauthError());
    }

    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthError());
    }

    const userData = await tokenService.validateAccessToken(accessToken);
    console.log(userData);
    if (!userData) {
      return next(ApiError.UnauthError());
    }
    console.log(userData.successfullPayment);
    if (!userData.successfullPaymnet) {
      return next(ApiError.BadRequest());
    }

    req.user = userData;

    next();
  } catch (error) {
    return next(ApiError.UnauthError());
  }
}
