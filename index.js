require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication")
const userRouter = require("./routes/user");
const lostItemRouter = require("./routes/lostItemRoutes");
const foundItemRouter = require("./routes/foundItemRoutes");
const matchRouter = require("./routes/matchRoutes");

const PORT = process.env.PORT || 8000;
const app = express();

connectMongoDB(process.env.MONGO_URL).then(() =>
  console.log("MongoDB Connected ✅")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use(checkForAuthenticationCookie("token"));
app.use("/lost-items", lostItemRouter);
app.use("/found-items", foundItemRouter);
app.use("/match-items", matchRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));