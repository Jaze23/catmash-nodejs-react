import { Logger } from "./logger";
import { Service } from "typedi";

@Service()
export class ErrorHandler {
  constructor(private logger: Logger) {}
  public handleError = async (err: Error) => {
    this.logger.error(err);
    return this.isUntrustedError(err);
  };

  private isUntrustedError(err: Error): boolean {
    // TODO ( how to determine ?)
    return false;
  }
}
