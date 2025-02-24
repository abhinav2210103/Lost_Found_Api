require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8000;
const app = express();

connectMongoDB("mongodb://localhost:27017/lost_found_api").then(() =>
  console.log("MongoDB Connected ✅")
);

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));