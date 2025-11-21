import "dotenv/config";
import createError from "http-errors";
import express from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import pkg from "express-openid-connect";
import printIncomingRequest from "./middleware/print.middleware.js";
import errorHandler from "./middleware/error.middleware.js";
import authConfig from "./config/auth.config.js";
import apiRouter from "./routes/api.route.js";
import indexRoute from "./routes/index.route.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { auth, requiresAuth } = pkg;

const app = express();

app.set("views", join(__dirname, "../views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "../public")));

app.use(printIncomingRequest);
app.use(auth(authConfig));

app.get("/", indexRoute);
app.use("/api", requiresAuth(), apiRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

export default app;
