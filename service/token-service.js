const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const config = require("config");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, config.get("jwtRefreshSecret"), {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    // console.log("token-service/ validateAccessToken token::: ", token);
    try {
      //ОШИБКА ===> userData
      const userData = jwt.verify(token, config.get("jwtSecret")); // ERROR
      // console.log("token-service/ validateAccessToken userData::: ", userData);
      return userData;
    } catch (e) {
      // console.log("validateAccessToken userData error!!!");
      return null;
    }
  }

  validateRefreshToken(token) {
    // console.log("validateRefreshToken token::: ", token); //значение приходит
    try {
      //ОШИБКА ===> userData
      const userData = jwt.verify(token, config.get("jwtRefreshSecret"), {
        ignoreExpiration: true,
      }); // ERROR
      // console.log("validateRefreshToken userData::: ", userData);
      return userData;
    } catch (e) {
      // console.log("validateRefreshToken error", e); // TokenExpiredError: jwt expired
      // console.log("validateRefreshToken userData error!!!");
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    // console.log("token-service/saveToken userId:::", userId);
    // console.log("token-service/saveToken refreshToken:::", refreshToken);
    const tokenData = await Token.findOne({ user: userId });
    // console.log("token-service/saveToken tokenData:::", tokenData);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      // console.log("token-service/saveToken tokenData2:::", tokenData);
      return tokenData.save();
    }
    // console.log("token-service/saveToken tokenData3:::", tokenData);
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    // console.log("refreshToken::", refreshToken);
    const tokenData = await Token.deleteOne({ refreshToken });
    // console.log("tokenData:::", tokenData);
    return tokenData;
  }

  async findToken(refreshToken) {
    // console.log("findToken::: ", refreshToken); // токен приходит
    const tokenData = await Token.findOne({ refreshToken });
    // console.log("findToken tokenData::: ", tokenData); //null ...
    return tokenData;
  }
}

module.exports = new TokenService();
