const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const foodRouter = require("./routes/food.route");

dotenv.config({ path: ".env" });

const app = express();
app.use(express.static(`${__dirname}/public`));

let allowedOrigins;

try {
  allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
} catch (err) {
  allowedOrigins = ["http://localhost:3000"];
}

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/food", foodRouter);

app.all("*", (req, res, next) =>
  next(`Could not found ${req.originalUrl} handler in the server`)
);

module.exports = app;
