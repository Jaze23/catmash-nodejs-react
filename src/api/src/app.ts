import "reflect-metadata";
import express from "express";
const httpContext = require("express-cls-hooked");
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { set } from "mongoose";
import mongooseSchemaLoader from "./common/config/mongoose-schema-loader";
import routerV1 from "./routers/router-v1";
import { errorHandlerMiddleware, httpContextMiddleware } from "./common/middlewares";

const app = express();

app.use(httpContext.middleware);

// Make mongoose uses findOneAndUpdate() instead of findAndModify()
set("useFindAndModify", false);

// Load schemas into DI container
mongooseSchemaLoader();

// Add CORS
app.use(cors({ origin: "*" })); // should be set to only allowed values.

// Add helmet
app.use(helmet());

// Configure the express app
app.set("port", process.env.PORT || 8080);
app.use(bodyParser.json({ limit: "50MB" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Add the HttpContext
app.use(httpContextMiddleware);

// Register the router
app.use(`/v1`, routerV1);

// Add the error handler
app.use(errorHandlerMiddleware);

export default app;
