export const generateOTP = (req, res, next) => {
  try {
    return res.status(200).json({
      message: "OTP sent successfully",
      OTP: process.env.OTP_CODE,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const VerifyOTP = (req, res, next) => {
  try {
    const { OTP } = req.body;
    if (process.env.OTP_CODE !== OTP) {
      return res.status(404).json({
        message: "Invalid OTP, Please Try Again",
      });
    }
    return res.status(200).json({
      message: "OTP verification successfull",
    });
  } catch (error) {
    res.status(200).json({
      message: error.message || "Internal Server Error",
    });
  }
};
