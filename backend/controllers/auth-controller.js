const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");

class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required!" });
    }
    const otp = await otpService.generateOtp();

    const timeToLeave = 1000 * 60 * 2; // 2 minutes
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

  verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;
    if (!otp || !phone || !hash) {
      res.status(400).json({ message: "All fields are required!" });
    }
    const [hashedOtp, expires] = hash.split(".");
    if (Date.now() > expires) {
      res.status(400).json("Sorry! Your OTP has been expired ");
    }
    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      res.status(400).json("Invalid OTP");
    }
    let user;
    let accessToken;
    let refreshToken;
  }
}
module.exports = new AuthController();
