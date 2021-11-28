const tokenService = require("../services/token-service");

module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    console.log("accessToken: ", accessToken);
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    if (!userData) {
      throw new Error();
    }
    req.user = userData;
    console.log("req:", req.user);
    next();
  } catch (error) {
    console.log("error in middleware:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};
