import { Response, Request } from "express";
import * as uuid from "uuid";
import { ErrorStatus } from "../exceptions/error-status.model";
const httpContext = require("express-cls-hooked");

export async function httpContextMiddleware(
  req: Request,
  res: Response,
  next: (err?: ErrorStatus) => void,
) {
  try {
    const tid = uuid.v4();
    httpContext.set("transactionId", tid);
    next();
  } catch (e) {
    next(new ErrorStatus("invalid token", 401));
  }
}
