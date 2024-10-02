import express from "express";
export const app = express();
import cors from "cors";
import dotenv from "dotenv";
import otpRoutes from "./routes/otpRoutes.js";
dotenv.config();

app.use(express.json());
app.use(cors())

app.use("/api/v1/otp", otpRoutes);
