import "reflect-metadata";
import { env } from "./common/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import mongooseSchemaLoader from "./common/config/mongoose-schema-loader";
import routerV1 from "./routers/router-v1";
import { errorHandlerMiddleware, cls } from "./common/middlewares";

const app = express();

if (process.env.NODE_ENV !== "test") {
  connect(
    env.database.url as string,
    { useNewUrlParser: true, useCreateIndex: true },
  );
}

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

// Add the CLS
app.use(cls);

// Register the router
app.use(`/v1`, routerV1);

// Add the error handler
app.use(errorHandlerMiddleware);

export default app;
