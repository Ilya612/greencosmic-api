import ApiError from "../Exceptions/apiErrors.js";

import adminService from "../Service/adminService.js";
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

    if (!userData) {
      return next(ApiError.UnauthError());
    }

    const role = await adminService.checkAdmin(req.body.id);
    console.log(role);
    if (!role) {
      return next(ApiError.UnauthError());
    }

    if (role != "ADMIN") {
      return next(ApiError.UnauthError());
    }

    next();
  } catch (error) {
    return next(ApiError.UnauthError());
  }
}
