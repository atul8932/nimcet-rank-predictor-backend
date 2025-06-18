import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.TWO_FACTOR_API_KEY;

app.get("/api/send-otp", async (req, res) => {
  const { phone } = req.query;
  try {
    const response = await fetch(
      `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

app.get("/api/verify-otp", async (req, res) => {
  const { sessionId, otp } = req.query;
  try {
    const response = await fetch(
      `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("OTP verify error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
