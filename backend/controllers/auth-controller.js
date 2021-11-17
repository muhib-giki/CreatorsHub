const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");

const userService = require("../services/user-service");
const tokenService = require("../services/token-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    console.log("phone:", phone);
    if (!phone) {
      res.status(400).json({ message: "Phone field is required!" });
    }
    const otp = await otpService.generateOtp();

    const timeToLeave = 1000 * 60 * 5; // 2 minutes
    const expires = Date.now() + timeToLeave;
    const data = `${phone}.${otp}.${expires}`;

    const hash = hashService.hashOtp(data);

    try {
      await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (err) {
      console.log("error:", err);
      res.status(500).json({ message: "Message Sending Failed!" });
    }
  }

  async verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;
    if (!otp || !phone || !hash) {
      res.status(400).json({ message: "All fields are required!" });
    }
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json("Sorry! Your OTP has been expired ");
    }
    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      res.status(400).json("Invalid OTP");
    }
    let user;

    try {
      user = await userService.findUser({ phone: phone });
      if (!user) {
        user = await userService.createUser({ phone: phone });
      }
    } catch (error) {
      console.log(err);
      return res.status(500).json({ message: "Db error" });
    }
    //JWT Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    res.json({ accessToken });
  }
}
module.exports = new AuthController();
