import * as dotenv from "dotenv";
import fs from "fs";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "development") {
  try {
    const envLocal = fs.readFileSync(".env.local");
    const envConfig = dotenv.parse(envLocal);
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  } catch (e) {
    console.log("No .env.local file, falling back to .env file");
  }
}

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("no .env file found");
}

export const env = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  database: {
    url: process.env.MONGODB_URI,
  },
  allowedOrigin: process.env.CORS_ALLOWED_ORIGIN,
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  }
};
