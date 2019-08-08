import { Service } from "typedi/decorators/Service";
import * as Winston from "winston";
import { env } from "./env";

@Service()
export class Logger {
  public transports: any[] = [];
  public winston: Winston.Logger;

  constructor() {
    if (env.nodeEnv !== "development") {
      this.transports.push(new Winston.transports.Console());
    } else {
      this.transports.push(
        new Winston.transports.Console({
          format: Winston.format.combine(
            Winston.format.cli(),
            Winston.format.splat(),
          ),
        }),
      );
    }

    this.winston = Winston.createLogger({
      level: env.logs.level,
      levels: Winston.config.npm.levels,
      format: Winston.format.combine(
        Winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        Winston.format.errors({ stack: true }),
        Winston.format.splat(),
        Winston.format.json(),
      ),
      transports: this.transports,
    });
  }
}
