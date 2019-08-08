import { Logger } from "./logger";
import { Service } from "typedi";
import { getNamespace } from "cls-hooked";
const nsp = getNamespace("tunzUpRest");

@Service()
export class ErrorHandler {
  constructor(private logger: Logger) {}
  public handleError = async (err: Error) => {
    this.logger.winston.error("Error : %o", {
      transactionId: nsp.get("transactionId"),
      message: err.message,
      stack: err.stack,
    });

    return this.isUntrustedError(err);
  };

  private isUntrustedError(err: Error): boolean {
    // TODO ( how to determine ?)
    return false;
  }
}
