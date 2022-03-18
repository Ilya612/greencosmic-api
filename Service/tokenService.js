import jwt from "jsonwebtoken";
import Token from "../Models/jwt-token.js";

class tokenService {
  async generateToken(userDto) {
    const accessToken = jwt.sign(userDto, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30d",
    });
    const refreshToken = jwt.sign(userDto, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  async saveToken(userId, refreshToken) {
    //userId.toString();

    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({
      user: userId,
      refreshToken: refreshToken,
    });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }
  async validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      return userData;
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });

    return tokenData;
  }
}
export default new tokenService();
