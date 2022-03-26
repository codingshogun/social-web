const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

//env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./backend/config/config.env" });
}

//middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//routes
const post = require("./routes/postRoutes");
const user = require("./routes/userRoutes.js");

app.use("/api/posts", post);
app.use("/api/users", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//errors
const globalErrorHandler = require("./middleware/globalErrorHandler");
app.use(globalErrorHandler);

module.exports = app;
