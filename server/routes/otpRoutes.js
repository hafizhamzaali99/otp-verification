import express, { Router } from "express";
import { generateOTP, VerifyOTP } from "../controllers/otpController.js";
const router = express.Router();

router.get("/generate/", generateOTP);
router.post("/verify/", VerifyOTP);
router.get("/resend/", generateOTP);

export default router;
