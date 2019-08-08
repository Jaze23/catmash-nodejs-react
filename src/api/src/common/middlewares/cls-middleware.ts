import { Response, Request } from "express";
import * as uuid from "uuid";
import { createNamespace } from "cls-hooked";
import { ErrorStatus } from "../exceptions/error-status.model";
const nsp = createNamespace("tunzUpRest");

export async function cls(
  req: Request,
  res: Response,
  next: (err?: ErrorStatus) => void,
) {
  try {
    nsp.bindEmitter(req);
    nsp.bindEmitter(res);

    nsp.run(() => {
      const tid = uuid.v4();
      nsp.set("transactionId", tid);
      next();
    });
  } catch (e) {
    next(new ErrorStatus("invalid token", 401));
  }
}
