// server.js (CommonJS version)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.TWO_FACTOR_API_KEY;

app.post("/api/send-otp", async (req, res) => {
  const { phone } = req.body;
  try {
    const response = await fetch(
      `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Send OTP error:", err);
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
    console.error("Verify OTP error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
